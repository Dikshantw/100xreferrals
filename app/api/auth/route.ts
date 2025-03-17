import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const {email,password} = await req.json()
    const admin = await prisma.admin.findUnique({where: {email}})

    if(!admin || !(password === admin.password)){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    (await cookies()).set('admin_session', JSON.stringify({email}), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60*60*24
    })

    return NextResponse.json({success: true})
}