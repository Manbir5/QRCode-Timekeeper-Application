<script setup></script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

.title {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  border-bottom: px solid black;
  background-color: #f2dda2;
}

h1 {
  top: -10px;
  font-weight: 500;
  font-size: 2.6rem;
  top: 3px;
  left: 10px;
}

.col {
  display: grid;
  grid-template-columns: 800px 1fr;
}

.qrcode {
  margin-top: 50px;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
</style>
