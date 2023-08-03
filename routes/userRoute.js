import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController();

//inserts user to the database (CREATE)
router.post("/add", userController.addUser);

//read operation (READ)
router.get("/:id", userController.getUserByID);

//updates the users
router.put("/update/:id", userController.updateUser);

//delete
router.delete("/delete/:id", userController.deleteUser);

router.get("/search/by", userController.searchUserByLocation);

export default router;
