<script setup>
import NavBar from "./NavBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

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
    <div>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col"><b>Name</b></th>
            <th scope="col"><b>Date</b></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ name }}</td>

            <td>{{ return_date }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div class="time">
        <div class="time_child" v-if="return_new_clock_in != return_old_clock_in">
          <span style="color: red; text-decoration: line-through"
            ><span style="color: black">In: {{ return_old_clock_in }}</span></span
          >
        </div>
        <div class="time_child">In: {{ return_new_clock_in }}</div>
        <div class="time_child" v-if="return_new_clock_out != return_old_clock_out">
          <span style="color: red; text-decoration: line-through"
            ><span style="color: black">Out: {{ return_old_clock_out }}</span></span
          >
        </div>
        <div class="time_child">Out: {{ return_new_clock_out }}</div>
        <div class="footer">
          <div class="time_child">
            <a href="/audits" @click="updateLogs()" class="btn btn-success">Approve</a>
          </div>
          <div class="time_child">
            <a
              href="/audits"
              @click="deleteIndex(this.$route.query.entry_id)"
              class="btn btn-danger"
              >Deny</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerEntryDataService from "../services/ManagerEntryDataService.js";

import TimeLogDataService from "../services/TimeLogDataService.js";

export default {
  name: "audits",
  data() {
    return {
      unique_identifier: null,
      date: "01/10/10",
      clockInTime: "00:00",
      clockInOldTime: "00:00",
      clockOutTime: "00:00",
      clockOutOldTime: "04:00",
      first_name: "Place",
      last_name: "Holder",
      edited_clock_in: "",
      edited_clock_out: "",
      edit_submit: false,
      entry_id: 0,
      hours: 0,
    };
  },
  computed: {
    name: function () {
      return this.first_name[0] + " " + this.last_name;
    },
    return_date: function () {
      return this.date;
    },
    return_old_clock_in: function () {
      return this.clockInOldTime;
    },
    return_old_clock_out: function () {
      return this.clockOutOldTime;
    },
    return_new_clock_in: function () {
      return this.clockInTime;
    },
    return_new_clock_out: function () {
      return this.clockOutTime;
    },
  },
  methods: {
    getTimeLogData(id) {
      ManagerEntryDataService.getSpecificLog(id)
        .then((response) => {
          console.log(response);
          let date = new Date(response.data[0].date).toLocaleDateString();
          this.date = date;
          this.clockInTime = response.data[0].edited_clock_in;
          this.clockInOldTime = response.data[0].original_clock_in;
          this.clockOutOldTime = response.data[0].original_clock_out;
          this.clockOutTime = response.data[0].edited_clock_out;
          this.first_name = response.data[0].employee_first_name;
          this.last_name = response.data[0].employee_last_name;
          this.entry_id = response.data[0].entry_id;
          this.hours = response.data[0].edited_hours;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteIndex(index) {
      ManagerEntryDataService.deleteSpecificLog(index)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateLogs() {
      var obj = {
        log_id: this.entry_id,
        clock_in: this.clockInTime,
        clock_out: this.clockOutTime,
        hours: this.hours,
      };
      TimeLogDataService.updateLogFromAudit(obj);
      this.deleteIndex(this.$route.query.entry_id);
    },
  },
  mounted() {
    if (this.$route.query.entry_id) {
      this.getTimeLogData(this.$route.query.entry_id);
    }
  },
};
</script>

<style scoped>
a {
  width: 90%;
  font-size: 7vw;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

h3 {
  font-size: 1.2rem;
}

.time {
  text-align: center;
}

.time_child {
  font-size: 11vw;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border: 1px solid black !important;
  font-size: 8vw;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.unauthorized_message {
  font-size: 8vw;
  text-align: center;
}

.audit_row {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-auto-flow: column;
  font-size: 7vw;
  padding-top: 3%;
}

.audit_row_1 {
  position: absolute;
  bottom: 0;
  text-decoration: underline;
}

.audit_row_2 {
  position: absolute;
  bottom: 0;
}

.footer {
  margin-top: 20%;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
