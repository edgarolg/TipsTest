<template>
  <div>
    <div class="total-tips">
      <h2>Total de Propinas</h2>
      <p class="amount">$ {{ totalTips }}  <button class="edit-button">✏️</button></p>
    </div>

    <div class="division">
      <label for="division-input">¿Entre cuántos quieres dividir las Propinas?</label>    
      <p class="amount"> {{ personsAmount }} </p>
      <p class="per-person">{{ perPerson }} x Persona</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivisionTip',
  props: {
    totalTips: {
      type: Number,
      required: true,
    },
    personsAmount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    perPerson() {
      if (!this.personsAmount || this.personsAmount < 1) return '0.00';
      return (this.totalTips / this.personsAmount).toFixed(2);
    },
  },
};
</script>

<style scoped>
.total-tips {
  margin-bottom: 20px;
}

.amount {
  font-size: 24px;
  font-weight: bold;
}

.edit-button {
  background: none;
  border: none;
  cursor: pointer;
}

.division {
  margin-top: 20px;
}

.per-person {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
