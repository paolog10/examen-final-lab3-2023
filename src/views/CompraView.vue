<template>
  <div>
    <nav class="barra">
      <div>
        <span>{{ darMensajeBienvenida }}</span>
      </div>
      <button @click="cerrarSesion" class="botonCerrarSesion">Cerrar sesión</button>
    </nav>

    <h2>Panel de Criptomonedas</h2>
    <button @click="obtenerPrecios()" class="botonCerrarSesion">Obtener Precios hoy</button>

    <div class="tablaPreciosCriptomonedas">
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Precio de compra $ARS</th>
            <th>Precio de venta $ARS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(precioCriptomoneda, index) in preciosCriptomonedas" :key="index">
            <td><img :src="iconosCriptomonedas[index]" alt=""></td> <!--bindeo la imagen en la posicion index-->
            <td>{{ precioCriptomoneda.ask }}</td>
            <td>{{ precioCriptomoneda.bid }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>Aca va el formulario de compra con sus validaciones</div>


  </div>

  <hr>
</template>

<script>
  import criptoYaConnectionService from '../services/criptoYaConnectionService';

  export default {
    
    data(){
      return{
        clienteId: localStorage.getItem('idUsuario'), //inicializo el idUsuario del localStorage
        iconosCriptomonedas: [
          "https://argenbtc.com/img/iconos/f_bitcoin.svg",
          "https://argenbtc.com/img/iconos/f_ethereum.svg",
          "https://argenbtc.com/img/iconos/f_tether.svg",
          "https://argenbtc.com/img/iconos/f_dai.svg",
        ],
        endpointsPrecios: [
          "/btc/ars/1", 
          "/eth/ars/1",
          "/usdt/ars/1", 
          "/dai/ars/1"
        ],
        preciosCriptomonedas: [],
      }
    },

    methods: {
      cerrarSesion() {
        // redirigir al usuario a la página de inicio de sesión
        this.$router.push({ name: 'LoginView' });
      },

      async obtenerPrecios() {
        try {
          
          for (const endpoint of this.endpointsPrecios) {
            let response = await criptoYaConnectionService.get(endpoint);
            //console.log(response.data);
            this.preciosCriptomonedas.push(response.data) 
          }

          return this.preciosCriptomonedas;
        } catch (error) {
          console.error('Error al obtener los precios de las criptomonedas:', error);
          return [];
        }
      },

    },

    computed:{
      darMensajeBienvenida(){
        //console.log(this.clienteId)
        return `Bienvenido ${this.clienteId}!!!`
      },

    },
  }
  
  
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

.notaAlPie{
  color: red;
  font-weight: bolder;
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