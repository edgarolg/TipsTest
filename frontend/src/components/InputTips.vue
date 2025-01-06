<template>
  <div class="calculator">
    <div class="display">
      <p>{{ displaySymbol }}</p>
      <p>{{ displayValue || "000.00" }}</p>
      <button @click="clear" class="clearButton">⌫</button>
    </div>
    <hr style="border: 1px solid #000; margin: 0; width: 80%" />
    <div class="buttonsContainer">
      <button
        v-for="n in 9"
        :key="n"
        @click="inputNumber(n % 10)"
        class="buttonsDisplay"
      >
        {{ n % 10 }}
      </button>
      <button @click="inputNumber('00')" class="buttonsDisplay">00</button>
      <button @click="inputNumber('0')" class="buttonsDisplay">0</button>
      <button @click="handleConfirm" 
          :class="['buttonsDisplay', 'buttonConfirm', { buttonConfirmdisabled: isDisabled }]"
        >
        <img
          src="@/../public/cheque.png"
          alt="Save"
          style="width: 40%; height: auto"
        />
      </button>

    </div>
    <div  v-if="currentInput === 'pay'"  class="remainingTip">
      <p>Cantidad restante: ${{ remainingAmount.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InputTips",
  data() {
    return {
      displayValue: "",
      tipAmount: "",
      personsAmount: "",
      payAmount: "",
      currentInput: "tip",
      loading: false,
      successMessage: "",
      errorMessage: "",
      currentPayAmount: 0,
    };
  },
  props: {
    remainingAmount: {
      type: Number, 
      required: true
    },
  },
  computed: {
    isDisabled() {
      return this.remainingAmount === 0 && this.currentInput === "pay" 
    },
    displaySymbol() {
      return this.currentInput === "persons" ? "#" : "$";
    },
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

      switch (this.currentInput) {
        case "tip":
          // Para tip, guardamos en API y props
          this.loading = true;
          try {
            const response = await axios.post(
              "http://localhost:3000/api/tips",
              {
                amount: numValue,
              }
            );
            
            this.successMessage = response.data.message;
            console.log(this.successMessage);
            this.tipAmount = numValue;
            this.$emit("inputAmount", this.displayValue);
            console.log("Monto de propina guardado", this.tipAmount);
            this.currentInput = "persons";
          } catch (error) {
            console.error("Detalles completos del error:", error);
            console.error("Respuesta de error:", error.response)
            this.errorMessage =
              error.response?.data?.message || "Error al guardar la propina.";
            return;
          } finally {
            this.loading = false;
          }
          break;

        case "persons":
          // Para persons, guardamos en API y props
          this.loading = true;
          try {

            const response = await axios.post(
              "http://localhost:3000/api/persons",
              {
                persons: numValue,
                amount: this.tipAmount,
              }
            );
            this.successMessage = response.data.message;
            console.log(this.successMessage);
            this.personsAmount = numValue;
            console.log("cantidad de personas guardadas", this.personsAmount);
            this.$emit("inputPersons", this.personsAmount);
            this.currentInput = "pay";
          } catch (error) {
            console.error("Error al guardar la propina:", error);
            this.errorMessage =
              error.response?.data?.message || "Error al guardar la propina.";
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

          this.currentPayAmount += numValue;
          if (this.tipAmount == this.currentPayAmount) {
            this.currentInput = "tip";
            this.currentPayAmount = 0;
          }
          break;
        }

      // Limpiamos el display después de cada confirmación
      this.displayValue = "";
    },
    clear() {
      this.displayValue = "";
    },
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
  height: 100%;
  border-style: solid;
  border-radius: 10px;
  justify-items: center;
  background-color: #FCF5F2;
  padding: 10px;
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

.display p {
  margin: 0;
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
  justify-items: center;
}

.buttonsDisplay {
  font-size: 2.5em;
  padding: 5%;
  border-radius: 15px;
  border-width: 1px;
  width: 80%;
  background-color: #fff;
}

.buttonConfirm {
  background-color: #EC6B5A;
  color: white;
  align-self: center;
  width: 65%;
  height: 80%;
  font-size: 2em;
  border: none;
}

.buttonConfirm:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.remainingTip {
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
  color: #ec776a;
  background-color: white;
  border: 1px solid #ec776a;
  width: 80%;
  border-radius: 15px;
}

button {
  cursor: pointer;
}
</style>