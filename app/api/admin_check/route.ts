import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const session = (await cookies()).get('admin_session');

    if(!session) {
        return NextResponse.json({isAdmin: false}, {status: 401})
    }
    return NextResponse.json({isAdmin: true})
}