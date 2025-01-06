<template>
  <div class="divisionTip">
    <div class="totalTips">
      <h2 class="totalTipsTitle">Total de Propinas</h2>
      <div class="totalTipsContainer">
      <p class="amount">
        $ {{ totalTips }} 
      </p>
      <span class="editButton">✎</span>
    </div>
    </div>

    <div class="division">
      <p class="divisionInput"
        >¿Entre cuántos quieres dividir las Propinas?</p
      >
      <div class="divisionResults">
        <p class="amountPerson">{{ personsAmount }}</p>
        <p class="perPerson">$ {{ perPerson }} x Persona</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DivisionTip",
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
      if (!this.personsAmount || this.personsAmount < 1) return "0.00";
      return (this.totalTips / this.personsAmount).toFixed(2);
    },
  },
};
</script>

<style scoped>

.divisionTip {
  margin-bottom: 5%;
}
.totalTips {
  margin-bottom: 20px;
  color: #dc675a;
  width: 60%;
  height: 20%;
  margin: 5% auto;
}

.totalTipsTitle{
  font-size: 14px;
  margin: 0;
  padding: 10px;
  width: fit-content;
}

.totalTipsContainer {
  display: flex;
  align-items: center;
}

.amount {
  font-size: 24px;
  font-weight: bold;
  background-color: #f8c6c1;
  padding: 5%;
  color: #dc675a;
  border-radius: 10px;
  margin: 0;
  width: 80%;
}


.editButton {
  background: none;
  border: none;
  color: black;
  width: 20%;
  font-size: 35px;
}

.division {
  margin-top: 20px;
}

.divisionInput {
  width: 100%;
  color: black;
  margin: 2% 0%;
  font-size: 1.4em;
  font-weight: bold;
  text-align: left;
}

.divisionResults {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;
}

.amountPerson {
  font-size: 16px;
  font-weight: bold;
  padding: 5% 1%;
  color: #000;
  border-radius: 10px;
  margin: 0;
  width: 10%;
  border: #000 solid 1px;

}

.perPerson {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #dc675a;
}
</style>
