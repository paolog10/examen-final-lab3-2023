<template>
  <nav>
    <!--<router-link to="/">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link> |-->
    <router-link to="/">Login</router-link> |
    <router-link to="/compra">Compra-Venta</router-link> |
    <router-link to="/historialMovimientos">Historial de Movimientos</router-link> |
    <router-link to="/pantallaInversiones">Pantalla Inversiones</router-link> |
    <router-link to="/analisisInversiones">Análisis de Inversiones</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  width: 100vw;
  height: 50px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.botonCerrarSesion {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
