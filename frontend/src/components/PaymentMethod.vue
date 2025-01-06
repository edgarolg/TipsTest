<template>
  <div>
    <h3 class="titleMethodPay">Elige el Método de Pago</h3>
    <div class="methods">
      <button
        v-for="(method, index) in methods"
        :key="index"
        :class="{ selected: method === selectedMethod }"
        @click="selectMethod(method)"
      >
        {{ method }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentMethod",
  props: ["methods", "selectedMethod"],
  methods: {
    selectMethod(method) {
      this.$emit("inputPaymentMethod", method);
      console.log("metodo Pago", method);
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

.titleMethodPay {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 5% 0;
  padding: 0;
  width: fit-content;
}

.methods .selected {
  background: red;
  color: white;
}
</style>
