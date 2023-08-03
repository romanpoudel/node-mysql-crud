import connection from "../models/index.js";
// import connection from "../config/connection.js";
import userModel from "../models/userModel.js";
import { Op } from "sequelize";

export default class UserController {
  //adds user to db
  async addUser(req, res) {
    const { username, location } = req.body;
    // connection.query(
    //   `INSERT INTO users(username,location) VALUES(?,?)`,
    //   [username, location],
    //   (err, results, fields) => {
    //     if (err) throw err;
    //     console.log(results);

    //     if (results.affectedRows === 1)
    //       res.status(200).json({ success: true, message: "user added to DB" });
    //     else
    //       res
    //         .status(200)
    //         .json({ success: false, message: "unable to insert user" });
    //   }
    // );
    try {
      const data = await userModel.create({
        username: username,
        location: location,
      });
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
    }
  }

  //get user by their userid(read)
  async getUserByID(req, res) {
    const { id } = req.params;
    console.log(id);
    if (id) {
      // connection.query(
      //   `SELECT * FROM users WHERE id=${id}`,
      //   (err, results, fields) => {
      //     console.log(results);
      //     res.status(200).json(...results);
      //   }
      // );
      const data = await userModel.findByPk(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.json([]);
      }
    } else
      res.status(200).json({ success: false, message: "user id not provided" });
  }

  //update user
  async updateUser(req, res) {
    const { id } = req.params;
    if (id) {
      const { username, location } = req.body;
      const data = await userModel.update(
        { username: username, location: location },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(data);
      if (data[0]) {
        res.status(200).json({ success: true, message: "user updated" });
      } else {
        res
          .status(200)
          .json({ success: false, message: "unable to update user" });
      }
      // connection.query(
      //   `UPDATE users SET username=?, location=? WHERE id=?`,
      //   [username, location, id],
      //   (err, results, fields) => {
      //     console.log(results);
      //     if (results.affectedRows === 1) {
      //       res.status(200).json({ success: true, message: "user updated" });
      //     } else
      //       res
      //         .status(200)
      //         .json({ success: false, message: "unable to update user" });
      //   }
      // );
    } else
      res
        .status(200)
        .json({ succcess: false, message: "user id not provided" });
  }

  //delete user
  async deleteUser(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await userModel.destroy({
        where: { id },
      });
      console.log(data);
      if (data) {
        res.json({ success: true, message: "user deleted successfully." });
      } else {
        res.json({ succcess: false, message: "couldn't delete user" });
      }
      // connection.query(
      //   `DELETE FROM users WHERE id=${id}`,
      //   (err, results, fields) => {
      //     console.log(results);
      //     if (results.affectedRows === 1) {
      //       res.status(200).json({ success: true, message: "user deleted" });
      //     } else
      //       res.status(200).json({ success: false, message: "id doesnot exist" });
      //   }
      // );
    } else {
      res.status(403).json({ success: false, message: "user id not provided" });
    }
  }

  //serach user by location
  async searchUserByLocation(req, res) {
    const { location } = req.query;
    const data = await userModel.findAll({
      where: {
        location: {
          [Op.like]: `%${location}%`,
        },
      },
    });
    console.log(data);
    res.json(data);
  }
}
