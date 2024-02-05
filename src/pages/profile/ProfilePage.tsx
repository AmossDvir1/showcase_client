import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverReq } from "../../API/utils/axiosConfig";
import { Divider, Paper, Typography } from "@mui/material";
import { Button } from "../../components/sharedComponents/Button";
import RelationshipStatusButton from "../../components/RelationshipStatusButton";
import ProfilePhoto from "./ProfilePhoto";
import ProfileMenu from "./ProfileMenu";
import useUserInfo from "../auth/useUserInfo";
import { getProfile } from "../../controllers/profilesController/getProfileController";

const Profile: React.FC = () => {
  const { urlName, type } = useParams<{
    urlName: string;
    type: ResultsItemTypes;
  }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<RelationshipState>();
  const { userInfo } = useUserInfo();

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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-w-4xl max-w-6xl m-auto">
      <div className="flex flex-col rounded-lg bg-white pb-8">
        {/* Cover Photo */}
        <Paper
          className="flex bg-gray-100 w-full lg:h-80 xs:h-52 z-10"
          style={{ backgroundImage: 'url("your-cover-photo-url.jpg")' }}
        ></Paper>
        <div className="flex flex-row justify-between">
          <div className="flex lg:ml-20 xs:ml-4 xs:mt-[-1.5rem] lg:mt-[-3rem] z-20">
            <ProfilePhoto
              profilePicture={userData?.profilePicture}
              userProfile={userInfo?.urlMapping === userData.urlMapping}
            ></ProfilePhoto>
            <Typography className="flex items-center lg:mx-5 xs:mx-2 text-black xs:text-2xl lg:text-5xl z-30">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
          </div>
          {userInfo?.urlMapping !== userData.urlMapping && (
            <div className="flex items-center justify-end lg:mr-20 xs:mr-4 xs:mt-[-1.5rem] lg:mt-[-3rem] z-20">
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
          <ProfileMenu userData={userData}></ProfileMenu>
        </div>
      </div>
    </div>
  );
};

export default Profile;
