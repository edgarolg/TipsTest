<template>
  <div class="tips">
    <header class="header">
      <HeaderInfo />
    </header>
    <div class="main-content">
      <section class="section">
        <DivisionTip :totalTips="totalTips" :personsAmount="personsAmount" />
        
        <PaymentMethod
          :methods="methods"
          @inputPaymentMethod="setPaymentMethod"
        />
      </section>
      <section class="section">
        <InputTips
          @inputAmount="setTotalTips"
          @inputPersons="setPersonsAmount"
          @inputPayAmount="handlePayment"
          :remainingAmount="remainingAmount" 
        />
      </section>

      <section class="section">
        <PaymentsSection :payments="payments" @remove-payment="deletePayment" />
      </section>
    </div>
    <div class="resultPayment">
      <div class="totalTipsResume">
        <div class="totalPaid">
          <p class="title orange">Total Pagado</p>
          <p class="title orange">{{ totalPaid }}</p>
        </div>
        <div class="remainingPay">
          <p class="title">Restante por Pagar </p>
          <p class="title">{{ remainingAmount }}</p>
        </div>
      </div>
      <div class="totalPaidConfirmation">
        <button
          @click="submitTips"
          :class="{'payButton': totalPaid > 0, 'payButtonDisabled': totalPaid === 0}"
          :disabled="remainingAmount > 0"
        >
          Pagar {{ totalPaid }} Propinas
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import HeaderInfo from "@/components/HeaderInfo.vue";
import InputTips from "@/components/InputTips.vue";
import DivisionTip from "@/components/DivisionTip.vue";
import PaymentMethod from "@/components/PaymentMethod.vue";
import PaymentsSection from "@/components/PaymentsSection.vue";
import { savePayments, completePayment } from "@/api/tipsService";

export default defineComponent({
  name: "TipsView",
  components: {
    HeaderInfo,
    InputTips,
    DivisionTip,
    PaymentMethod,
    PaymentsSection,
  },
  data() {
    return {
      totalTips: 0, // Total de propinas a pagar
      methods: ["Efectivo", "BBVA 1234", "Santander 1234"], // Métodos de pago disponibles
      personsAmount: 0, // Número de personas para dividir la propina
      payments: [], // Lista de pagos realizados
      payAmount: "", // Monto del pago ingresado
      selectedMethod: "", // Método de pago seleccionado
      currentInput: "", // Controla la interacción actual (por ejemplo, "pay")
      tipAmount: 0, // Monto total de la propina asignada
    };
  },
  computed: {
    totalPaid() {
      // Calcula el total de los montos en el array de pagos
      return this.payments.reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
      );
    },
    remainingAmount() {
      // Calcula la cantidad restante a pagar
      return this.totalTips - this.totalPaid;
    },
  },
  methods: {
    setTotalTips(newTotal) {
      this.totalTips = Number(newTotal); // Actualizamos el valor de totalTips
    },
    setPersonsAmount(newPersons) {
      this.personsAmount = Number(newPersons); // Actualizamos el número de personas
      this.currentInput = "pay"; // Cambiamos el estado a "pay"
      console.log("cambio de estado", this.currentInput);
    },
    setPaymentMethod(method) {
      this.selectedMethod = method; // Establecemos el método de pago seleccionado
    },
    deletePayment(index) {
      // Elimina el pago del array en la posición especificada
      this.payments.splice(index, 1);
    },
    async handlePayment(newPayAmount) {
      // Validación de método de pago
      if (!this.selectedMethod) {
        alert("Por favor, selecciona un método de pago.");
        return;
      }

      // Validación de monto
      if (!newPayAmount || newPayAmount <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
      }

      // Crear el objeto de pago
      const paymentEntry = {
        payMethod: this.selectedMethod,
        amount: parseFloat(newPayAmount).toFixed(2), // Solo formateamos cuando es necesario mostrarlo
      };

      const paymentRequest = {
        payments: [paymentEntry],
        amount: this.totalTips, // Incluimos el monto total de las propinas
      };

      // Añadir el nuevo pago al array local
      this.payments.push(paymentEntry);

      // Realizamos la solicitud a la API
      try {
        const response = await savePayments(paymentRequest.payments, paymentRequest.amount);
        console.log("Pagos registrados exitosamente:", response);
        // Realiza las acciones necesarias después de un pago exitoso
      } catch (error) {
        console.error("Error al registrar pagos:", error);
      }
    },
    submitTips: async function () {
      if (this.remainingAmount > 0) {
        alert("Por favor, completa el pago de las propinas.");
        return;
      }

      try {
        // Mandar propina por la API a la base de datos y esperar la respuesta
        const response = await completePayment(this.totalTips);

        // Si la respuesta es exitosa, continúa con el resto de las acciones
        console.log(
          "Propina Completada",
          this.totalTips,
          this.personsAmount,
          this.payments
        );

        // Reiniciamos los valores
        this.totalTips = 0;
        this.personsAmount = 0;
        this.payments = [];
        this.payAmount = "";
        this.selectedMethod = "";
        this.currentInput = "tip";
        // Aquí puedes manejar lo que quieras hacer con la respuesta, si es necesario
        console.log("Respuesta de la API:", response.data);
      } catch (error) {
        // Si ocurre un error en la llamada a la API
        console.error("Error al completar el pago:", error);
        alert("Hubo un error al completar el pago. Intenta de nuevo.");
      }
    },
  },
});
</script>

<style scoped>
.tips {
  width: 95%;
  margin: auto;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  padding: 1rem;
  text-align: center;
  height: 10vh;
}

.main-content {
  display: flex;
  flex: 1;
  height: 60vh;
}

.section {
  flex: 1;
  padding: 1rem;
}

.resultPayment {
  padding: 1rem;
  text-align: center;
  margin-top: 2vh;
  height: 15vh;
  display: flex;
  flex-wrap: nowrap;
}

.totalTipsResume {
  display: grid;
  align-items: center;
  width: 100%;
}

.totalPaidConfirmation {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
}

.totalPaid {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin: auto;
  text-align: left;
  justify-content: space-between;
}

.remainingPay {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin: auto;
  justify-content: space-between;
  text-align: left;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}


.orange {
  color: #ee6556;
}

.payButton {
  background-color: #ee6556;
  color: white;
  border: 1px solid #ccc;
  font-size: 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  width: 80%;
  height: 50%;
  margin: auto;
}

.payButtonDisabled {
  background-color: transparent;
  color: #ccc;
  border: 1px solid #ccc;
  font-size: 1.5rem;
  border-radius: 25px;
  cursor: not-allowed;
  width: 80%;
  height: 50%;
  margin: auto;
}

</style>
