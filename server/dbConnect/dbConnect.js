import mongoose from 'mongoose'

export const dbConnect=async()=>
    {
        try{
            await mongoose.connect(process.env.DB_URL)
            console.log("Database has been connected succesfully")
        }
        catch(error)
        {
           console.log("Error in connection", error);
        }
    }