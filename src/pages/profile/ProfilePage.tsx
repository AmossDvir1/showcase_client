import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverReq } from "../../API/utils/axiosConfig";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { Button } from "../../components/sharedComponents/Button";
import RelationshipStatusButton from "../../components/RelationshipStatusButton";
import ProfilePhoto from "./ProfilePhoto";
import ProfileMenu from "./ProfileMenu";
import ProfilePosts from "./ProfilePosts";
import FriendsList from "./FriendsList";

const Profile: React.FC = () => {
  const { urlName, type } = useParams<{
    urlName: string;
    type: ResultsItemTypes;
  }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<RelationshipState>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await serverReq.get(`/profiles`, {
          params: { urlMapping: urlName, type },
        });
        setUserData({...res.data});
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
    // <div className="relative bg-slate-50 rounded-lg z-10 h-80">
    //   <div className="absolute w-full rounded-t-lg bg-slate-300 z-0 h-[50%]"></div>
    //   <div className="flex flex-col items-center ">
    //     <Avatar
    //       alt={userData?.username.toUpperCase()}
    //       src="/static/images/avatar/1.jpg"
    //       className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500"
    //       sx={{ width: 110, height: 110 }}
    //     />

    //     <div className=" border-primary border-[1px] border-solid p-4 rounded-lg shadow-md w-64">
    //       <Typography className="text-xl font-light">{`${userData?.username}`}</Typography>
    //       <Typography className="text-xl font-light">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
    //     </div>
    //     <RelationshipStatusButton
    //       relationship={relationship}
    //       setRelationship={setRelationship}
    //       userData={userData}
    //     ></RelationshipStatusButton>
    //   </div>
    // </div>
    <div className="min-w-4xl max-w-6xl m-auto">
      <div className="flex flex-col rounded-lg bg-white pb-8">
        {/* Cover Photo */}
        <Paper
          className="flex bg-gray-100 w-full h-80 z-10"
          style={{ backgroundImage: 'url("your-cover-photo-url.jpg")' }}
        ></Paper>
        <div className="flex flex-row ml-20 mt-[-3rem] top-6 z-20">
          <ProfilePhoto userProfile></ProfilePhoto>
          <Typography className="flex items-center mb-4 mx-5 text-black text-5xl z-30">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
        </div>
        <div className="flex items-center justify-center pt-10 mx-12">
          <Divider className="w-full"></Divider>
        </div>
        <div className="flex flex-col mx-12 mb-2">
          <ProfileMenu></ProfileMenu>
        </div>
      </div>
      <div className="mt-4 px-12 flex flex-col rounded-lg bg-white">
        <FriendsList userData={userData}></FriendsList>
        <ProfilePosts userData={userData}></ProfilePosts>
      </div>
    </div>
  );
};

export default Profile;
