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
    <div v-if="!submitted" class="update-manager-form">
      <form @submit.prevent="addManager">
        <h1>Change Employee's Manager Form</h1>
        <h3>This will change an employee's manager in the database</h3>
        <label for="employee">Employee:</label>
        <select
          v-model="form_submission.selected_employee"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option v-for="employee in employees_list">
            {{ employee.employee_id }}, {{ employee.last_name }},
            {{ employee.first_name }}
          </option>
        </select>
        <label for="new_manager">New Manager:</label>
        <select
          v-model="form_submission.selected_manager"
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option v-for="manager in managers_list">
            {{ manager.manager_id }}, {{ manager.manager_last_name }},
            {{ manager.manager_first_name }}
          </option>
        </select>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div v-else>
      <FormSubmissionSuccess msg="Employee's manager has been updated!" />
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import ManagersInfoDataService from "../services/ManagersInfoDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "update-manager",
  mixins: [uniqueIdentifier],
  data() {
    return {
      form_submission: {
        selected_employee: "",
        selected_manager: "",
      },
      submitted: false,
      employees_list: "",
      managers_list: "",
      manager_id: "",
      employee_id: "",
      unique_identifier: null,
      isLoading: true,
      isManager: false,
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
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllManagers() {
      ManagersInfoDataService.getAll()
        .then(async (response) => {
          this.managers_list = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addManager() {
      this.manager_id = this.form_submission.selected_manager.split(",")[0].trim();
      this.employee_id = this.form_submission.selected_employee.split(",")[0].trim();
      var data = {
        manager_id: this.manager_id,
        employee_id: this.employee_id,
      };
      EmployeeDataService.updateManagerID(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.submitted = true;
        });
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
    this.getAllManagers();
  },
};
</script>
<style>
.update-manager-form {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
