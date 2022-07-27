<script setup>
import QRCode from "./QRCode.vue";
import NavBar from "./NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="col">
    <div id="clock in" class="qrcode">
      <h2>Clock In</h2>
      <QRCode value="https://frontend-for-heroku.herokuapp.com/confirmclockinaccess" size="300" foreground="#63577d" />
    </div>
    <div id="time log" class="qrcode">
      <h2>Clock Out</h2>
      <QRCode value="https://frontend-for-heroku.herokuapp.com/confirmclockoutaccess" size="300" foreground="#323a6b" />
    </div>
    <div id="clock out" class="qrcode">
      <h2>Time Log</h2>
      <QRCode value="https://frontend-for-heroku.herokuapp.com/timelog" size="300" foreground="#4F6D7A" />
    </div>
    <div id="manage" class="qrcode">
      <h2>Manage</h2>
      <QRCode value="https://frontend-for-heroku.herokuapp.com/manager" size="300" foreground="#166088" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
  max-width: 1650px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

canvas {
  height: 17vw !important;
  width: 17vw !important;
}

.col {
  display: grid;
  grid-template-columns: 65vw 1fr;
  margin: 0 auto;
}

.qrcode {
  margin-top: 20px;
}

header {
  line-height: 1.5;
}

@media (max-width: 1500px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    font-family: sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
  }

  canvas {
    height: 17vw !important;
    width: 17vw !important;
  }
}
</style>
