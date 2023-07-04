import userModel from "../../../DB/models/user.model.js";
import bcript from "bcryptjs";
import { generateToken } from "../../utils/tokenfun.js";

export const signUp = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new Error("email already exist", { cause: 409 }));
  let result = new userModel(req.body);
  await result.save();
  res.json({ message: "successfully", result });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const passwordMatch = bcript.compareSync(password, user.password);
  if (user && passwordMatch) {
    const token = generateToken({
      payload: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
    return res.json({ message: "login success", token });
  }
  next(Error("Invalid password or email", { cause: 401 }));
};
