import userModel from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { decodeToken } from "../utils/tokenfun.js";

const authFunction = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(new Error("please login", { cause: 401 }));
  }
  if (!token.startsWith(process.env.Token_Prefix)) {
    return next(new Error("Wrong prefix", { cause: 400 }));
  }
  const spreadToken = token.split(process.env.Token_Prefix)[1];
  const decode = decodeToken({ payload: spreadToken });
  if (!decode?._id) {
    return next(new Error("failed to decode", { cause: 401 }));
  }
  const user = await userModel.findById(decode._id,'-password')
  if(!user) return next(new Error("invalid token",{cause:401}))
  req.user = user
next()
};


export const auth = () =>{
    return asyncHandler(authFunction)
    }