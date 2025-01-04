<template>
  <div class="header-info">
    <button class="backButton">Atrás</button>
    <h1 class="pageTitle">Pago de Propinas</h1>
    <div class="spacer"></div>
    <div class="moneyInRegister">
      <div class="moneyInRegisterTitle">Efectivo en Caja</div>
      <div class="moneyInRegisterContainer">
        <h1 class="moneyInRegisterValue">$5,500.00</h1></div>
    </div> 
  </div>
  <hr  style="border: 1px solid #000; margin: 20px 0;" />
</template>

<script>
export default {
  name: 'HeaderInfo',
};
</script>

<style scoped>
.header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button {
  margin-right: 20px;
}
input {
  width: 200px;
}

.backButton {
  border: none;
  color: #F08D81;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: fit-content;
}
.pageTitle {
  font-size: 30px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
}

.moneyInRegister {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
}

.spacer {
  flex-grow: 1;
}

.moneyInRegisterTitle {
  font-size: 12px;
  color: #F08D81;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
}

.moneyInRegisterContainer{
  display: flex;
  justify-content: center;
  background-color: #E8D4D1;
  border-radius: 10px;
  padding: 10px;
}

.moneyInRegisterValue {
  margin: 0%;
  color: #ec776a;
}

</style>