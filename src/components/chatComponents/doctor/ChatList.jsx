import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function ChatList({ data, currentDoctorId }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentDoctorId);
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `https://medico-server-b7s5.onrender.com/chat/userData/${userId}`
        );
        setUserDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, [data, currentDoctorId]);
  return (
    <div>
      <div className="p-4 border-b">
        {userDetails && (
          <div className="mt-4 flex items-center ">
            <div className="mr-4">
              <img
                src={userDetails.photo}
                alt={`Photo of ${userDetails.name}`}
                className="w-20 h-20 rounded-full mb-4 mx-auto object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{userDetails.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
