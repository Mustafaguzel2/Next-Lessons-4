import mongoose from "mongoose";

const connetcToDB = async () => {

    const connectionUrl = "mongodb+srv://mustafaguzel879:yVPJxbX2BMp7ySJ9@try.rpjsq.mongodb.net/new-db";
    
    mongoose.connect(connectionUrl).then(() => {
        console.log("Database connection is successfull");
    })
    .catch((error) => {
        console.log(error);
    })
}

export default connetcToDB;