<script setup>
import NavBar from "./NavBar.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NavBar />
  <div class="greetings">
    <h1 class="green">Clock Out Error</h1>
    <div class="icon_square">
      <i class="fa-solid fa-circle-exclamation"></i>
    </div>
    <div class="unauthorized_message">You have not clocked in!</div>
    <div class="instructions">Please click below to clock in.</div>
    <a class="btn btn-primary" href="/confirmclockinaccess" role="button">Clock In</a>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  margin-top: -50px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.instructions {
  font-size: 5vw;
  text-align: center;
}

.unauthorized_message {
  font-size: 7vw;
  text-align: center;
}

.icon_square {
  height: 65vw;
  width: 65vw;
  margin: 0 auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
}

.icon_square svg {
  color: red;
  width: 100%;
  height: 100%;
}

a[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-top: 20px;
  margin-bottom: -30px;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }

  a[class="btn btn-primary"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
}
</style>
