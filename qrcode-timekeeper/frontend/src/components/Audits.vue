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
    <h1 class="green">Audits</h1>
    <div>
      <br />
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="audit in audits">
            <tr>
              <td>{{ audit.name }}</td>
              <td>{{ audit.date }}</td>
              <td>
                <a
                  @click="
                    $router.push({
                      name: 'SpecificAudit',
                      query: { entry_id: audit.view },
                    })
                  "
                  class="btn btn-primary"
                  >View</a
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ManagerEntryDataService from "../services/ManagerEntryDataService.js";

export default {
  name: "audits",
  data() {
    return {
      audits: this.audits,
    };
  },
  methods: {
    getUnapprovedLog() {
      ManagerEntryDataService.findAudits().then((response) => {
        console.log(response);
        this.audits = [];
        let counter = 0;
        for (let entry in response.data) {
          let date = new Date(response.data[counter].date).toLocaleDateString();
          let name =
            response.data[counter].employee_first_name +
            " " +
            response.data[counter].employee_last_name;
          this.audits.push({
            date: date,
            name: name,
            view: response.data[counter].index,
          });
          counter += 1;
        }
      });
    },
  },
  mounted() {
    this.getUnapprovedLog();
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
