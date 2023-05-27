import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    axios
      .post('http://160.238.36.138:3000/reset-password', {
        email,
        password,
        token,
      })
      .then(function (response) {
        console.log(response);
        toast('Reset Password Successful');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const watchPassword = watch('password', '');

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center backcolor">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-800 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-800 font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-800 font-bold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watchPassword || 'Passwords do not match',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs italic text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
