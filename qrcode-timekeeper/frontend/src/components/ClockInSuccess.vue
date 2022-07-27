<script setup>
import NavBar from "./NavBar.vue";
import CurrentTime from "./CurrentTime.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NavBar />
  <div v-if="!isLoading">
    <div class="greetings">
      <h1 class="green">Success</h1>
      <div class="icon_square">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="employee_details">
        <h4 class="employee_name">{{ name }}</h4>
        <h4 class="clock_in_time">
          Clock In:
          <CurrentTime />
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import TimeLogDataService from "../services/TimeLogDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";
import currentDateTime from "../mixins/current-date-time.js";

export default {
  name: "get-employee",
  mixins: [uniqueIdentifier, currentDateTime],
  data() {
    return {
      unique_identifier: null,
      first_name: "",
      last_name: "",
      date: "",
      hours: 0,
      is_approved: false,
      is_incomplete: true,
      clock_in: "",
      clock_out: "",
      isLoading: true,
    };
  },
  computed: {
    name: function () {
      return this.first_name + " " + this.last_name;
    },
  },
  methods: {
    getEmployee() {
      EmployeeDataService.get(this.unique_identifier)
        .then((response) => {
          this.first_name = response.data.first_name;
          this.last_name = response.data.last_name;
          this.date = this.currentDate();
          this.clock_in = this.currentTime();
          this.isLoading = false;
          this.saveTimeLog();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveTimeLog() {
      var data = {
        first_name: this.first_name,
        last_name: this.last_name,
        employee_id: this.unique_identifier,
        date: this.date,
        hours: this.hours,
        clock_in: this.clock_in,
        clock_out: this.clock_out,
        is_approved: this.is_approved,
        is_incomplete: this.is_incomplete,
      };
      TimeLogDataService.create(data)
        .then((response) => {
          this.entry_id = response.data.id;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.unique_identifier = this.getUniqueIdentifier();
    if (this.unique_identifier !== undefined) {
      this.getEmployee();
    }
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h4 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.employee_details {
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
  color: green;
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
