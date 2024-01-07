import { conn } from "@/lib/mysql";
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        const ciclo = await conn.query("SELECT ciclo, id_ciclo FROM `ctb_ciclo`")
        const grupo = await conn.query("SELECT grupo, id_grupo FROM `ctb_grupo`")
        const maestro = await conn.query("SELECT maestro, id_maestro FROM `ctb_maestro`")
        const laboratorio = await conn.query("SELECT laboratorio, id_laboratorio FROM `ctb_laboratorio`")
        const materia = await conn.query("SELECT materia, id_materia FROM `ctb_materia`")
        const data = {
            ciclo:ciclo[0],
            grupo:grupo[0],
            maestro:maestro[0],
            laboratorio:laboratorio[0],
            materia:materia[0]
        }
        return NextResponse.json(data)
    } catch (error) {
        console.log(error);    
    }
    return NextResponse.json({message:"Error"},{status:500})
}