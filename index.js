import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());

let connection;

//inserts user to the database (CREATE)
app.post("/user/add", (req, res) => {
  const { username, location } = req.body;
  connection.query(
    `INSERT INTO users(username,location) VALUES('${username}','${location}')`,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);

      if (results.affectedRows === 1)
        res.status(200).json({ success: true, message: "user added to DB" });
      else
        res
          .status(200)
          .json({ success: false, message: "unable to insert user" });
    }
  );
});

//read operation (READ)
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    connection.query(
      `SELECT * FROM users WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        res.status(200).json(...results);
      }
    );
  } else
    res.status(200).json({ success: false, message: "user id not provided" });
});

//updates the users
app.put("/user/update/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const { username, location } = req.body;
    connection.query(
      `UPDATE users SET username='${username}', location='${location}' WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "user updated" });
        } else
          res
            .status(200)
            .json({ success: false, message: "unable to update user" });
      }
    );
  } else
    res.status(200).json({ succcess: false, message: "user id not provided" });
});

//delete
app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    connection.query(
      `DELETE FROM users WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "user deleted" });
        } else
          res
            .status(200)
            .json({ success: false, message: "id doesnot exist" });
      }
    );
  } else {
    res.status(403).json({ success: false, message: "user id not provided" });
  }
});

app.listen(8000, () => {
  console.log("server has started");
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sainik@28",
    database: "testdb",
  });
});
