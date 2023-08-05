import { ChangeEvent, FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Form, MyInputText } from './SignupPage.styles';
import { Button } from 'primereact/button';
import { useAddUserMutation } from '../../slices/slices';

const SignupPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useAddUserMutation();
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
        addUser(user);
        login(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <AuthLayout componentType="signup">
      <Form onSubmit={onSubmit}>
        <h1 style={{ marginBottom: 60, marginTop: 40 }}>Signup</h1>
        <MyInputText
          type="email"
          value={email}
          onChange={handleChange(setEmail)}
          required
          placeholder="Email"
        />
        <MyInputText
          type="password"
          value={password}
          onChange={handleChange(setPassword)}
          required
          placeholder="Password"
        />
        <Button severity="secondary" style={{ width: '100%' }} label="Signup" />
      </Form>
    </AuthLayout>
  );
};

export default SignupPage;
