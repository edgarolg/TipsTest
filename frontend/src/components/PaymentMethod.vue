<template>
  <div>
    <h3>Elige el Método de Pago</h3>
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
.methods button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  background: none;
  cursor: pointer;
}

.methods .selected {
  background: red;
  color: white;
}
</style>
