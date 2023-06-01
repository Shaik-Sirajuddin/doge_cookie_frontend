import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminUsers() {
 const [edit , setEdit] = useState(false);
const [data,setData] = useState([])
const navigate = useNavigate();

useEffect(()=>{
    axios.post(`http://160.238.36.138:3000/admin/users`,{
        securityCode: 909
      })
      .then(function(response){
        setData(response.data);
        // console.log(response);
      })
      .catch(function(error){
        toast(error.response.data.message)
      })
},[]);

  return (<>
  <button className='btn btn-primary' style={{marginLeft:"93%", marginBottom:"1%"}} onClick={()=>navigate("/login")}>Logout</button>
    <div className="flex flex-col">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                               Badge
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                               Email
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Package Id
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Referral Code
                            </th>
                        </tr>
                    </thead>
                    {data?.map((item,index)=>{
                            return(
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-400">
                       <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:tex-black" key={index}>{item.badge} <a className="text-blue-600 dark:text-blue-500 ">Edit</a></td>
                         <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:tex-black" key={index}>{item.email}</td>
                         <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:tex-black" key={index}>{item.packageId}</td>
                         <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:tex-black" key={index}>{item.referralCode}</td>
                        </tr>
                    </tbody>) })}
                </table> 
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default AdminUsers
