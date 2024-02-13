import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverReq } from "../../API/utils/axiosConfig";
import { Divider, Typography } from "@mui/material";
import RelationshipStatusButton from "../../components/RelationshipStatusButton";
import ProfilePhoto from "./ProfilePhoto";
import ProfileMenu from "./ProfileMenu";
import { getProfile } from "../../controllers/profilesController/getProfileController";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/slices/user";
import { RootState } from "../../redux/rootReducer";
import { AppDispatch } from "../../redux/store";
import CoverPhoto from "./CoverPhoto";
import Loader from "../../components/sharedComponents/Loader";

const Profile: React.FC = () => {
  const { urlName, type } = useParams<{
    urlName: string;
    type: ResultsItemTypes;
  }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<RelationshipState>();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== "loading") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (urlName && type) {
          const userProfile = await getProfile(urlName, type);
          setUserData({ ...userProfile });
        }
      } catch (err: any) {
        setUserData(null);
      }
    };
    fetchUserProfile();
  }, [type, urlName]);

  useEffect(() => {
    if (userData) {
      const getUsersRelationship = async () => {
        try {
          const res = await serverReq.get(`/friends`, {
            params: { addUsername: userData.username },
          });
          setRelationship(res.data.relationship);
        } catch (err: any) {
          console.log(err);
        }
      };
      getUsersRelationship();
    }
  }, [userData]);

  if (!userData || !relationship) {
    return <div className="pt-24 flex items-center justify-center"><Loader size="lg"></Loader></div>;
  }

  return (
    <div className="min-w-4xl max-w-6xl m-auto">
      <div className="flex flex-col rounded-lg bg-white pb-8">
        <CoverPhoto coverPhoto={userData?.coverPhoto} userProfile={userInfo?.urlMapping === userData.urlMapping}></CoverPhoto>
        <div className="flex flex-row justify-between">
          <div className="flex lg:ml-20 xs:ml-4 xs:mt-[-1.5rem] lg:mt-[-3rem]">
            <ProfilePhoto
              profilePicture={userData?.profilePicture}
              userProfile={userInfo?.urlMapping === userData.urlMapping}
            ></ProfilePhoto>
            <Typography className="flex items-center lg:mx-5 xs:mx-2 text-black xs:text-2xl lg:text-5xl">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
          </div>
          {userInfo?.urlMapping !== userData.urlMapping && (
            <div className="flex items-center justify-end lg:mr-20 xs:mr-4 xs:mt-[-1.5rem] lg:mt-[-3rem]">
              <RelationshipStatusButton
                relationship={relationship}
                setRelationship={setRelationship}
                userData={userData}
              ></RelationshipStatusButton>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center pt-10 xs:mx-4 lg:mx-12">
          <Divider className="w-full"></Divider>
        </div>
        <div className="">
          <ProfileMenu userData={userData} setUserData={setUserData}></ProfileMenu>
        </div>
      </div>
    </div>
  );
};

export default Profile;
