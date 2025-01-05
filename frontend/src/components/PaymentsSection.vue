<template>
  <section class="right-section">
    <h3>Pagos</h3>
    <ul>
      <li v-for="(payment, index) in payments" :key="index">
        Método: {{ payment.method }} - Monto: ${{ payment.amount }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "PaymentsSection",
  props: {
    payments: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.right-section {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
