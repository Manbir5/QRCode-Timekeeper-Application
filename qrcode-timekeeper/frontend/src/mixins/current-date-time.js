export default {
  methods: {
    currentTime() {
      var current = new Date();
      return current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    currentDate() {
      var current = new Date();
      return current.toLocaleDateString("zh-Hans-CN");
    },
  },
};
