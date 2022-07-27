// This portion is what makes a HTTP request occur for our backend.

import http from "../http-common";
class TimeLogDataService {
  create(data) {
    return http.post("/time_logs", data);
  }

  findLog(id) {
    return http.get(`/time_logs/id/${id}`);
  }

  getTimeLogForEmployee(id) {
    return http.get(`/time_logs/table/${id}`);
  }

  getSpecificLog(entry_id) {
    return http.get(`/time_logs/specific/${entry_id}`);
  }

  getUnapprovedLogs() {
    return http.get(`/time_logs/unapproved`);
  }

  findIncompleteLog(id) {
    return http.get(`/time_logs/incomplete/id/${id}`);
  }

  findIncompleteLogs(){
    return http.get(`/time_logs/incomplete/all`);
  }

  getSpecificIncompleteLog(id) {
    return http.get(`/time_logs/incomplete/specific/${id}`);
  }

  updateLog(data) {
    return http.put(
      `/time_logs/${data.log_id}/${data.clock_out}/${data.hours}/${data.is_incomplete}`
    );
  }

  updateLogFromAudit(data) {
    return http.put(
      `/time_logs/update/${data.log_id}/${data.clock_in}/${data.clock_out}/${data.hours}`
    );
  }

}
export default new TimeLogDataService();
