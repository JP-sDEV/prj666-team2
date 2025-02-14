import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
    status?: string;
    message?: string;
  }

  interface Profile {
    email_verified?: boolean;
    email?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
