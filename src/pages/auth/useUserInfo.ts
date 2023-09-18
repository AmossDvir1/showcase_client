import { useEffect, useState } from 'react';
import { serverReq } from '../../API/utils/axiosConfig';



interface UseUserInfo {
  userInfo: UserInfo | null;
  loading: boolean;
  error: Error | null;
}

const useUserInfo = (): UseUserInfo => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await serverReq('/user/me');
        setUserInfo(response?.data?.userData);
        setLoading(false);
      } catch (err:any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};

export default useUserInfo;