import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverReq } from "../../API/utils/axiosConfig";
import { Divider } from "@mui/material";
import Typography from "../../components/sharedComponents/Typography";
import RelationshipStatusButton from "../../components/RelationshipStatusButton";
import ProfilePhoto from "./ProfilePhoto";
import { getProfile } from "../../controllers/profilesController/getProfileController";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/slices/user";
import { RootState } from "../../redux/rootReducer";
import { AppDispatch } from "../../redux/store";
import CoverPhoto from "./CoverPhoto";
import Loader from "../../components/sharedComponents/Loader";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileFriendsCard from "./ProfileFriendsCard";
import ProfilePosts from "./ProfilePosts";
import { WritePost } from "../../components/sharedComponents/posts/WritePost";

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

  const fetchUsersRelationship = async () => {
    if (userData) {
      try {
        const res = await serverReq.get(`/friends`, {
          params: { addUsername: userData.username },
        });
        setRelationship(res.data.relationship);
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUsersRelationship();
  }, [userData]);

  if (!userData || !relationship) {
    return (
      <div className="pt-24 flex items-center justify-center">
        <Loader size="lg"></Loader>
      </div>
    );
  }

  const isCurrentUser = userInfo?.urlMapping === userData.urlMapping;
  return (
    <div className="md:min-w-4xl md:max-w-6xl m-auto w-full">
      <div className="flex flex-col rounded-lg md:bg-profile-bg dark:bg-dark-paper-dark pb-8">
        <CoverPhoto
          coverPhoto={userData?.coverPhoto}
          userProfile={isCurrentUser}
        ></CoverPhoto>

        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-row">
            <div className="flex xl:ml-20 md:ml-12 ml-4 mt-[-10%] xl:mt-[-10%]">
              <ProfilePhoto
                profilePicture={userData?.profilePicture}
                userProfile={isCurrentUser}
              ></ProfilePhoto>
            </div>
            <Typography className="flex items-start xl:mx-5 mx-3 !leading-[2rem] pt-3 xl:pt-[20px] text-black text-2xl xl:text-5xl ">
              {`${userData?.firstName} ${userData?.lastName}`}
            </Typography>
          </div>
          <div className="flex flex-row">
            {!isCurrentUser && (
              <div className="flex items-start justify-end lg:mr-20 mr-4 pt-3 xl:pt-[20px]">
                <RelationshipStatusButton
                  relationship={relationship}
                  setRelationship={setRelationship}
                  userData={userData}
                ></RelationshipStatusButton>
              </div>
            )}
          </div>
        </div>
        {userInfo && (
          <div className="flex justify-center pt-4 pb-2">
            <div className="max-w-[85%] container flex flex-col md:flex-row gap-8">
              {/* Profile Info */}
              <div className="flex-1 xs:max-md:mb-8">
                <ProfileInfoCard
                  relationshipStatus={userData?.profile?.relationshipStatus}
                  work={userData?.profile?.work}
                  livingPlace={"San Francisco"}
                  bio={userData?.profile?.bio}
                  technologies={userData?.profile?.technologies ?? []}
                  isCurrentUser={isCurrentUser}
                />
              </div>

              {/* Friends List */}
              <div className="flex-1">
                <ProfileFriendsCard userId={userData.id} />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col lg:ml-20 xs:ml-4 xs:mt-5">
          <div className="flex flex-wrap gap-2 max-w-[80%]"></div>
        </div>
        <div className="flex items-center justify-center pt-10 xs:mx-4 lg:mx-12">
          <Divider className="w-full"></Divider>
        </div>
        <div className="flex flex-col items-center mx-0 lg:mx-12 mb-2">
          {isCurrentUser && <WritePost></WritePost>}
          <ProfilePosts userData={userData}></ProfilePosts>
        </div>
      </div>
    </div>
  );
};

export default Profile;
