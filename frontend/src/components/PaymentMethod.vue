<template>
  <div>
    <div class="titleContainer">
      <img
        src="../../public/iconoPago.png"
        alt="Payment Icon"
        class="titleImage"
      />
      <h3 class="titleMethodPay">Elige el Método de Pago</h3>
    </div>
    <div class="methods">
      <button
        v-for="(method, index) in methods"
        :key="index"
        :class="{ selected: method === selectedMethod }"
        @click="selectMethod(method)"
      >
        <img
          :src="methodImages[method]"
          :alt="method"
          class="methodImage"
        />
        <p>{{ method }}</p>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "PaymentMethod",
  props: ["methods", "selectedMethod"],
  data() {
    return {
      methodImages: {
        "BBVA 1234": require("../../public/tarjeta.png"),
        "Santander 1234": require("../../public/tarjeta.png"),
        "Efectivo": require("../../public/efectivo.png"),
      },
    };
  },
  methods: {
    selectMethod(method) {
      this.$emit("inputPaymentMethod", method);
      console.log("Método de Pago:", method);
    },
  },
};
</script>

<style>
.methods {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 85%;
  margin: auto;
}


.methods button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 40%;
}

.titleContainer {
  display: flex;
  gap: 1rem;
  margin-bottom: 2%;
}

.titleImage {
  width: 30px; 
  height: auto;
}

.titleMethodPay {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 2% 0;
  padding: 0;
  width: fit-content;
}

.methods .selected {
  background: red;
  color: white;
}

.methodImage {
  width: 30px;
  height: auto;
  margin: 0 auto;
}

</style>
