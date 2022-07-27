<script setup>
import NavBar from "./NavBar.vue";
import FormSubmissionSuccess from "./FormSubmissionSuccess.vue";
</script>

<template>
  <NavBar />
  <div class="form">
    <div v-if="!isMatch">
      <form @submit.prevent="resetEmployee">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="form_submission.email"
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
            v-model="form_submission.password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Reset</button>
      </form>
    </div>
    <div v-if="isMatch && submitted">
      <FormSubmissionSuccess msg="Identifier has been reset!" />
    </div>
    <div v-else-if="!isMatch && submitted">
      <h4>Please try again</h4>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "../services/EmployeeDataService.js";
import uniqueIdentifier from "../mixins/unique-identifier.js";
import bcrypt from "bcryptjs";

export default {
  name: "reset-employee",
  mixins: [uniqueIdentifier],
  data() {
    return {
      form_submission: {
        email: "",
        password: "",
      },
      submitted: false,
      isMatch: false,
    };
  },
  methods: {
    resetEmployee() {
      EmployeeDataService.retrieve(this.form_submission.email)
        .then(async (response) => {
          const match = await bcrypt.compare(
            this.form_submission.password,
            response.data.password
          );
          if (match) {
            this.isMatch = true;
            this.clearUniqueIdentifier();
            this.setUniqueIdentifier(response.data.employee_id);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
  },
};
</script>
<style>
.greeting {
  text-align: center;
  margin-bottom: 50px;
}

.form {
  margin: auto;
  width: 100%;
  padding: 100px;
  margin-top: 100px;
}

.form-group {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

button[class="btn btn-primary"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  margin-top: 20px;
}

@media only screen and (max-width: 620px) {
  .form {
    width: 80%;
    padding: 10px;
    margin-top: 20%;
  }

  .form-group {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }

  button[class="btn btn-primary"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
