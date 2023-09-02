import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverReq } from "../../API/utils/axiosConfig";
import { Avatar, Typography } from "@mui/material";
import { Button } from "../../components/Button";
import RelationshipStatusButton from "../../components/RelationshipStatusButton";


const Profile: React.FC = () => {
  const { urlName, type } = useParams<{
    urlName: string;
    type: ResultsItemTypes;
  }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<RelationshipState>();

  const onAddUserClick = async () => {
    try {
      const res = await serverReq.post("/friends", {
        addUsername: userData?.username,
      });
      setRelationship(res.data.relationship);
      console.log(res.data);
    } catch (err: any) {
      console.error("Error sending friend request:", err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await serverReq.get(`/profiles`, {
          params: { urlMapping: urlName, type },
        });
        setUserData(res.data[0]);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserData(null);
      }
    };

    fetchUserProfile();
  }, [urlName]);

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
    <div className="flex flex-col items-center mt-8 space-y-4">
      <Avatar
        alt={userData?.username.toUpperCase()}
        src="/static/images/avatar/1.jpg"
        className="bg-gradient-to-b from-rose-400 via-fuchsia-500 to-indigo-500"
        sx={{ width: 110, height: 110 }}
      />

      <div className=" border-primary border-[1px] border-solid p-4 rounded-lg shadow-md w-64">
        <Typography className="text-xl font-light">{`${userData?.username}`}</Typography>
        <Typography className="text-xl font-light">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
      </div>
      <RelationshipStatusButton relationship={relationship} setRelationship={setRelationship} userData={userData}></RelationshipStatusButton>
    </div>
  );
};

export default Profile;
