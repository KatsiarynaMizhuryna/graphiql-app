import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[@$!%*#?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

export default validationSchema;
