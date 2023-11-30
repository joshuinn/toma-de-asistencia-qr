import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const data = await request.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({status:500})
}