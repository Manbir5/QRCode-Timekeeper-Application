// This portion is what makes a HTTP request occur for our backend.

import http from "../http-common";
class EmployeeDataService {
  create(data) {
    return http.post("/employees", data);
  }

  get(id) {
    return http.get(`/employees/id/${id}`);
  }

  getAll() {
    return http.get("/employees");
  }

  retrieve(email) {
    return http.get(`/employees/email/${email}`);
  }

  updateManagerID(data) {
    return http.put(`/employees/${data.employee_id}/${data.manager_id}`);
  }
}
export default new EmployeeDataService();
