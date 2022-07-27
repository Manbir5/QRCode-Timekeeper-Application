<script setup>
import NavBar from "./NavBar.vue";
import AdminError from "./AdminError.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NavBar />
  <div v-if="!isLoading">
    <div v-if="isManager" class="admin-page">
      <div class="icon_square">
        <i class="fa-solid fa-gear"></i>
      </div>
      <h1>Please select one of the following actions</h1>

      <a class="btn btn-primary" href="/updatemanager" role="button">Update Employee's Manager</a>
      <br />
      <a class="btn btn-primary" href="/promotemanager" role="button">Add Employee as a Manager</a>
      <br />
      <a class="btn btn-primary" href="/removemanager" role="button">Remove Employee as a Manager</a>
    </div>
    <div v-else>
      <AdminError />
    </div>
  </div>
</template>

<script>
import ManagersInfoDataService from "../services/ManagersInfoDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "get-manager",
  mixins: [uniqueIdentifier],
  data() {
    return {
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
  },
  mounted() {
    this.unique_identifier = this.getUniqueIdentifier();
    if (this.unique_identifier !== undefined) {
      this.getManager();
    } else {
      this.isLoading = false;
    }
  },
};

</script>

<style scoped>
h1 {
  font-size: 200%;
  text-align: center;
  padding-bottom: 50px;
}


.admin-page {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200%;
  padding: 50px 0;
}

.icon_square svg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 50px 0;
  width: 30%;
  height: 30%;
}

a[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  margin-top: 10px;
  margin-bottom: -30px;
}

@media (min-width: 1024px) {}
</style>
