export default {
  methods: {
    setUniqueIdentifier(employee_id) {
      window.localStorage.setItem("employee_id", employee_id.toString());
    },
    getUniqueIdentifier() {
      return JSON.parse(window.localStorage.getItem("employee_id"));
    },
    clearUniqueIdentifier() {
      window.localStorage.removeItem("employee_id");
    },
  },
};
