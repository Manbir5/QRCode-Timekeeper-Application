<script setup>
import NavBar from "./NavBar.vue";
</script>

<template>
  <NavBar />

  <div v-if="!edit_submit">
    <h3>{{ return_date }}</h3>

    <div class="form">
      <form @submit.prevent="saveEditedLog">
        <div class="form-group">
          <label for="InputTime">Clock In:</label>
          <input
            type="text"
            class="form-control"
            id="edited_clock_in"
            v-model="form_submission.edited_clock_in"
            :placeholder="return_original_clock_in"
            required
          />
        </div>
        <div class="form-group">
          <label for="ClockOutTime">Clock Out:</label>
          <input
            type="text"
            class="form-control"
            id="edited_clock_out"
            v-model="form_submission.edited_clock_out"
            :placeholder="return_original_clock_out"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
      </form>
    </div>
  </div>
  <div v-else>
    <h1>Success</h1>
  </div>
</template>

<script>
import uniqueIdentifier from "../mixins/unique-identifier.js";
import TimeLogDataService from "../services/TimeLogDataService.js";
import ManagerEntryDataService from "../services/ManagerEntryDataService.js";

export default {
  name: "get-employee",
  mixins: [uniqueIdentifier],
  data() {
    return {
      form_submission: {
        edited_clock_in: "",
        edited_clock_out: "",
      },
      unique_identifier: null,
      date: "",
      clockInTime: "",
      clockOutTime: "",
      first_name: "",
      last_name: "",
      edit_submit: false,
    };
  },
  computed: {
    return_date: function () {
      return this.date;
    },
    return_original_clock_in: function () {
      return this.clockInTime;
    },
    return_original_clock_out: function () {
      return this.clockOutTime;
    },
  },
  created() {
    this.entry_id = this.$route.params.entry_id;
  },
  methods: {
    getTimeLogData() {
      TimeLogDataService.getSpecificLog(this.entry_id)
        .then((response) => {
          this.date = response.data.date;
          this.clockInTime = response.data.clock_in;
          this.clockOutTime = response.data.clock_out;
          this.first_name = response.data.first_name;
          this.last_name = response.data.last_name;
          this.hours = response.data.hours;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedLog() {
      var data = {
        employee_first_name: this.first_name,
        employee_last_name: this.last_name,
        id_for_employee: this.unique_identifier,
        date: this.date,
        hours: this.hours,
        original_clock_in: this.clockInTime,
        original_clock_out: this.clockOutTime,
        edited_clock_in: this.form_submission.edited_clock_in,
        edited_clock_out: this.form_submission.edited_clock_out,
        entry_id: this.entry_id,
        edited_hours: this.calculateHours(
          this.form_submission.edited_clock_in,
          this.form_submission.edited_clock_out
        ),
      };
      ManagerEntryDataService.create(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        }),
        (this.edit_submit = true);
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
      this.getTimeLogData();
    }
  },
};
</script>

<style>
h1 {
  text-align: center;
}

.form {
  margin: auto;
  width: 100%;
  padding: 100px;
}

.form-group {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

button[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  margin-top: 20px;
}

@media only screen and (max-width: 620px) {
  .form {
    width: 80%;
    padding: 10px;
  }

  .form-group {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  button[class="btn btn-primary"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
