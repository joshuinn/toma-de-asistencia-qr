import { NextResponse } from "next/server";

export async function POST(request, {params}){
    try {
        const data = await request.json()
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Error"},{status:500})
    }
}