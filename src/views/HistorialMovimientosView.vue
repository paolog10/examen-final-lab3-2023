<template>
  <h3>Historial de Movimientos de: {{ this.clienteId }}</h3>
  
  <div>
    <table class="tablaPreciosCriptomonedas">
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Precio Pagado $ARS</th>
          <th>Fecha/Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(compra, id) in criptomonedasCompradas" :key="id">
          <td>{{ compra.crypto_code }}</td>
          <td>{{ compra.crypto_amount }}</td>
          <td>{{ compra.money }}</td>
          <td>{{ compra.datetime }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr>
</template>

<script>
    import utnConnectionService from '../services/utnConnectionService';

  export default {
    data() {
      return {
        clienteId: localStorage.getItem('idUsuario'), //inicializo el idUsuario del localStorage
        criptomonedasCompradas: [],
      }
    },

    created(){
      this.obtenerComprasCriptomonedas()
    },

    methods:{
      async obtenerComprasCriptomonedas() {
        try {
          const response = await utnConnectionService.get(`transactions?q={"user_id":"${this.clienteId}"}`); //paolog1012
          this.criptomonedasCompradas = response.data;
        } catch (error) {
          console.error('Error al obtener la compra:', error);
        }
      },
    },

  }
</script>

<style scoped>

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