import NextAuth from 'next-auth'
import { NEXTAUTH } from '../../../lib/auth';


const handler = NextAuth(NEXTAUTH)

export const GET = handler;
export const POST = handler;
