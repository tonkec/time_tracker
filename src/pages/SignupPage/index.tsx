import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Form, MyInputText } from './SignupPage.styles';
import { Button } from 'primereact/button';
import { useAddUserMutation } from '../../slices/slices';
import { Toast } from 'primereact/toast';

const SignupPage = () => {
  const toast = useRef<Toast>(null);

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
        toast.current?.show({
          severity: 'success',
          summary: 'Welcome',
          detail: 'Successfully signed in!',
        });
        setTimeout(() => {
          login(user);
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!',
        });
      });
  };
  return (
    <AuthLayout componentType="signup">
      <Toast ref={toast} />
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
