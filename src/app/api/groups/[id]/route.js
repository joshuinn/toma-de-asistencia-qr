import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";

export async function GET(request,{params}){
    try {
        
        const result = await conn.query('SELECT * FROM ctb_lista_asistencia WHERE id_lista_asistencia = ?',[params.id])
        if(result.length ===0){
            return NextResponse.json({message:"Not found"},{status:404})
        }
        return NextResponse.json(result[0])
    } catch (error) {
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}