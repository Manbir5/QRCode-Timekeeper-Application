// This portion is what makes a HTTP request occur for our backend.

import http from "../http-common";
class ManagersInfoDataService {
  create(data) {
    return http.post("/managers_info", data);
  }

  getAll() {
    return http.get("/managers_info");
  }

  get(id) {
    return http.get(`/managers_info/id/${id}`);
  }

  remove(manager_id) {
    return http.delete(`/managers_info/${manager_id}`);
  }


}

export default new ManagersInfoDataService();
