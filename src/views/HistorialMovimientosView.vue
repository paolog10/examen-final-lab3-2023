<template>
  <h3>Historial de Movimientos de: {{ this.clienteId }}</h3>
  
  <div v-if="this.criptomonedasCompradas.length === 0">
    <h1>Cargando...</h1>
  </div>

  <div v-else>
    <table class="tablaPreciosCriptomonedas">
      <thead>
        <tr>
          <th>_id</th>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Precio Pagado $ARS</th>
          <th>Compra/Venta</th>
          <th>Fecha/Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(compra, id) in criptomonedasCompradas" :key="id">
          <td>{{ compra._id }}</td>
          <td>{{ compra.crypto_code }}</td>
          <td>{{ compra.crypto_amount }}</td>
          <td>{{ compra.money }}</td>
          <td>{{ compra.action }}</td>
          <td>{{ compra.datetime.replace("T", " ") }}</td>
          <td>
            <button @click="leerFila(compra._id)" class="botonCerrarSesion">Leer</button><br>
            <button class="botonEditarCompraVenta">Editar</button><br>
            <button @click="eliminarFila(compra._id)" class="botonEliminarCompraVenta">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr>

  <h3>Lectura compra/venta: {{ this.lecturaCompraVentaCriptoMoneda._id }}</h3>
  <div>
    <ul>
      <li>Criptomoneda: {{ this.lecturaCompraVentaCriptoMoneda.crypto_code }}</li>
      <li>Cantidad: {{ this.lecturaCompraVentaCriptoMoneda.crypto_amount }}</li>
      <li>Precio Pagado: {{ this.lecturaCompraVentaCriptoMoneda.money }}</li>
    </ul>
  </div>
  
</template>

<script>
  import utnConnectionService from '../services/utnConnectionService';

  export default {
    data() {
      return {
        clienteId: localStorage.getItem('idUsuario'), //inicializo el idUsuario del localStorage
        criptomonedasCompradas: [],
        lecturaCompraVentaCriptoMoneda: {},
        cargandoDatos: false,
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
          this.cargando = true

          console.log(this.criptomonedasCompradas);
        } catch (error) {
          console.error('Error al obtener la compra:', error);
        }
      },

      async eliminarFila(id){
        const flag = confirm(`¿Esta seguro que quiere eliminar el registro id: ${id}?`);
        
        if (flag) {
          const response = await utnConnectionService.delete(`/transactions/${id}`);
          console.log(response.data);
          alert(`¡Registro id: ${id} borrado correctamente!`);
          
          //obtengo nueva lista de compra/venta
          this.obtenerComprasCriptomonedas()
        }
      },

      async leerFila(id){
        try {
          const response = await utnConnectionService.get(`/transactions/${id}`); 
          this.lecturaCompraVentaCriptoMoneda = response.data;

          console.log(this.lecturaCompraVentaCriptoMoneda);
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

.botonEditarCompraVenta {
  background-color: yellow;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.botonEliminarCompraVenta{
  background-color: red;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

</style>