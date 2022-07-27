<script setup>
import NavBar from "./NavBar.vue";
import AdminError from "./AdminError.vue";
import FormSubmissionSuccess from "./FormSubmissionSuccess.vue";
</script>

<template>
  <NavBar />
  <div v-if="!isManager && !isLoading">
    <AdminError />
  </div>
  <div v-else-if="!isLoading">
    <div v-if="!submitted" class="promote-manager-form">
      <form @submit.prevent="saveManagersInfo">
        <h1>Promote Employee to Manager Form</h1>
        <h3>To select multiple employees, hold CTRL and click on multiple names</h3>
        <div>Selected names: {{ form_submission.selected_names }}</div>
        <br />
        <select
          v-model="form_submission.selected_names"
          class="form-select"
          multiple
          aria-label="multiple select example"
        >
          <option v-for="employee in not_managers_list">
            {{ employee.employee_id }}, {{ employee.last_name }},
            {{ employee.first_name }}
          </option>
        </select>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div v-else>
      <FormSubmissionSuccess msg="Manager has been added!" />
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import ManagersInfoDataService from "../services/ManagersInfoDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "promote-manager",
  mixins: [uniqueIdentifier],
  data() {
    return {
      form_submission: {
        selected_names: [],
      },
      submitted: false,
      employees_list: "",
      managers_list: "",
      managers_id: [],
      not_managers_list: [],
      manager_id: "",
      isManager: false,
      isLoading: true,
      unique_identifier: null,
    };
  },
  methods: {
    getManager() {
      ManagersInfoDataService.get(this.unique_identifier)
        .then((response) => {
          this.isManager = true;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    getAllEmployees() {
      EmployeeDataService.getAll()
        .then(async (response) => {
          this.employees_list = response.data;
          this.getManagers();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getManagers() {
      ManagersInfoDataService.getAll()
        .then(async (response) => {
          this.managers_list = response.data;

          for (let x = 0; x < this.managers_list.length; x++) {
            this.managers_id.push(this.managers_list[x].manager_id);
          }

          for (let i = 0; i < this.employees_list.length; i++) {
            if (this.managers_id.includes(this.employees_list[i].employee_id) == false) {
              this.not_managers_list.push(this.employees_list[i]);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveManagersInfo() {
      for (var i = 0; i < this.form_submission.selected_names.length; i++) {
        this.manager_id = this.form_submission.selected_names[i].split(",")[0];
        this.manager_last_name = String(
          this.form_submission.selected_names[i].split(",")[1]
        ).trim();
        this.manager_first_name = String(
          this.form_submission.selected_names[i].split(",")[2]
        ).trim();

        var data = {
          manager_first_name: this.manager_first_name,
          manager_last_name: this.manager_last_name,
          manager_id: this.manager_id,
        };
        ManagersInfoDataService.create(data)
          .then((response) => {
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.unique_identifier = this.getUniqueIdentifier();
    if (this.unique_identifier !== undefined) {
      this.getManager();
    } else {
      this.isLoading = false;
    }
    this.getAllEmployees();
  },
};
</script>
<style>
.promote-manager-form {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
