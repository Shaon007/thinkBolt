'use client';

import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {

  const [emails, setEmails] = useState([]);
  const fetchEmails = async () =>{
    const response = await axios.get('/api/email');
    setEmails(response.data.emails)
  }
  useEffect(() => {
    fetchEmails();
  }, [])

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete('/api/email', {
      params: {
        id:mongoId
      }
    })
    if (response.data.success) {
      toast.success(response.data.msg)
      fetchEmails();
    }
    else{
      toast.error("Error")
    }
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h2>All Subscription</h2>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item,index)=>{
              return <SubsTableItem key={index} mongoId ={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date} />
            })}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default page;