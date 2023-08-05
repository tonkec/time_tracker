import { useState, ChangeEvent, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Form, MyInputText } from './LoginPage.styles';
import { Button } from 'primereact/button';

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

        login(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <AuthLayout componentType="login">
      <Form onSubmit={onSubmit}>
        <h1 style={{ marginBottom: 60, marginTop: 40 }}>Login</h1>
        <div>
          <MyInputText
            type="email"
            onChange={handleChange(setEmail)}
            style={{ width: '100%', marginBottom: 30 }}
            placeholder="Email"
          />
        </div>
        <div>
          <MyInputText
            type="password"
            onChange={handleChange(setPassword)}
            placeholder="Password"
          />
        </div>
        <Button severity="secondary" style={{ width: '100%' }} label="Login" />
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
