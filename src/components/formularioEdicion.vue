<template>
  <div>
    <h2>Editar Transacción</h2>
    <form @submit="updateTransaction">
      <label for="amount">Cantidad:</label>
      <input type="number" v-model="editedTransaction.amount" id="amount">

      <label for="type">Tipo:</label>
      <select v-model="editedTransaction.type" id="type">
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>

      <label for="crypto">Criptomoneda:</label>
      <select v-model="editedTransaction.crypto" id="crypto">
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <!-- Agrega las opciones para otras criptomonedas aquí -->
      </select>

      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedTransaction: {
        amount: 0,
        type: '',
        crypto: ''
      }
    };
  },
  methods: {
    updateTransaction() {
      // Lógica para enviar los datos de edición al servidor o realizar otras acciones necesarias
      // Puedes acceder a los datos de edición en this.editedTransaction
    }
  }
};
</script>
