import { useTranslations } from 'next-intl';
import { FormInputs, FormProps } from '@/interfaces/form';
import Input from './input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getValidationSchema from '@/utils/validation';

const Form: React.FC<FormProps> = ({ title, submitLabel, onSubmit }) => {
  const t = useTranslations('Forms');
  const validationSchema = getValidationSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    onSubmit(data);
  };
  return (
    <div className="flex w-1/4 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t('labelEmail')}
            </label>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t('placeholderEmail')}
                {...register('email')}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? 'ring-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {t('labelPassword')}
            </label>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder={t('placeholderPassword')}
                {...register('password')}
                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? 'ring-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
