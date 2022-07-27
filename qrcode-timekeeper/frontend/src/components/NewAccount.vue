<script setup>
import NavBar from "./NavBar.vue";
import FormSubmissionSuccess from "./FormSubmissionSuccess.vue";
</script>

<template>
  <NavBar />
  <div class="form">
    <div v-if="!submitted">
      <form @submit.prevent="saveEmployee">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            v-model="employee.first_name"
            id="first_name"
            name="first_name"
            placeholder="Enter first name"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            v-model="employee.last_name"
            id="last_name"
            name="last_name"
            placeholder="Enter last name"
            required
          />
        </div>
        <div class="form-group">
          <label for="birthDate">Birth Date</label>
          <input
            type="date"
            class="form-control"
            v-model="employee.birth_date"
            id="birth_date"
            name="birth_date"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="employee.email"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="employee.password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="termsAndConditions"
            required
          />
          <label class="form-check-label" for="termsAndConditions"
            >I agree to the terms and conditions</label
          >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div v-else class="success">
      <h1>Success</h1>
      <a class="btn btn-primary" href="/confirmclockinaccess" role="button">Clock in</a>
      <a class="btn btn-primary" @click="$router.back()" role="button">Go Back</a>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";

export default {
  name: "add-employee",
  mixins: [uniqueIdentifier],
  data() {
    return {
      employee: {
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        birth_date: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveEmployee() {
      var data = {
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        password: this.employee.password,
        email: this.employee.email,
        birthdate: this.employee.birth_date,
        manager_id: null,
      };
      EmployeeDataService.create(data)
        .then((response) => {
          this.employee.employee_id = response.data.id;
          this.setUniqueIdentifier(response.data.id);
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
h1 {
  padding-bottom: 15 px;
}

.form-check-label {
  font-size: 12px;
}

.form {
  margin: auto;
  width: 100%;
  padding: 100px;
  margin-top: 100px;
  color: #1d3461;
}

.form-group,
.form-check {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

button[class="btn btn-primary"],
a[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  background-color: #6290c8;
  border-color: #1d3461;
}

button[class="btn btn-primary"]:hover {
  background-color: #1d3461;
}

button[class="btn btn-primary"]:active {
  background-color: #1d3461;
}

a[class="btn btn-primary"]:active {
  background-color: #1d3461;
}

.success {
  color: #1d3461;
}

@media only screen and (max-width: 620px) {
  .form {
    width: 80%;
    padding: 10px;
    margin-top: 20%;
    color: #1d3461;
  }

  .form-group,
  .form-check {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  button[class="btn btn-primary"],
  a[class="btn btn-primary"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    margin-top: 30px;
    background-color: #6290c8;
    border-color: #1d3461;
  }
}
</style>
