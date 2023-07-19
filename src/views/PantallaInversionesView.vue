<template>
  <div>
    <h3>Inversiones de: {{ this.clienteId }}</h3>
  </div>
  
  <div v-if="mostrarCriptomonedasAgrupadas.length === 0">
    <h1>Cargando...</h1>
  </div>
  <!--<button @click="agruparCriptomonedas(this.criptomonedas)">Mostrar agrupados</button>-->

  <div v-else>
    <table class="tablaPreciosCriptomonedas">
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero $ARS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto of preciosVentaConNombres" :key="crypto" >
          <td v-if="crypto.cantidad? true : false">{{ crypto.nombreCriptomoneda }}</td>      
          <td v-if="crypto.cantidad? true : false">{{ crypto.cantidad }}</td> <!--los tengo al revés-->
          <td v-if="crypto.cantidad? true : false">${{ crypto.total? crypto.total.toFixed(2) : "Sin registro" }}</td>    
        </tr>
      </tbody>
      <tfoot v-if="this.criptoTotal > 0">
        <tr>
          <td>TOTAL</td>
          <td></td>
          <td>${{ this.criptoTotal }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import router from '@/router';
import { onBeforeMount } from 'vue';

onBeforeMount( () => {
  if (!localStorage.getItem("idUsuario")) router.push("/");  
});
</script>

<script>
  import utnConnectionService from '../services/utnConnectionService';
  import criptoYaConnectionService from '../services/criptoYaConnectionService';
  
  export default {
  
    data() {
      return {
        clienteId: localStorage.getItem('idUsuario'), 
        criptomonedas: [],
        endpointsPrecios: [
          "/btc/ars/1", 
          "/eth/ars/1",
          "/usdt/ars/1", 
          "/dai/ars/1"
        ],
        cryptoArrayPosicion: ["btc", "eth", "usdt", "dai" ],
        preciosVentaCriptomonedas: [],
        preciosVentaConNombres: [],
        criptomonedasAgrupadas: {},
        criptoTotal: 0
      }
    },

    created(){
      this.obtenerCriptomonedas()
    },

    computed: { 
      mostrarCriptomonedasAgrupadas() {
        this.criptomonedasAgrupadas = this.agruparCriptomonedas(this.criptomonedas);
        return this.criptomonedasAgrupadas;
      },

    },

    methods: {
      async obtenerCriptomonedas() {
        try {
          const response = await utnConnectionService.get(`transactions?q={"user_id":"${this.clienteId}"}`); 
          this.criptomonedas = response.data;

          return this.obtenerPreciosVentaCriptomonedas();
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      },
      
      agruparCriptomonedas(cryptos) {
        const criptomonedasAgrupadas = {};

        // Recorrer el array de objetos
        for (let i = 0; i < cryptos.length; i++) {
          //Asigna el objeto crypto de la posición i en el array this.cryptos a la variable crypto
          const crypto = cryptos[i];
          
          //Asignamos en una variable, la propiedad del objeto
          const name = crypto.crypto_code
          const amount = crypto.crypto_amount
          const action = crypto.action

          // Comprobar si la criptomoneda ya está agrupada
          if (criptomonedasAgrupadas[name]) {
            // Verificar el tipo de acción y sumar o restar la cantidad correspondiente
            if (action === 'purchase') {
              criptomonedasAgrupadas[name] += amount; // Sumar la cantidad a la criptomoneda existente
            } else if (action === 'sale') {
              criptomonedasAgrupadas[name] -= amount; // Restar la cantidad a la criptomoneda existente
            }
          } else {
            // Agregar la criptomoneda con su cantidad inicial
            criptomonedasAgrupadas[name] = amount;
          }
        }

        return criptomonedasAgrupadas;
      },

      async obtenerPreciosVentaCriptomonedas() {
        try {
          
          for (const endpoint of this.endpointsPrecios) {
            let response = await criptoYaConnectionService.get(endpoint);
            //console.log(response.data);
            this.preciosVentaCriptomonedas.push(response.data.totalBid) 
          }

          return this.agregarNombreCriptomoneda();
        } catch (error) {
          console.error('Error al obtener los precios de las criptomonedas:', error);
        }
      },

      agregarNombreCriptomoneda(){
        //quiero agregar la propiedad nombreCriptomoneda sabiendo la posicion de cada cripto
        this.preciosVentaConNombres = this.preciosVentaCriptomonedas.map((precio, index) => {
          const nombreCriptomoneda = this.cryptoArrayPosicion[index];
          return { nombreCriptomoneda, precioVenta: precio };
        });
        return this.recorrerArrayPrecios();
      },

      /*Con el array obtenido en el método de agrupamiento, recorrerlo y fijarse si tengo el valor del precio de la criptomoneda
      en el array obtenido al insertarle la propiedad nombreCriptomoneda*/
      recorrerArrayPrecios(){
        for (const i in this.preciosVentaConNombres) {
          // Buscar el objeto correspondiente en "preciosVentaConNombres"
          //const precioVenta = this.preciosVentaConNombres.find(precio => precio.nombreCriptomoneda === criptomoneda);
          
          if (this.preciosVentaConNombres[i].precioVenta) {
            let cryptoName = this.preciosVentaConNombres[i].nombreCriptomoneda;
            const cantidad = this.criptomonedasAgrupadas[cryptoName];
            const precio = this.preciosVentaConNombres[i].precioVenta;
            
            const cantidadTotal = cantidad * precio;
            
            // Agregar la propiedad "cantidadTotal" al objeto en "criptomonedasAgrupadas"
            //this.criptomonedasAgrupadas[criptomoneda].cantidadTotal = cantidadTotal;
            this.preciosVentaConNombres[i] = {
              nombreCriptomoneda: this.preciosVentaConNombres[i].nombreCriptomoneda,
              precioVenta: this.preciosVentaConNombres[i].precioVenta,
              cantidad: cantidad,
              total: cantidadTotal
            }
            this.criptoTotal += cantidadTotal? cantidadTotal : 0;
          }
        }

        // Mostrar los resultados
        console.log(this.preciosVentaConNombres);
      },

    },

  }

</script>

<style>
.tablaPreciosCriptomonedas{
  max-width: 600px;
  margin: 0 auto;
}

table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 12px;
  margin: 45px;
  width: 480px;
  text-align: center;
  border-collapse: collapse;
}

th {
  font-size: 13px;
  font-weight: normal;
  padding: 8px;
  background: #4caf50;
  border-top: 4px solid #77b87f;
  border-bottom: 1px solid #fff;
}

td {
  padding: 8px;
  background: #e4f0df;
  border-bottom: 1px solid #fff;
  border-top: 1px solid transparent;
}

tr:hover td {
  background: #c8e4c3;
}

</style>