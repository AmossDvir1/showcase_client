import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "../../../components/sharedComponents/Button";
import { serverReq } from "../../../API/utils/axiosConfig";
import { Chip } from "../../../components/sharedComponents/Chip";
import Loader from "../../../components/sharedComponents/Loader";
import { useAuth } from "../../../context/AuthContext";

interface ISession {
  _id: string;
  device: { osName: string; browserName: string };
  location: string;
  createdAt: string;
  currentSession: boolean;
}

const DeviceManagement: React.FC = () => {
  const auth = useAuth();
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [error, setError] = useState("");
  const [loadingRemove, setLoadingRemove] = useState<boolean | string>(false);

  const fetchSessions = async () => {
    setLoadingSessions(true);
    setError("");
    try {
      const res = await serverReq.get("/sessions");
      setSessions(res.data.sessions);
    } catch (err) {
      setError("Failed to fetch sessions.");
    } finally {
      setLoadingSessions(false);
    }
  };

  const removeSession = async (sessionId: string, logout?: boolean) => {
    setLoadingRemove(sessionId);
    if (logout) {
      auth.logout();
    } else {
      try {
        await serverReq.post("/sessions/remove", { sessionId });
        setSessions((prevDevices) =>
          prevDevices.filter((session) => session._id !== sessionId)
        );
      } catch (err) {
        console.error(err);
      }
    }
    setLoadingRemove(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loadingSessions)
    return (
      <div className="flex flex-col items-center justify-center mb-4">
        <Typography className="text-gray-800 text-center my-6">
          Loading devices...
        </Typography>
        <Loader size="md"></Loader>
      </div>
    );
  if (error) return <Typography className="text-black">{error}</Typography>;

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Typography className="text-gray-800 text-2xl font-semibold mb-6">
          Device Management
        </Typography>
        {sessions?.length === 0 ? (
          <Typography className="text-gray-600 text-center">
            No devices found.
          </Typography>
        ) : (
          <div className="space-y-4">
            {sessions?.map((session) => (
              <div
                key={session._id}
                className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between"
              >
                <div className="space-y-2">
                  <Typography className="text-gray-800 font-medium">
                    Device: {session?.device?.browserName},
                    {session?.device?.osName}
                  </Typography>
                  <Typography className="text-gray-600">
                    Location: {session?.location}
                  </Typography>
                  <Typography className="text-gray-600">
                    Logged In Since:
                    <span className="text-gray-700 font-medium">
                      {new Date(session?.createdAt).toLocaleString()}
                    </span>
                  </Typography>
                  {session.currentSession && (
                    <Chip
                      label="Current Device"
                      className="bg-green-100 text-green-700"
                    />
                  )}
                </div>
                <Button
                  btnsize="xs"
                  onClick={() =>
                    removeSession(session._id, session.currentSession)
                  }
                  className="bg-red-500 text-white hover:bg-red-600 transition"
                >
                  {session.currentSession ? "Log out" : "Remove"}
                </Button>{loadingRemove === session._id && <Loader></Loader>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceManagement;
