
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function callBank(){
    const session = await getServerSession(authOptions)
    const userId = session.user.id;
    if(!userId){
        return {
            message : "Unauthenticated user"
        }
    }
    
}