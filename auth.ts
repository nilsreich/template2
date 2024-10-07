import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { db } from "@/db/index"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {  accounts, sessions, users } from "@/db/schema"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
      }),
    providers: [GitHub]
})
