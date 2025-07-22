/* eslint-disable @typescript-eslint/no-unused-vars */
//next-auth.d.ts
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    admin: {
      id: number;
      name: string;
      email: string;
      branch_id: string;
      role: string;
      stats: {
        total_photos: number;
        total_customers: number;
      };
    } & DatabaseProperies;
    token: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      admin: {
        id: number;
        name: string;
        email: string;
        branch_id: string;
        role: string;
        stats: {
          total_photos: number;
          total_customers: number;
        };
      } & DatabaseProperies;
      token: string;
    };
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
