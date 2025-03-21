import { verifyAdmin } from "@/lib/verifyAdmin";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PATCH(req:NextRequest) {
    try {
        const {id,status} = await req.json();
        const isAdmin = await verifyAdmin();
        if(!isAdmin){
            return NextResponse.json('Unauthorized: Only Admins have access to make status change',{status: 401})
        }
        const user = await prisma.user.update({where: {id}, data: {status}})
        return NextResponse.json(user, {status: 200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({error: error.message},{status: 500})
        }
    }
    
}