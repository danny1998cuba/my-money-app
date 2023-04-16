import { Router } from "express";
import { UserController } from "@src/controllers";
import Paths from "../constants/Paths";
import jetValidator from "jet-validator/dist/jet-validator";
import User from "@src/models/User";

const userRouter = Router(),
    validate = jetValidator();

// Get all users
userRouter.get(
    Paths.Users.All,
    UserController.getAll,
);

// Add one user
userRouter.post(
    Paths.Users.Add,
    validate(['user', User.isUser]),
    UserController.add,
);

// Update one user
userRouter.put(
    Paths.Users.Update,
    validate(['user', User.isUser]),
    UserController.update,
);

// Delete one user
userRouter.delete(
    Paths.Users.Delete,
    validate(['id', 'number', 'params']),
    UserController.delete,
);

export default userRouter;