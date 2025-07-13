//auth.d.ts
import { User } from "next-auth";

export type LoginResponse = Pick<User, "token" | "user">;

export type RegisterResponse = Pick<User, "token" | "user">;

export interface customStuff extends User {
  staff: {
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
