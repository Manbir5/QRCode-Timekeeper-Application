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
  <div class="greetings">
    <h1 class="green">Success</h1>
    <div class="icon_square">
      <i class="fa-solid fa-circle-check"></i>
    </div>
    <div class="employee_details">
      <h4 class="employee_name">{{ name }}</h4>
      <h4 class="clock_out_time">
        Clock Out:
        <CurrentTime />
      </h4>
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
      is_incomplete: false,
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
          this.clock_out = this.currentTime();
          this.isLoading = false;
          this.findLog();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    findLog() {
      console.log("findlog data");
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
      console.log(data);
      TimeLogDataService.findLog(data.employee_id)
        .then((response) => {
          this.entry_id = response.data.id;
          console.log(response.data);
          var hours_worked = this.calculateHours(response.data.clock_in, this.clock_out);
          this.updateLog(response.data.entry_id, hours_worked);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateLog(entry_id, hours_worked) {
      var data = {
        clock_out: this.clock_out,
        log_id: entry_id,
        hours: hours_worked,
        is_incomplete: this.is_incomplete,
      };
      TimeLogDataService.updateLog(data);
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
    calculateHours(clock_in, clock_out) {
      var clock_in_arr = clock_in.split(":");
      var clock_out_arr = clock_out.split(":");
      var clock_in_total = parseInt(clock_in_arr[0]) * 60 + parseInt(clock_in_arr[1]);
      var clock_out_total = parseInt(clock_out_arr[0]) * 60 + parseInt(clock_out_arr[1]);
      console.log(`IN: ${clock_in_total}`);
      console.log(`OUT: ${clock_out_total}`);
      if (clock_in_arr[0] > clock_out_arr[0]) {
        clock_out_total += 720;
      }

      var total_hours_worked = (clock_out_total - clock_in_total) / 60;
      console.log(`Total: ${total_hours_worked.toFixed(2)}`);
      return total_hours_worked.toFixed(2);
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
