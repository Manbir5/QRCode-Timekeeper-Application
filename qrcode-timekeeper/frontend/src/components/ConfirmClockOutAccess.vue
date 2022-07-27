<script setup>
import ClockOutSuccess from "./ClockOutSuccess.vue";
import AccountError from "./AccountError.vue";
import ClockOutError from "./ClockOutError.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-if="!isLoading">
    <div v-if="isEmployee && isIncomplete">
      <ClockOutSuccess />
    </div>
    <div v-else-if="!isIncomplete">
      <ClockOutError />
    </div>
    <div v-else>
      <AccountError />
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import TimeLogDataService from "../services/TimeLogDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "get-employee",
  mixins: [uniqueIdentifier],
  data() {
    return {
      isEmployee: false,
      isLoading: true,
      unique_identifier: null,
    };
  },
  methods: {
    getEmployee() {
      EmployeeDataService.get(this.unique_identifier)
        .then((response) => {
          this.isEmployee = true;
        })
        .then(() => {
          this.getIncomplete();
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    getIncomplete() {
      TimeLogDataService.findIncompleteLog(this.unique_identifier)
        .then((response) => {

          if (response.data.total != 0) {
            this.isIncomplete = true;
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.unique_identifier = this.getUniqueIdentifier();
    if (this.unique_identifier !== undefined) {
      this.getEmployee();
    } else {
      this.isLoading = false;
    }
  },
};
</script>

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
  margin-top: 10px;
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
