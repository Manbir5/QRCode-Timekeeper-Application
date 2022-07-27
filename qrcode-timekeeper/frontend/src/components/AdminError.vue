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
  <div class="admin-error">
    <h1 class="green">Access Denied</h1>
    <div class="icon_square">
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
    <h1>You do not have access to this page</h1>
    <a class="btn btn-primary" href="/" role="button">Back to Homepage</a>
  </div>
</template>

<style scoped>
h1 {
  font-size: 200%;
  text-align: center;
  padding-bottom: 50px;
}

.admin-error {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200%;
  padding: 50px 0;
}

.unauthorized_message {
  font-size: 7vw;
  text-align: center;
}

.icon_square svg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 50px 0;
  width: 30%;
  height: 30%;
  color: red;

}

a[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  margin-top: 10px;
  margin-bottom: -30px;
}
</style>
