<script>
import QrcodeVue from "qrcode.vue";

export default {
  prop: ["value", "size", "foreground"],
  data() {
    return {
      value: this.value,
      size: this.size,
      foreground: this.foreground,
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>

<template>
  <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
</template>

<style scoped></style>
