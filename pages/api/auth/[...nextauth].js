import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Dummy users data
const users = [
  { id: '1', email: 'admin@example.com', password: 'password123', role: 'admin' },
  { id: '2', email: 'user@example.com', password: 'password123', role: 'user' },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = users.find(user => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          // Return user object without password
          return { id: user.id, email: user.email, role: user.role };
        }
        
        // Return null if user not found or password doesn't match
        throw new Error('Email atau password salah');
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});