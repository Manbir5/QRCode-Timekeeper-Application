// This portion is what makes a HTTP request occur for our backend.

import http from "../http-common";
class ManagerEntryDataService {
  create(data) {
    return http.post("/manager_entry", data);
  }

  findAudits() {
    return http.get("/manager_entry/audits");
  }

  getSpecificLog(entry_id) {
    return http.get(`/manager_entry/specific/${entry_id}`);
  }

  deleteSpecificLog(index){
    return http.delete(`/manager_entry/delete/${index}`);
  }

}

export default new ManagerEntryDataService();
