import { useState, ChangeEvent, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange =
    (setState: (value: string) => void) => (event: ChangeEvent) => {
      const value = event.target as HTMLInputElement;
      setState(value.value);
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        login(user.accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="email" onChange={handleChange(setEmail)} />
      <input type="password" onChange={handleChange(setPassword)} />
      <button onClick={onSubmit}>Login</button>
    </form>
  );
};

export default LoginPage;
