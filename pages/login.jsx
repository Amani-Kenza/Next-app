import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from '../styles/style.module.css'; 
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Utilisation de NextAuth.js pour gérer l'authentification
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false, 
      });

      if (!result.error) {
        window.location.href = '/dashboard';
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`${styles.loginCard} mt-32 p-2 text-center ml-80`}>
      <h1 className='font-bold pt-4'>Log In</h1>
      <p className='pt-2'>Hello again to weasydoo!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" className='border-solid border-2 rounded-full p-2 w-72 mt-4'placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="password" className='border-solid border-2 rounded-full p-2 w-72 mt-4' placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <h6 className='ml-32 pt-2'>Forgot password?</h6>
        <button type='submit' className="bg-sky-500 hover:bg-sky-700 p-2 w-56 rounded-xl text-white mt-8">Log In</button>
      </form>
    </div>
  );
}
