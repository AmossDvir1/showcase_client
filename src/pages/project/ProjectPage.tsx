import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverReq } from '../../API/utils/axiosConfig';
import { Typography } from '@mui/material';
import { Button } from '../../components/sharedComponents/Button';

interface IProject {
  firstName: string;
  lastName: string;
  username: string;
}

const Project: React.FC = () => {
      const { urlName, type } = useParams<{ urlName: string, type: ResultsItemTypes }>();
  const [userData, setUserData] = useState<IProject | null>(null);

const onAddUserClick = async () => {
  try{

    const res = await serverReq.post(`/friends`,  { addUsername: userData?.username }); 
  }
  catch(err:any){
    console.error('Error sending friend request:', err);
  }
}

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await serverReq.get(`/projects`,  { params: {urlMapping: urlName, type}}); // Assuming profiles are accessible with an ID
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserData(null);
      }
    };

    fetchUserProfile();
  }, [urlName]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
      
        {/* You can replace the 'blank-profile-image.jpg' with your actual image */}
        <img
          src="/blank-profile-image.jpg"
          alt={`${userData?.firstName} ${userData?.lastName}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow-md w-64">
        <Typography className="text-xl font-light">{`${userData?.username}`}</Typography>
        {/* Add other profile information here */}
      {/* </div>
      <div className="bg-primary p-4 rounded-lg shadow-md w-64"> */}
        <Typography className="text-xl font-light">{`${userData?.firstName} ${userData?.lastName}`}</Typography>
        {/* Add other profile information here */}
      </div>
      <Button onClick={onAddUserClick}>+ Add friend</Button>
    </div>
  );
};

export default Project;