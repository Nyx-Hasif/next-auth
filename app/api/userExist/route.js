import { connectDB } from "@/lib/mongoDB"
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectDB();
        const {email} = await request.json();
        const user = await User.findOne({email}).select('_id') // find user by email in mongoDB
        console.log('user:',user)
        return NextResponse.json({user}) // passing back the user to the client side api
    } catch (error) {
        return NextResponse.json({ message: 'An error occured while checking user' }, { status: 500 });
    }
}