<template>
  <div class="calculator">
    <div class="display">
      <p>$</p>
      <p>{{ displayValue || '000.00' }}</p>
      <button @click="clear" class="clearButton">⌫</button>
    </div>
    <hr style="border: 1px solid #000; margin: 0; width: 80%;" />
    <div class="buttonsContainer">
      <button v-for="n in 9" :key="n" @click="inputNumber(n % 10)" class="buttons">
        {{ n % 10 }}
      </button>
      <button @click="inputNumber('00')" class="buttons">00</button>
      <button @click="inputNumber('0')" class="buttons">0</button>
      <button @click="saveTip" class="buttons confirm">
        <img src="@/../public/cheque.png" alt="Save" style="width: 30%; height: auto;" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ValueInput',
  data() {
    return {
      displayValue: '',
      tipAmount: "",
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    inputNumber(number) {
      this.tipAmount += number;
      this.displayValue = this.tipAmount;
    },
    async saveTip() {
      if (!this.tipAmount) {
        this.errorMessage = "Por favor, ingresa un monto válido.";
        return;
      }

      this.loading = true;
      this.successMessage = "";
      this.errorMessage = "";

      try {
        console.log("Enviando propina:", this.tipAmount);
        const response = await axios.post("http://localhost:3000/api/tips", {
          amount: this.tipAmount,
        });
        console.log("Respuesta de la API:", response.data);

        this.successMessage = response.data.message;
        this.tipAmount = ""; // Reinicia el input
        this.displayValue = ""; // Reinicia el display
      } catch (error) {
        console.error("Error al guardar la propina:", error);
        this.errorMessage =
          error.response?.data?.message || "Error al guardar la propina.";
      } finally {
        this.loading = false;
      }
    },
    clear() {
      this.tipAmount = "";
      this.displayValue = "";
    }
  },
};
</script>

<style scoped>
.calculator {
  display: grid;
  flex-direction: column;
  align-items: center;
  border-color: #ec776a;
  border-width: 3px;
  border-style: solid;
  border-radius: 10px;
  justify-items: center;
  background-color: #E6E6E6;
  padding: 20px;
}

.display {
  font-size: 2em;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  width: 80%;
}

.clearButton {
  border: none;
  background-color: transparent;
  font-size: 1em;
}

.buttonsContainer {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
  justify-items: center;
}

.buttons {
  font-size: 3em;
  padding: 5%;
  border-radius: 15px;
  border-width: 1px;
  width: 100%;
}

.confirm {
  background-color: #F08D81;
  color: white;
  align-self: center;
  width: 80%;
  height: 80%;
  font-size: 2em;
  border: none;
}
</style>