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
    <div v-if="!submitted" class="delete-manager-form">
      <form @submit.prevent="removeManager">
        <h1>Delete a Manager Form</h1>
        <h3>
          Note: This will delete an employee's manager access. Employees who are under the
          deleted manager will need have their manager updated.
        </h3>
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
      <FormSubmissionSuccess msg="Manager has been removed!" />
    </div>
  </div>
</template>

<script>
import ManagersInfoDataService from "../services/ManagersInfoDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "remove-manager",
  mixins: [uniqueIdentifier],
  data() {
    return {
      form_submission: {
        selected_manager: "",
      },
      submitted: false,
      managers_list: "",
      manager_id: "",
      isManager: false,
      unique_identifier: null,
      isLoading: true,
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
    getAllManagers() {
      ManagersInfoDataService.getAll()
        .then(async (response) => {
          this.managers_list = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeManager() {
      this.manager_id = this.form_submission.selected_manager.split(",")[0].trim();

      ManagersInfoDataService.remove(this.manager_id)
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

    this.getAllManagers();
  },
};
</script>
<style>
.delete-manager-form {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
