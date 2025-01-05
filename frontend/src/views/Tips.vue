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
        />
        <div v-if="payAmount && currentInput === 'pay'" class="remaining-tip">
          <p>Cantidad restante: ${{ (totalTips - totalPaid).toFixed(2) }}</p>
        </div>
      </section>

      <section class="section">
        <PaymentsSection :payments="payments" />
      </section>
    </div>
    <div class="footer">
      <div class="total-paid">
        <p>Total Pagado</p>
        <p>{{ totalPaid }}</p>
      </div>
      <div class="remaining-to-pay">
        <p>Restante por Pagar</p>
        <p>{{ remainingAmount }}</p>
      </div>
      <button
        @click="submitTips"
        class="pay-button"
        :disabled="remainingAmount > 0"
      >
        Pagar Propinas
      </button>
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
    },
    setPaymentMethod(method) {
      this.selectedMethod = method; // Establecemos el método de pago seleccionado
    },
    handlePayment(newPayAmount) {
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
      axios
        .post("http://localhost:3000/api/payments", paymentRequest)
        .then((response) => {
          console.log("Respuesta de la API:", response.data);
          // Realiza las acciones necesarias después de un pago exitoso
        })
        .catch((error) => {
          console.error(
            "Error al registrar el pago:",
            error.response || error.message
          );
          alert("Hubo un error al registrar el pago. Intenta de nuevo.");
        });
    },
    submitTips: async function () {
      if (this.remainingAmount > 0) {
        alert("Por favor, completa el pago de las propinas.");
        return;
      }

      try {
        // Mandar propina por la API a la base de datos y esperar la respuesta
        const response = await axios.post(
          "http://localhost:3000/api/payments/complete",
          {
            amount: this.totalTips, // El monto total de las propinas que se desean completar
          }
        );
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
        this.currentInput = "";

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
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

.main-content {
  display: flex;
  flex: 1;
}

.section {
  flex: 1;
  padding: 1rem;
  border: 1px solid #dee2e6;
}

.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}
</style>
