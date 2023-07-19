<template>
  
  <div class="t-body">
    <h3>Formulario de edición de compra de criptomoneda</h3>
    <div class="formularioCompra">
      <p>Editar transacción id: {{ datosFormularioEdicion.id }}</p>
      <form @submit.prevent="guardarEdicionCriptomoneda">
        <div>
          <label>Cantidad:</label>
          <input type="text" id="cantidad" v-model.number="data.crypto_amount" required>
        </div>
        <div>
          <label>Monto de dinero:</label>
          <input type="text" id="cantidad" v-model="data.money">
        </div>

        <div>
          <label>Criptomoneda:</label>
          <select id="criptomoneda" v-model="data.crypto_code">
            <option default>Selecciona criptomoneda</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            <option value="usdt">USDT</option>
            <option value="dai">Dai</option>
          </select>
        </div>

      <button type="submit" class="botonCompra">Editar</button>
        <p v-if="edicionExitosa" class="exito">Edición Exitosa!</p>
      </form>

    </div>
  </div>
  
</template>

<script>
  //import UtnInstance from '@/services/utnConnectionService';
  import utnConnectionService from '../services/utnConnectionService';
  //import {obtenerMovimientosCriptomonedas} from "@/views/HistorialMovimientosView.vue"

  export default {
    name: 'formularioEdicion',

    props: {
      datosFormularioEdicion: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        data: {
          money: this.datosFormularioEdicion.money,
          crypto_code: this.datosFormularioEdicion.crypto_code,
          crypto_amount: this.datosFormularioEdicion.crypto_amount,
        },
        criptomonedaEditada: [],
        edicionExitosa: false,
      }
    },

    methods:{
      /*guardarEdicionCriptomoneda() {
        UtnInstance.patch(`transactions/${this.datosFormularioEdicion.id}`,this.data)
        .then((response) => response.data)
        .then((data) => console.log(data))
      },*/

      
      async guardarEdicionCriptomoneda(){
        console.log(this.data)
        try {
          const response = await utnConnectionService.patch(`transactions/${this.datosFormularioEdicion.id}`, this.data)
          this.criptomonedaEditada = response.data;
          console.log(this.criptomonedaEditada);
          this.edicionExitosa = true

          //emito un evento al padre
          this.$emit('edicionGuardada', this.criptomonedaEditada); // Emitir un evento personalizado indicando que la edición se ha guardado exitosamente
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      }
    }

  };

</script>

<style scoped>

.barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px 20px;
  font-weight: bold;
}

.botonCerrarSesion {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
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

.formularioCompra {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

h3 {
  text-align: center;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="number"],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.botonCompra {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.botonCompra:hover {
  background-color: #45a049;
}

p {
  margin-top: 20px;
  font-weight: bold;
}

.exito {
  color: green;
}

.error {
  color: red;
}

.imagen-miniatura {
  max-width: 50px;
  max-height: 50px;
}

.compra-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}
</style>

