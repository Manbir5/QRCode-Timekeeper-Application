<script setup></script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <nav class="navbar fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#">QRCode Timekeeper
      <a href="/admin" class="btn btn-dark" role=" button" aria-pressed="true">Admin</a>
    </a>
  </nav>
</template>

<style>
a[class="navbar-brand"] {
  display: block;
  width: 100%;
  text-align: center;
}

a[class="btn btn-dark"] {
  font-size: 80%;
  position: absolute;
  top: 50%;
  right: 0;
  width: 60px;
  transform: translateY(-50%);
}
</style>
