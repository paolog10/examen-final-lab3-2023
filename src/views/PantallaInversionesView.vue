<template>
  <div>
    <h3>Inversiones de: {{ this.clienteId }}</h3>
  </div>

  <div v-if="mostrarCriptomonedasAgrupadas.length === 0">
    <h1>Cargando...</h1>
  </div>
  <!--<button @click="agruparCriptomonedas(this.criptomonedas)">Mostrar agrupados</button>-->

  <div v-else>
    <table>
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(criptomoneda, cantidad ) in mostrarCriptomonedasAgrupadas" :key="criptomoneda">
          <td>{{ criptomoneda }}</td>
          <td>{{ cantidad }}</td>      
          <td>{{ criptomoneda }}</td>    
        </tr>
      </tbody>
    </table>
  </div>

  <ul v-for="(criptomoneda, precioVenta ) in preciosVentaCriptomonedas" :key="criptomoneda">
    <li>
      {{ criptomoneda }}: {{ precioVenta }} 
    </li>
  </ul>
  <button type="button" @click="obtenerPreciosVentaCriptomonedas">PreciosVentaCriptomonedas</button>
  <button type="button" @click="agregarNombreCriptomoneda">Agregar propiedad nombreCriptomoneda</button>
  <button type="button" @click="recorrerArrayPrecios">multplicarPrecioPorCantidad</button>
</template>

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
        preciosVentaCriptomonedas: [],
        cryptoArrayPosicion: { "btc": 0, "eth": 1, "usdt": 2, "dai": 3 },
        preciosVentaConNombres: [],
      }
    },

    created(){
      this.obtenerCriptomonedas()
    },

    computed: { 
      mostrarCriptomonedasAgrupadas() {
        return this.agruparCriptomonedas(this.criptomonedas);
      },

    },

    methods: {
      async obtenerCriptomonedas() {
        try {
          const response = await utnConnectionService.get(`transactions?q={"user_id":"${this.clienteId}"}`); 
          this.criptomonedas = response.data;

          //console.log(this.criptomonedas);
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

          // Comprobar si la criptomoneda ya está agrupada
          if (criptomonedasAgrupadas[name]) {
            criptomonedasAgrupadas[name] += amount; // Sumar la cantidad a la criptomoneda existente
          } else {
            criptomonedasAgrupadas[name] = amount; // Agregar la criptomoneda con su cantidad
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

          console.log(this.preciosVentaCriptomonedas);
          return this.preciosVentaCriptomonedas;
        } catch (error) {
          console.error('Error al obtener los precios de las criptomonedas:', error);
          return [];
        }
      },

      agregarNombreCriptomoneda(){
        //quiero agregar la propiedad nombreCriptomoneda sabiendo la posicion de cada cripto
        const criptomonedas = Object.keys(this.cryptoArrayPosicion);
        this.preciosVentaConNombres = this.preciosVentaCriptomonedas.map((precio, index) => {
          const nombreCriptomoneda = criptomonedas[index];
          return { nombreCriptomoneda, precioVenta: precio };
        });

          console.log(this.preciosVentaConNombres);
          return this.preciosVentaConNombres;
      },

      /*Con el array obtenido en el método de agrupamiento, recorrerlo y fijarse si tengo el valor del precio de la criptomoneda
      en el array obtenido al insertarle la propiedad nombreCriptomoneda*/
      recorrerArrayPrecios(){
        for (const criptomoneda of this.criptomonedasAgrupadas) {
          const nombreCriptomoneda = criptomoneda.name;
          
          // Buscar el objeto correspondiente en "preciosVentaConNombres"
          const precioVenta = this.preciosVentaConNombres.find(precio => precio.nombreCriptomoneda === nombreCriptomoneda);
          
          if (precioVenta) {
            const cantidad = criptomoneda.amount;
            const precio = precioVenta.precioVenta;
            
            const cantidadTotal = cantidad * precio;
            
            // Agregar la propiedad "cantidadTotal" al objeto en "criptomonedasAgrupadas"
            criptomoneda.cantidadTotal = cantidadTotal;
          }
        }

        // Mostrar los resultados
        console.log(this.criptomonedasAgrupadas);
      },

    },

  }

</script>