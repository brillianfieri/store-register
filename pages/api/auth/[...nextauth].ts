import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt",
        maxAge: 60 * 60
    },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "Username",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
        const prisma = new PrismaClient();
          const user  = await prisma.user.findUnique({
            where:{
                username: credentials.username
            }
          })

          if (user) {
            const checkPassword = await compare(credentials.password, user.password)
            if(!checkPassword){
                return null
            }else{
                return{
                  user_id: user.id,
                  username: user.username,
                  name: user.name,
                  role: user.role,
                  delete_user: user.delete_user
                } as any
            }
          } else {
            return null
          }
        }
      })
  ],pages: {
      signIn: '/user'}
    ,callbacks: {
        async signIn({ user }) {
          if (user?.delete_user == true) {
            return '/unauthorized'
          }else{
            return true
          }
        },
        async jwt({token, user}) {
            if(user?.user_id){
                token.user_id = user.user_id
            }
            if (user?.username) {
                token.username = user.username
            }
            if (user?.role) {
                token.role = user.role;
            }
            return token
         },
         async session({session, token}) {
          session.user.user_id = token.user_id as number
          session.user.username = token.username as string
          session.user.role = token.role as string
          return session
        }
    },
}

export default NextAuth(authOptions);