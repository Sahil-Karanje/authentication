import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getUserId";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request:NextRequest){
    try {
        const userId = getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({message: "user found", user})
    } catch (error:any) {
        return NextResponse.json({error: error.message})
    }
}
