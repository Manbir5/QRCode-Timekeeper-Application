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
    <div class="unauthorized_message">
      You are not authorized to view this page.
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.unauthorized_message {
  font-size: 8vw;
  text-align: center;
}

.icon_square {
  height: 65vw;
  width: 65vw;
  margin: 0 auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.icon_square svg {
  color: red;
  width: 100%;
  height: 100%;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
