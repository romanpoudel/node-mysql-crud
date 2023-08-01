import express from "express";
import connection from "../config/connection.js";

const router = express.Router();

//inserts user to the database (CREATE)
router.post("/add", (req, res) => {
  const { username, location } = req.body;
  connection.query(
    `INSERT INTO users(username,location) VALUES(?,?)`,
    [username, location],
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
router.get("/:id", (req, res) => {
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
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const { username, location } = req.body;
    connection.query(
      `UPDATE users SET username=?, location=? WHERE id=?`,
      [username, location, id],
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
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    connection.query(
      `DELETE FROM users WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "user deleted" });
        } else
          res.status(200).json({ success: false, message: "id doesnot exist" });
      }
    );
  } else {
    res.status(403).json({ success: false, message: "user id not provided" });
  }
});

export default router;
