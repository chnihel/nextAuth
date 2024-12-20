/* import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import Github from "next-auth/providers/github";

const handler=NextAuth({
    providers:[
        Github({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        Auth0({
            clientId:process.env.AUTH0_ID as string,
            clientSecret:process.env.AUTH0_SECRET as string,
            issuer: process.env.AUTH0_DOMAIN as string
        })

    ]
})
export {handler as GET ,handler as POST} */