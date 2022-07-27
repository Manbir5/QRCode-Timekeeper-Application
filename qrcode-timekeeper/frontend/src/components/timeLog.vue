d
<script setup>
import NavBar from "./NavBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
</script>

<template>
  <NavBar />

  <h3>{{ name }}</h3>
  <br />

  <div class="table_container">
    <DataTable
      styleClass="data_table_class"
      :value="entries"
      sortField="date"
      :sortOrder="-1"
      class="p-datatable-sm"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
    >
      <Column field="date" header="Date" :sortable="true"></Column>
      <Column field="hours" header="Hours"></Column>
      <Column field="view" header="View">
        <template #body="slotProps">
          <button
            class="view_button"
            type="button"
            @click="
              $router.push({
                name: 'SpecificTimeLog',
                params: { entry_id: slotProps.data.view },
              })
            "
          >
            View
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import uniqueIdentifier from "../mixins/unique-identifier.js";
import TimeLogDataService from "../services/TimeLogDataService.js";

export default {
  name: "get_time_log_for_employee",
  mixins: [uniqueIdentifier],
  data() {
    return {
      first_name: "",
      last_name: "",
      unique_identifier: null,
      entries: this.entries,
    };
  },
  computed: {
    name: function () {
      return this.first_name + " " + this.last_name;
    },
  },
  methods: {
    getEmployeeNameAndLog() {
      TimeLogDataService.getTimeLogForEmployee(this.unique_identifier)
        .then((response) => {
          this.first_name = response.data[0].first_name;
          this.last_name = response.data[0].last_name;
          this.entries = [];
          var counter = 0;
          for (let item in response.data) {
            this.entries.push({
              date: response.data[counter].date,
              hours: response.data[counter].hours,
              view: response.data[counter].entry_id,
            });
            counter += 1;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.unique_identifier = this.getUniqueIdentifier();
    if (this.unique_identifier !== undefined) {
      this.getEmployeeNameAndLog();
    }
  },
};
</script>

<style type="text/css">
h3 {
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 10 px;
  color: #1d3461;
}

.data_table_class table {
  border-collapse: separate;
  border-spacing: 10px;
  border-collapse: expression("separate", cellSpacing = "20px");
}

.table_container {
  color: #1d3461;
}

button[class="view_button"] {
  display: block;
  background-color: #6290c8;
  border-color: #1d3461;
  color: white;
}
</style>
