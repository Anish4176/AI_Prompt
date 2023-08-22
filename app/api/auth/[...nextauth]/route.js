import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDb } from '@utils/database'
import User from "@models/user"
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {      
            const sessionuser = await User.findOne({ email: session.user.email });
            session.user.id = sessionuser._id.toString();
            return session;
        },
        
        async signIn({  account, profile, user, credentials }) {
            try {
                await connectToDb();
                //if user already exists
                const userexist = await User.findOne({ email: profile.email });

                //new user
                if (!userexist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
            } catch (err) {
                console.log("error checking if user exists",err.message);
                return false;
            }

        }
    }
})

export { handler as GET, handler as POST };