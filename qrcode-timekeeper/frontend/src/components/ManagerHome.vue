<script setup>
import NavBar from "./NavBar.vue";

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
    <h1 class="green">Welcome Manager</h1>
    <div class="audit_row">
      <div>
        <span class="audit_row_1"
          ><b>{{ return_audit_numbers }}</b></span
        >
      </div>
      <div>
        <span class="audit_row_2"><b>Audits</b></span>
      </div>
      <div><a href="/audits" class="btn btn-primary">View</a></div>
    </div>
    <div class="audit_row">
      <div>
        <span class="audit_row_1"
          ><b>{{ return_incomplete_numbers }}</b></span
        >
      </div>
      <div>
        <span class="audit_row_2"><b>Incompletes</b></span>
      </div>
      <div><a href="/incompletes" class="btn btn-primary">View</a></div>
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
      audits: 0,
      incompletes: 0,
    };
  },
  methods: {
    getUnapprovedLog() {
      ManagerEntryDataService.findAudits().then((response) => {
        for (let entry in response.data) {
          this.audits += 1;
        }
        console.log("audits:" + this.audits);
      });
    },
    getIncompletes() {
      TimeLogDataService.findIncompleteLogs().then((response) => {
        for (let entry in response.data) {
          this.incompletes += 1;
        }
        console.log("Incompletes:" + this.incompletes);
      });
    },
  },
  mounted() {
    this.getUnapprovedLog();
    this.getIncompletes();
  },
  computed: {
    return_audit_numbers: function () {
      return this.audits;
    },
    return_incomplete_numbers: function () {
      return this.incompletes;
    },
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
