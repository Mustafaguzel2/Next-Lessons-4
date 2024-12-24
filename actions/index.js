'use server';
import connectToDB from "@/database";
import User from "@/models";
import bcryptjs from 'bcryptjs';
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
    await connectToDB();
    try {
        const { userName, email, password } = formData;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return {
                success: false,
                message: 'User already exists'
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newlyCreatedUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        } else {
            return {
                success: false,
                message: 'Some error occured! Please try again'
            }
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}

export async function loginUserAction(formData) {
    await connectToDB();
    try {
        const { email, password } = formData;
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return {
                success: false,
                message: 'User does not exist',
            }
        }
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword) {
            return {
                success: false,
                message: 'Incorrect password'
            }
        }
        const createdTokenData = {
            _id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        }

        const token = jwt.sign(createdTokenData, "DEFAULT_KEY" ,{
            expiresIn: '1d'
        })

        const getCookies = cookies();
        getCookies.set('token', token);

        return {
            success: true,
            message: 'User logged in successfully',
            data: JSON.parse(JSON.stringify(checkUser))     
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Some error occured! Please try again'
        }
    }
}

export async function fetchAuthenticatedUser() {
    await connectToDB();
    try{
        const getCookies = cookies;
        const token = getCookies().get('token')?.value || "";

       
        if(token === "") {
            return{
                success: false, 
                message: 'Some error occured! Please try again 1'
            }
        }
        const decodedToken = jwt.verify(token, "DEFAULT_KEY");
        const getUserInfo = await User.findById( {_id : decodedToken._id } );

        if(getUserInfo) {
            return{
                success: true, 
                data: JSON.parse(JSON.stringify(getUserInfo))
            }
        }else{
            return{
                success: false, 
                message: 'Some error occured! Please try again 2'
            }
        }
    }catch(error){
        console.log(error);
        return{
            success: false, 
            message: 'Some error occured! Please try again 3'
        }
    }

}

export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set('token', "");
    revalidatePath('/');
}