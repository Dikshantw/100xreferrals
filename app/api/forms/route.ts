import formSchema from "@/lib/zod-schemas";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const data = formSchema.parse(body)
    
        const user = await prisma.user.create({data})
        return NextResponse.json(user, {status: 201})   
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }
}