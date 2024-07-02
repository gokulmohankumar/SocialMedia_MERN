import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";

export const registerUser = async (body) => {
  const hashedPassword =  bcrypt.hashSync(body.password, 10);
  const newUser = {
    username: body.username,
    email: body.email,
    password: hashedPassword,
  };

  const user=await userModel.create(newUser)
  return user;
};
export const loginUser=async(body)=>
  {
    const user=await userModel.findOne({email:body.email });
    !user && res.status(404).json("User not found")

    const passwordCheck= await bcrypt.compare(body.password, user.password);
    !passwordCheck && res.status(400).json("Wrong password");

    return user;
  }