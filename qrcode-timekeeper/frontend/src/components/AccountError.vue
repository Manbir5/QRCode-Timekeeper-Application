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
    <h1 class="green">Access Denied</h1>
    <div class="icon_square">
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
    <div class="unauthorized_message">We don't recognize your account!</div>

    <a class="btn btn-primary" href="/newaccount" role="button">Create Account</a>
    <br />
    <a class="btn btn-primary" href="/editaccount" role="button">Edit Account</a>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  color: #1d3461;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.unauthorized_message {
  font-size: 7vw;
  text-align: center;
  color: #1d3461;
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
