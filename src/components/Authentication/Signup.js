import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = (data) => {
    axios
      .post('http://160.238.36.138:3000/signup', {
        email: data.email,
        password: data.password,
        packageId: data.packageid,
      })
      .then(function (response) {
        console.log(response);
        toast('SignUp successful');
      })
      .catch(function (error) {
        console.log(error);
        toast(error);
      });

    // Do something with the form data
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center backcolor">
         <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h1 className="text-2xl font-bold underline mb-4">Signup Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="input-wrapper flex flex-col">
          <label htmlFor="email" className="text-gray-800 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-xs italic text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="password" className="text-gray-800 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.password && (
            <p className="text-xs italic text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="input-wrapper flex flex-col">
          <label htmlFor="packageid" className="text-gray-800 font-bold mb-2">
            PackageID
          </label>
          <input
            type="number"
            {...register('packageid', {
              required: 'PackageID is required',
              minLength: {
                value: 1,
                message: 'PackageID must be a valid number',
              },
            })}
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.packageid && (
            <p className="text-xs italic text-red-500">{errors.packageid.message}</p>
          )}
        </div>

        <div className="input-wrapper">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            SignUp
          </button>
          <br/>
          Already have an account? <a href='/login' className='text-blue-600'>LogIn</a>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
