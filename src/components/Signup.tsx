import { ChangeEvent, FormEventHandler, useState } from 'react';
import { signupFields } from '../constants/formFields';
import FormAction from './form/FormAction';
import Input from './Input';
import signUp from '../firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { updateProfile } from 'firebase/auth';

const fields = signupFields;
let fieldsState: any = {
  fullName: '',
  email: '',
  password: '',
};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(signupState);
    try {
      setLoading(true);
      const result = await signUp(signupState.email, signupState.password);
      await updateProfile(result.user, { displayName: signupState.fullName });
      toast.success('Account created successfully');
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

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
