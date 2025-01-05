<template>
  <div class="calculator">
    <div class="input-type">
      <p>Ingresando: 
        <span v-if="currentInput === 'tip'">Propina</span>
        <span v-if="currentInput === 'persons'">Número de personas</span>
        <span v-if="currentInput === 'pay'">Monto a pagar</span>
      </p>
    </div>
    
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
      <button @click="handleConfirm" class="buttons confirm">
        <img src="@/../public/cheque.png" alt="Save" style="width: 30%; height: auto;" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'InputTips',
  data() {
    return {
      displayValue: '',
      tipAmount: "",
      personsAmount: "",
      payAmount: "",
      currentInput: "tip",
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    inputNumber(number) {
      this.displayValue += number;
    },
    async handleConfirm() {
      const numValue = parseFloat(this.displayValue);
      
      if (!this.displayValue) {
        this.errorMessage = "Por favor, ingresa un valor válido.";
        return;
      }

      switch(this.currentInput) {
        case "tip":
          // Para tip, guardamos en API y props
          this.loading = true;
          try {
            const response = await axios.post("http://localhost:3000/api/tips", {
              amount: numValue,
            });
            this.successMessage = response.data.message;
            console.log(this.successMessage);
            this.tipAmount = numValue;
            console.log("Guardado propina", this.tipAmount);
            this.$emit("inputAmount", this.displayValue);
            this.currentInput = "persons";
          } catch (error) {
            console.error("Error al guardar la propina:", error);
            this.errorMessage = error.response?.data?.message || "Error al guardar la propina.";
            return;
          } finally {
            this.loading = false;
          }
          break;

        case "persons":
          // Para persons, guardamos en API y props
          this.loading = true;
          try {
            const response = await axios.post("http://localhost:3000/api/persons", {
              'persons': numValue,
              });
            this.successMessage = response.data.message;
            console.log(this.successMessage);
            this.personsAmount = numValue;
            console.log("cantidad de personas", this.personsAmount);
            this.$emit("inputPersons", this.personsAmount);
            this.currentInput = "pay";
          } catch (error) {
            console.error("Error al guardar la propina:", error);
            this.errorMessage = error.response?.data?.message || "Error al guardar la propina.";
            return;
          } finally {
            this.loading = false;
          }
          break;

        case "pay":
          // Para pay, solo guardamos en props
          this.payAmount = numValue;
          this.$emit("inputPayAmount", numValue);
          console.log("Cantidad de pago", this.payAmount); 
          break;
      }

      // Limpiamos el display después de cada confirmación
      this.displayValue = "";
    },
    clear() {
      this.tipAmount = "";
      this.personsAmount = "";
      this.payAmount = "";
      this.displayValue = "";
      this.currentInput = "tip";
      this.errorMessage = "";
      this.successMessage = "";
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

.input-type {
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
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