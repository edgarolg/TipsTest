<template>
  <div class="total-tips">
    <h2>Total de Propinas</h2>
    <p class="amount">$1,500.00 <button class="edit-button">✏️</button></p>
  </div>

  <div class="division">
    <label for="division-input">¿Entre cuántos quieres dividir las Propinas?</label>
    <input
      id="division-input"
      type="number"
      v-model="divisionCount"
      @input="updateDivision"
    />
    <p class="per-person">{{ perPerson }} x Persona</p>
  </div>
</template>

<script>
export default {
  name: 'DivisionTip',
  data() {
    return {
      divisionCount: 1,
      totalTips: 1500,
    };
  },
  computed: {
    perPerson() {
      return (this.totalTips / this.divisionCount).toFixed(2);
    },
  },
  methods: {
    updateDivision() {
      if (this.divisionCount < 1) {
        this.divisionCount = 1;
      }
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