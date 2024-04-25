import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { loginFields } from '../constants/formFields';
import { loginWithEmailAndPassword, signInWithGoogle } from '../firebase/auth';
import FormAction from './form/FormAction';
import Input from './Input';
import { toast } from 'react-toastify';

const fields = loginFields;
let fieldsState: any = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    let loginFields = {
      email: loginState['email'],
      password: loginState['password'],
    };
    try {
      setLoading(true);
      await loginWithEmailAndPassword(loginFields.email, loginFields.password);
      router.push('/');
      setTimeout(() => {
        toast.success('Login successful');
      }, 500);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoadingGoogle(true);
      await signInWithGoogle();
      console.log('Login successful');
      router.push('/');
      setTimeout(() => {
        toast.success('Login successful');
      }, 500);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      {/* Login with google */}
      <Button
        color="light"
        className="w-full bg-gray-300"
        onClick={loginWithGoogle}
        isProcessing={loadingGoogle}
      >
        <span className="flex items-center justify-center">
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="google"
            className="w-6 h-6"
          />
          <span className="ml-2">Login with Google</span>
        </span>
      </Button>
      {/* <FormExtra /> */}
      <FormAction loading={loading} handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
