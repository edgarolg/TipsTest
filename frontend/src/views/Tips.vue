<template>
  <div class="tips">
    <header class="header">
      <HeaderInfo />
    </header>
    <div class="main-content">
      <section class="section ">
        
        <DivisionTip :totalTips="totalTips" :personsAmount="personsAmount" />
        <PaymentMethod  :methods="methods" />
        
      </section>
      <section class="section ">
        <InputTips @inputAmount="setTotalTips" @inputPersons="setPersonsAmount" @inputPayAmount="setPayAmount" />
      </section>
      <section class="section ">Section 3</section>
    </div>
    <div class="footer">
    totales
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderInfo from '@/components/HeaderInfo.vue';
import InputTips from '@/components/InputTips.vue';
import DivisionTip from '@/components/DivisionTip.vue';
import PaymentMethod from '@/components/PaymentMethod.vue';

export default defineComponent({
  name: 'TipsView',
  components: {
    HeaderInfo,
    InputTips,
    DivisionTip,
    PaymentMethod,
  },
  data() {
    return {
      totalTips: 0, // Inicializamos el valor de las propinas
      methods: ['Efectivo', 'BBVA 1234', 'Santander 1234'],
      personsAmount: 0,
    };
  },
  methods: {
    setTotalTips(newTotal) {
      this.totalTips = Number(newTotal); // Actualizamos el valor de totalTips
    },
    setPersonsAmount(newPersons) {
      this.personsAmount = Number(newPersons); // Actualizamos el valor de totalTips
    },
    setPayAmount(newPay) {
      this.payAmount = Number(newPay); // Actualizamos el valor de totalTips
    },
  },
});
</script>

<style scoped>

.tips{
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
