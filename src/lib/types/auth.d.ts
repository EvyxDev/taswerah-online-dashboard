//auth.d.ts
import { User } from "next-auth";

export type LoginResponse = Pick<User, "token" | "user">;

export type RegisterResponse = Pick<User, "token" | "user">;

export interface customAdmin extends User {
  admin: {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_super_admin: boolean;
    role: string;
    permissions: {
      view_dashboard: boolean;
      manage_branches: boolean;
    };
  } & DatabaseProperies;
  token: string;
}
