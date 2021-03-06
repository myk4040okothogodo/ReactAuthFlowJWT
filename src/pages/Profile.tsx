import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import  authSlice from "../store/slices/auth";
import useSWR from 'swr';
import  {fetcher} from "../utils/axios";
import {UserResponse} from "../utils/types";
import {RootState} from "../store";

interface LocationState{
  userId: string;

  }

const Profile = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const history  = useHistory();

  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    history.push("/login");
    };
    return (
      <div  className="w-full h-screen">
        <div className="w-full p-6">
          <button
            onClick = {handleLogout}
            className = "rounded p-2 w-32 bg-red-700 text-white"
          >
          LogOut
          </button>
        </div>
        { 
          user.data ?
        <div className="w-full h-full text-center items-center">
          <p className="self-center my-auto">Welcome</p>
        </div>
        :
        <p className="text-center items-center">Loading .....</p>
        }
      </div>
    );
  };

  export default Profile;
