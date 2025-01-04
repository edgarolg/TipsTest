<template>
  <div class="calculator">
    <div class="display">
      <p>$</p>
      <p placeholder="000.00">{{ displayValue }}</p>
      <button @click="clear" class="clearButton">⌫</button>
    </div>
    <hr style="border: 1px solid #000; margin: 0; width: 80%;" />
    <div class="buttonsContainer">
      <button v-for="n in 9" :key="n" @click="inputNumber(n % 10)" class="buttons">{{ n % 10 }}</button>
      <button @click="inputNumber('00')" class="buttons">00</button>
      <button @click="inputNumber('0')" class="buttons">0</button>
      <button @click="saveTip" class="buttons confirm">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValueInput',
  data() {
    return {
      displayValue: '',
      tip: 0
    };
  },
  methods: {
    inputNumber(number) {
      this.displayValue += number;
    },
    clear() {
      this.displayValue = '';
    },
    saveTip() {
      this.tip = parseFloat(this.displayValue);
      this.$emit('update:tip', this.tip);
      this.clear();
    }
  }
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
}

.buttons {
  font-size: 3em;
  padding: 5%;
  border-radius: 15px;
  border-width: 1px;
}

button {
  font-size: 1.5em;
  padding: 10px;
}
</style>