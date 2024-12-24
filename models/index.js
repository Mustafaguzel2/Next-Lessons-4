import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    userName : String,
    email : String,
    password : String
})

const User = mongoose.models.User 
|| mongoose.model("User", UserSchema , "users");
//3. seçeneğe istediğin ismi yaz tablo ismi oluyor
export default User;