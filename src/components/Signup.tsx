import { useState } from 'react';
import { signupFields } from '../constants/formFields';
import FormAction from './form/FormAction';
import Input from './Input';
import signUp from '../firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const fields = signupFields;
let fieldsState = {
  fullName: '',
  email: '',
  password: '',
};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupState);
    try {
      setLoading(true);
      await signUp(
        signupState.email,
        signupState.password,
        signupState.fullName,
      );
      toast.success('Account created successfully');
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  //handle Signup API Integration here
  const createAccount = () => {};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction
          handleSubmit={handleSubmit}
          loading={loading}
          text="Signup"
        />
      </div>
    </form>
  );
}
