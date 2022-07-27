<script>
import currentDateTime from "../mixins/current-date-time.js";

export default {
  mixins: [currentDateTime],
};
</script>

<template>{{ this.currentDate() }} {{ this.currentTime() }}</template>
