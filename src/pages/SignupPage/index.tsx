import { ChangeEvent, FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';

const SignupPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange =
    (setState: (value: string) => void) => (event: ChangeEvent) => {
      const value = event.target as HTMLInputElement;
      setState(value.value);
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        login(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange(setEmail)}
        required
        placeholder="Email address"
      />
      <input
        type="password"
        value={password}
        onChange={handleChange(setPassword)}
        required
        placeholder="Password"
      />
      <button type="submit" onClick={onSubmit}>
        Sign up
      </button>
    </form>
  );
};

export default SignupPage;
