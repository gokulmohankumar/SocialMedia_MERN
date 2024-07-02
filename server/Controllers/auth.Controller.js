import { loginUser, registerUser } from "../services/auth.service.js";

//Register

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body, ReadableStreamBYOBReader);
    const {password, ...userData}= await user._doc;

    res.status(200).json({
      userData,
      message: "User has been registered succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error occured register user",
    });
    console.log(error);
  }
};
 export const login=async(req,res)=>
        {
            try{
                 const loggedInUser = await loginUser(req.body,res);
                 const {password, ...userData}=loggedInUser._doc;
                 res.status(200).json({
                    message:"User logged succusfull",
                    userData,
                 })
            }
            catch(error)
            {
            res.status(500).json({
                error:error,
                message:"error occured in logging user"});
            }
        }