const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const signupFields = [
  {
    labelText: 'Full Name',
    labelFor: 'fullName',
    id: 'fullName',
    name: 'fullName',
    type: 'text',
    autoComplete: 'fullName',
    isRequired: true,
    placeholder: 'Full Name',
  },
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
  // {
  //   labelText: 'Confirm Password',
  //   labelFor: 'confirm-password',
  //   id: 'confirm-password',
  //   name: 'confirm-password',
  //   type: 'password',
  //   autoComplete: 'confirm-password',
  //   isRequired: true,
  //   placeholder: 'Confirm Password',
  // },
];

export { loginFields, signupFields };
