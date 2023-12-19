import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const data = await req.json()
        console.log("api: ", data);
        return NextResponse.json("ok")
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Error"},{status:500})
    }
}