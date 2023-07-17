<template>
  <div>
    <h3 class="h3-title">Historial de Movimientos de: {{ this.clienteId }}</h3>
  </div>
  
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
          <td>{{ compra.action == "purchase"? "Compra" : "Venta" }}</td>
          <td>{{ new Date(compra.datetime).toLocaleDateString() }}</td>
          <td>
            <button @click="editarFila(compra._id, compra.crypto_code, compra.crypto_amount, compra.money)" class="botonEditarCompraVenta">Editar</button><br><br>
            <button @click="eliminarFila(compra._id)" class="botonEliminarCompraVenta">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr>

  <!--:datosFormularioEdicion="datosFormularioEdicion" enlazamos datos datos desde el componente padre al componente hijo-->
  <!--escucho el evento hijo @edicionGuardada - escuchar eventos y ejecutar métodos desde el hijo al padre-->
  <formulario-edicion v-if="datosFormularioEdicion.edicionExitosa" :datosFormularioEdicion="datosFormularioEdicion" @edicionGuardada="actualizarListaCriptomonedas"/>

</template>

<!--<script setup>
import router from '@/router';
import { onBeforeMount } from 'vue';

onBeforeMount( () => {
  if (!localStorage.getItem("idUsuario")) router.push("/");  
});
</script>-->

<script>
  import utnConnectionService from '../services/utnConnectionService';
  import formularioEdicion from '../components/formularioEdicion.vue'

  export default {
    components: {
      formularioEdicion,
    },
    data() {
      return {
        clienteId: localStorage.getItem('idUsuario'), //inicializo el idUsuario del localStorage
        criptomonedasCompradas: [],
        lecturaCompraVentaCriptoMoneda: {},
        editadoCompraVentaCriptomoneda: {},
        cargandoDatos: false,
        datosFormularioEdicion: {
          id: "",
          crypto_code: "",
          crypto_amount: "",
          money: "",
          edicionExitosa: false
        }
      }
    },

    created(){
      this.obtenerMovimientosCriptomonedas()
    },

    methods:{
      async obtenerMovimientosCriptomonedas() {
        try {
          const response = await utnConnectionService.get(`transactions?q={"user_id":"${this.clienteId}"}`); //paolog1012
          this.criptomonedasCompradas = response.data;
          this.cargando = true

          console.log(this.criptomonedasCompradas);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }

      },

      async eliminarFila(id){
        const flag = confirm(`¿Esta seguro que quiere eliminar el registro id: ${id}?`);
        
        if (flag) {
          const response = await utnConnectionService.delete(`/transactions/${id}`);
          console.log(response.data);
          alert(`¡Registro id: ${id} borrado correctamente!`);
          
          //obtengo nueva lista de compra/venta
          this.obtenerMovimientosCriptomonedas()
        }
      },

      async leerFila(id){
        try {
          const response = await utnConnectionService.get(`/transactions/${id}`); 
          this.lecturaCompraVentaCriptoMoneda = response.data;

          //console.log(this.lecturaCompraVentaCriptoMoneda);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      },

      
      editarFila(id, crypto_code, crypto_amount, money){
        if (this.datosFormularioEdicion.edicionExitosa && this.datosFormularioEdicion.id == id) {
          this.datosFormularioEdicion.edicionExitosa = false;
          return;
        }
        this.datosFormularioEdicion.crypto_amount = crypto_amount;
        this.datosFormularioEdicion.crypto_code = crypto_code;
        this.datosFormularioEdicion.money = money;
        this.datosFormularioEdicion.id = id;
        this.datosFormularioEdicion.edicionExitosa = true;
      },

      actualizarListaCriptomonedas() {
        //obtengo nueva lista de compra/venta
        this.obtenerMovimientosCriptomonedas()
      },

    },

  }
</script>

<style scoped>

.h3-title {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 50px;
}
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