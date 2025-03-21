import { cookies } from "next/headers";

export async function verifyAdmin(){
    const session = (await cookies()).get('admin_session');
    return !!session;
}