const sql = require("./index.js");

const ManagersInfo = function (managers_info) {
  this.manager_first_name = managers_info.manager_first_name;
  this.manager_last_name = managers_info.manager_last_name;
  this.manager_id = managers_info.manager_id;

};

// This is the SQL statement that inserts a manager into the database, but it uses an object. 

ManagersInfo.create = (newManagersInfo, result) => {
  sql.query("INSERT INTO managers_info SET ?", newManagersInfo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newManagersInfo });
  });
};

ManagersInfo.getAll = (manager_id, result) => {
  let query = "SELECT * FROM managers_info";
  if (manager_id) {
    query += ` WHERE manager_id LIKE '%${manager_id}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

ManagersInfo.remove = (manager_id, result) => {
  sql.query(`DELETE FROM managers_info WHERE manager_id = ${manager_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "no manager exists with this id" }, null);
      return;
    }
    result(null, res);
  });
};

ManagersInfo.findById = (manager_id, result) => {
  sql.query(`SELECT * FROM managers_info WHERE manager_id = ${manager_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // no employee exists with the id
    result({ kind: "no manager exits with this id" }, null);
  });
};



module.exports = ManagersInfo;