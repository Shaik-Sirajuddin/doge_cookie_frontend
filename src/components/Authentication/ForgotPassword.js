import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        axios
          .post('http://160.238.36.138:3000/forgot-password', {
            email: data.email
          })
          .then(function (response) {
            toast('Password Reset Mail has been sent');
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center backcolor">
          <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
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
}

export default ForgotPassword