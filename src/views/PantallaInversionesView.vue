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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(criptomoneda, cantidad ) in mostrarCriptomonedasAgrupadas" :key="criptomoneda">
          <td>{{ criptomoneda }}</td>
          <td>{{ cantidad }}</td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import utnConnectionService from '../services/utnConnectionService';
  
  export default {
  
    data() {
      return {
        clienteId: localStorage.getItem('idUsuario'), 
        criptomonedas: [],
      }
    },

    created(){
      this.obtenerCriptomonedas()
    },

    computed: { //Cómo mostrar datos agrupados?????
      mostrarCriptomonedasAgrupadas() {
        return this.agruparCriptomonedas(this.criptomonedas);
      }
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
      }
    },

  }

</script>