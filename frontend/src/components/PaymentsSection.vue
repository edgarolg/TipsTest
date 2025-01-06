<template>
  <section class="right-section">
    <h3 class="paySectionTitle">Pagos</h3>
    <p v-if="payments.length === 0" class="noPaymentsMessage">Sin pagos</p>
    <ul class="paymentsList">
      <li v-for="(payment, index) in payments" :key="index">
        <img
          :src="paymentIcons[payment.payMethod]"
          :alt="payment.payMethod"
          class="paymentMethodIcon"
        />
        <span class="paymentMethodName">{{ payment.payMethod }}</span>
        <span class="paymentMethodAmount">${{ payment.amount }}</span>
        <button @click="removePayment(index)" class="eliminatedPayment">X</button>
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
  data() {
    return {
      // Asocia cada método de pago con una imagen
      paymentIcons: {
        "BBVA 1234": require("../../public/tarjeta.png"),
        "Santander 1234": require("../../public/tarjeta.png"),
        "Efectivo": require("../../public/efectivo.png"),
      },
    };
  },
  methods: {
    removePayment(index) {
      // Emite un evento con el índice del pago a eliminar
      this.$emit("remove-payment", index);
    },
  },
};
</script>
<style scoped>
.right-section {
  padding: 15px;
}

.paySectionTitle {
  font-size: 24px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
  width: fit-content;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.paymentsList li {
  margin: 5px 5px;
  margin: auto;
  width: 80%;
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: black;
  display: flex;
  justify-content: space-between;
}

.paymentMethodAmount{
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
  width: fit-content;
}

.eliminatedPayment {
  color: #ee6556;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noPaymentsMessage {
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: left;
  border: 2px solid #ccc;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 20px;
  margin: 5% auto;
  width: 80%;
}

.paymentMethodIcon {
  width: 30px;
  height: auto;
  margin: 0;
}
</style>
