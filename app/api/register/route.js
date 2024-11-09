// server side API
import { connectDB } from "@/lib/mongoDB";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const {name,email,password}  = await request.json(); //destruct data from client side api
        const hashedPassword = await bcryptjs.hash(password,10); // hash password
        await connectDB();
        await User.create({name,email,password:hashedPassword}) // create user in mongoDB
        return NextResponse.json({message:'User Registered'},{status:201}); 
    } catch (error) {
         return NextResponse.json({message:'An error occured while registering user'},{status:500});
    }
}