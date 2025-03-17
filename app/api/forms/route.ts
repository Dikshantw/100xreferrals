import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const prisma = new PrismaClient();
const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email().toLowerCase(),
    phone: z.string().min(10, 'Enter Valid Phone Number'),
    github: z.string().url(),
    bestProject: z.string().url(),
    scholarship: z.enum(['50%', '80%', '100%', 'none']).optional()
})

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