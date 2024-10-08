import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user:  DefaultUser & {
      id: number;
      firstName: string;
      username: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      firstName: string;
      username: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
