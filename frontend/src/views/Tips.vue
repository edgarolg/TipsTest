<template>
  <div class="tips">
    <header class="header">
      <HeaderInfo />
    </header>
    <div class="main-content">
      <section class="section ">Section 1</section>
      <section class="section ">
        <ValueInput />
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
import ValueInput from '@/components/ValueInput.vue';

export default defineComponent({
  name: 'TipsView',
  components: {
    HeaderInfo,
    ValueInput,
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
