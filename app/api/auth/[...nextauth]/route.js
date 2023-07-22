{
  /*
   * author: sultan ahmed sanjar
   * date : 18-07-2023
   * description : this is the back end file for the project
   */
}

// dependencies

// external imports

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";

dotenv.config();
// internal imports

import { ConnectToDb } from "@utils/database";
import User from "@models/userModel";

// creating the handling function

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await ConnectToDb();
        // if user already exist login
        User.find({ email: profile.email });
        // else create a new user

        if (User.find({ email: profile.email })) {
          const newUser = new User({
            email: profile.email,
            username: profile.name
              .replace(" ", "")
              .replace(" ", "")
              .toLowerCase(),
            image: profile.picture,
          });
          console.log(profile.email);
          newUser.save();
        }

        return true;
      } catch (error) {
        console.log(error);
        false;
      }
    },
  },
});

export { handler as GET, handler as POST };
