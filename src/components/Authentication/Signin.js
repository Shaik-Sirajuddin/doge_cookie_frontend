import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = ({setAdmin}) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(data.email==="admin123@gmail.com" && data.password ==="dogecookie@123"){
        setAdmin(true);
        toast("Sign in Sucessfull")
        navigate("/admin/users");
    }
    else{
    axios
      .post('http://160.238.36.138:3000/login', {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        // console.log(response);
        toast('SignIn Successful');
        setLogged(true)
        axios.get(`http://160.238.36.138:3000/users/${data.email}`)
        .then(function(response){
          // console.log(response);
          setData(response.data);
        })
        .catch(function(error){
          toast(error.response.data.message)
        })
      })
      .catch(function (error) {
        toast(error.response.data.message)
        // console.log(error);
      });
    }
  };
  return (<>
   {!logged && <div className="flex items-center justify-center min-h-screen bg-cover bg-center signinbg">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold mb-4">SignIn Form</h1>
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
              Password
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

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              SignIn
            </button>
          </div>  
          <div>
            <a href="/forgot-password" className="text-blue-500">
              Forgot password
            </a><br/>
            No Account yet? <a href='/signup' className="text-blue-500">Create One</a>
          </div>
        </form>
      </div>
    </div>}
    { logged && 
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center backcolor">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-80 p-10 rounded-md shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-bold mb-4">Your Details</h1>
        <h2 className="text-2xl font-bold mb-4">Badge :</h2> <span>{data.badge}</span><br/>
        <h2 className="text-2xl font-bold mb-4">Email :</h2> <span>{data.email}</span><br/>
        <h2 className="text-2xl font-bold mb-4">PackageID :</h2> <span>{data.packageId}</span><br/>
        <h2 className="text-2xl font-bold mb-4">Referal Code :</h2> <span>{data.referralCode}</span><br/>
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>{setLogged(false)}}>LogOut</button>
        </div>
        </div>
      }
    </>
  );
};

export default Signin;
