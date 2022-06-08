import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAnEntity } from "../getAnEntity";

export const useGetProfileData = (formValues) => {
  const user = useSelector((state) => state.user.user);
  const [userInfo, setUserInfo] = useState();
  const [infoReceived, setInfoReceived] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
        if(user.Roles === 'admin'){
            setUserInfo(await getAnEntity("profileEmployeer/", user.Email));
        }else{
            setUserInfo(await getAnEntity("profileEmployee/",user.Email));
        }
        setInfoReceived(true);
    };
    getUserProfile();
  }, []);
  return {
    userInfo,
    infoReceived,
  };
};
