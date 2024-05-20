import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérifier les identifiants
        if (credentials.username === 'kenza' && credentials.password === 'P@ssw0rd') {
          return { id: 1, username: credentials.username, email: 'kenza@gmail.com' };
        } else {
          return null;
        }
      }
    })
  ],
});
