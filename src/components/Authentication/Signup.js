import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {

  const [signup, setSignup] = useState(false);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = (data) => {
    axios
      .post('https://api.dogecookie.io/signup', {
        email: data.email,
        password: data.password,
        packageId: data.packageid,
      })
      .then(function (response) {
        console.log(response);
        toast('SignUp successful');
        setSignup(true);
        axios.get(`https://api.dogecookie.io/users/${data.email}`)
          .then(function (response) {
            // console.log(response);
            setData(response.data);
          })
          .catch(function (error) {
            toast(error.response.data.message)
          })
      })
      .catch(function (error) {
        toast(error.response.data.message);
      });

    // Do something with the form data
  };

  return (<>
    {!signup && <div className="flex items-center justify-center min-h-screen bg-cover bg-center signinbg">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold mb-4">Signup Form</h1>
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
            <select
              {...register('packageid', {
                required: 'PackageID is required',
              })}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a PackageID</option>
              <option value="1">$100*10 (5%)</option>
              <option value="2">$100*5 (3.5%)</option>
              <option value="3">$200*10 (5.5%)</option>
              <option value="4">$200*5 (4%)</option>
              <option value="5">$500*10 (6%)</option>
              <option value="6">$500*5 (4.5%)</option>
              <option value="7">$1000*10 (6.5%)</option>
              <option value="8">$1000*5 (5%)</option>
              <option value="9">$2000*10 (7%)</option>
              <option value="10">$2000*5 (5.5%)</option>
              <option value="11">$5000*10 (8%)</option>
              <option value="12">$5000*5 (5%)</option>
            </select>
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
            <br />
            Already have an account? <a href="/login" className="text-blue-600">LogIn</a>
          </div>
        </form>
      </div>
    </div>}
    {signup &&
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center backcolor">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h1 className="text-2xl font-bold mb-4">Your Details</h1>
          <h2 className="text-2xl font-bold mb-4">Badge :</h2> <span>{data.badge}</span><br />
          <h2 className="text-2xl font-bold mb-4">Email :</h2> <span>{data.email}</span><br />
          <h2 className="text-2xl font-bold mb-4">PackageID :</h2> <span>{data.packageId}</span><br />
          <h2 className="text-2xl font-bold mb-4">Referal Code :</h2> <span>{data.referralCode}</span><br />
          <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => { setSignup(false) }}>LogOut</button>
        </div>
      </div>
    }
  </>
  );
};

export default Signup;
