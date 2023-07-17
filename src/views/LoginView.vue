<template>
  <section class="pantallaLogin">
    <div class="login">      
      <img src="../assets/wallet.png" alt="wallet logo" class="logoWallet" />
      <h1>@MyBitWallet</h1>

      <form @submit.prevent="validarIdUsuario" class="formulario"> <!--preventForm forma de prevenir el comportamiento de envío predeterminado de un formulario que es recargar la pagina-->
        <label class="title">Ingrese Id Usuario</label>
        <input v-model="idUsuario" id="idUsuario" type="text" class="input"/>
        <button id="idBotonLogin" type="submit" class="botonLogin">Ingresar</button>

        <p v-show="errorIdUsuario" class="errorValidacionIdUsuario">El ID debe tener exactamente 10 caracteres alfanuméricos.</p>
      </form>
    </div>
  </section>
</template>


<script>
  export default{
    data(){
      return{
        idUsuario: '',
        errorIdUsuario: false,
      }
    },

    computed: {

    },

    methods:{
      /*
      Tanto @click="validarIdUsuario" @submit.prevent="validarIdUsuario"
      */
      validarIdUsuario() {

        if (this.idUsuario.length === 10 && /^[a-zA-Z0-9]+$/.test(this.idUsuario)) {
          this.errorIdUsuario = false;

          //uso localStorage para guardar un idUsuario
          localStorage.setItem('idUsuario', this.idUsuario)

          //me dirige a la pagina de compra de moneda
          this.$router.push({name: "CompraView"})
          //console.log(this.idUsuario)
        
        } else {
          this.errorIdUsuario = true;
          this.idUsuario = '';
        }
      },

    }
  }
</script>

<style scoped>
.pantallaLogin{
  height:95vh;
}
.login{
  height: 100%;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center; /*alinea al centro ambos ejes*/
  background-color: none;
  background-image: url("../assets/fondo.jpg");
  background-size: auto; 
}

.formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: black 2px solid;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.input {
  width: 250px;
  height: 20px;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.botonLogin {
  width: 120px;
  height: 40px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.botonLogin:hover {
  background-color: #45a049;
}

.logoWallet{
  height: 40px;
  width: 40px;
}

.errorValidacionIdUsuario {
  color: red;
  margin-top: 12px;
  font-weight: bold;
}

</style>