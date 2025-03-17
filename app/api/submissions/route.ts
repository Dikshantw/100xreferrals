import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, {status: 200})
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
    }
}