import * as Yup from 'yup';

type TFunction = (key?: string) => string;

const getValidationSchema = (t: TFunction) => {
  return Yup.object({
    email: Yup.string()
      .email(t('requirements.email'))
      .required(t('requirements.emailRequired')),
    password: Yup.string()
      .min(8, t('requirements.passwordLength'))
      .matches(/[a-zA-Z]/, t('requirements.passwordLetter'))
      .matches(/\d/, t('requirements.passwordDigit'))
      .matches(/[\W_]/, t('requirements.passwordCharacter'))
      .required(t('requirements.passwordRequired'))
  }).required();
};

export default getValidationSchema;
