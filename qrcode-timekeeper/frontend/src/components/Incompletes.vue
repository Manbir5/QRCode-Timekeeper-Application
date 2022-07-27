<script setup>
import NavBar from "./NavBar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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
    <h1 class="green">Incompletes</h1>
     <div>
         <br/>
 <table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">In or Out</th>
    </tr>
  </thead>
  <tbody>
      <template v-for="incomplete in incompletes">
          <tr>
            <td>{{incomplete.name}}</td>
            <td>{{incomplete.date}}</td>
            <td>{{incomplete.missing}}</td>
          </tr>
      </template>
  </tbody>
</table>


    </div>
  </div>
</template>

<script>
import TimeLogDataService from "../services/TimeLogDataService.js";
export default {
  name: "incompletes",
  data() {
    return {
      incompletes: this.incompletes,
    };
  },
  methods: {
    getIncompleteLogs() {
      TimeLogDataService.findIncompleteLogs().then((response) => {
        console.log(response);
        this.incompletes = [];
        let counter = 0;
        for (let entry in response.data) {
          let date = new Date(response.data[counter].date).toLocaleDateString();
          let name =
            response.data[counter].first_name +
            " " +
            response.data[counter].last_name;
          let in_or_out = "In";

          if (response.data[counter].clock_out == "00:00:00" || !response.data[counter].clock_out){
              in_or_out = "Out";
          }

          this.incompletes.push({
            date: date,
            name: name,
            missing: in_or_out,
          });
          counter += 1;
        }
      });
    },
  },
  mounted() {
    this.getIncompleteLogs();
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

.audit_row{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-auto-flow: column;
  font-size: 7vw;
  padding-top: 3%;
}

.audit_row_1{
  position: absolute;
  bottom: 0;
  text-decoration: underline;
}

.audit_row_2{
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
