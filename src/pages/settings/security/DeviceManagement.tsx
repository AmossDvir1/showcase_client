import React, { useEffect, useState } from "react";
import Typography from "../../../components/sharedComponents/Typography";
import { serverReq } from "../../../API/utils/axiosConfig";
import { Chip } from "../../../components/sharedComponents/chip/Chip";
import Loader from "../../../components/sharedComponents/Loader";
import { useAuth } from "../../../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { getDeviceImage } from "../../../utils/utils";
import { useAppSelector } from "../../../redux/hooks";

interface ISession {
  _id: string;
  device: { osName: string; browserName: string; deviceType: string };
  location: string;
  createdAt: string;
  currentSession: boolean;
}

const DeviceManagement: React.FC = () => {
  const auth = useAuth();
  const isDarkMode = useAppSelector((state) => state.theme.mode) === "dark"

  const [sessions, setSessions] = useState<ISession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [error, setError] = useState("");
  const [loadingRemove, setLoadingRemove] = useState<string[]>([]);

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
    setLoadingRemove((prev) =>
      prev.includes(sessionId) ? prev : [...prev, sessionId]
    );
    if (logout) {
      await auth.logout();
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
    setLoadingRemove((prev) =>
      prev.includes(sessionId)
        ? prev.filter((session) => session !== sessionId)
        : prev
    );
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
    <>
      <div className="">
        <Typography className="text-gray-800 text-2xl font-medium mb-6">
          {"Devices"}
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
                className="bg-white dark:bg-dark-paper-light p-4 shadow-md rounded-lg flex flex-col md:flex-row items-center md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4"
              >
                {/* Device Image */}
                <img
                  src={
                    process.env.PUBLIC_URL +
                    getDeviceImage(session?.device?.deviceType, isDarkMode)
                  }
                  alt={session?.device?.deviceType}
                  className="w-12 h-12 object-contain "
                />

                {/* Device Details */}
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex">
                      <Typography className="text-gray-800 font-medium">
                        {"Platform:"}&nbsp;
                      </Typography>
                      <Typography className="text-gray-600">
                        {`${session?.device?.browserName}, ${session?.device?.osName}`}
                      </Typography>
                    </div>
                    <div className="flex">
                      <Typography className="text-gray-800 font-medium">
                        {"Device Type:"}&nbsp;
                      </Typography>
                      <Typography className="text-gray-600">
                        {session?.device?.deviceType || "Unknown"}
                      </Typography>
                    </div>
                    <div className="flex">
                      <Typography className="text-gray-800 font-medium">
                        {"Location:"}&nbsp;
                      </Typography>
                      <Typography className="text-gray-600">
                        {session?.location}
                      </Typography>
                    </div>
                    <div className="flex">
                      <Typography className="text-gray-800 font-medium">
                        {"Logged In Since:"}&nbsp;
                      </Typography>
                      <Typography className="text-gray-600">
                        {new Date(session?.createdAt).toLocaleString()}
                      </Typography>
                    </div>
                  </div>

                  {/* Current Device Chip */}
                  {session.currentSession && (
                    <div className="mt-2 md:mt-4 flex md:hidden">
                      <Chip
                        label="Current Device"
                        className="bg-green-100 text-green-700"
                      />
                    </div>
                  )}
                </div>

                {/* Remove/Logout Button */}
                <div className="flex flex-col items-center md:items-center space-y-2">
                  <LoadingButton
                    size="small"
                    className={`bg-red-500 hover:bg-red-600 text-white transition font-thin py-0.5 px-2 text-sm disabled:bg-slate-300 ${session.currentSession && "md:my-2"}`}
                    onClick={() =>
                      removeSession(session._id, session.currentSession)
                    }
                    loading={loadingRemove.includes(session._id)}
                    loadingPosition="start"
                    startIcon={
                      session.currentSession ? (
                        <LogoutIcon />
                      ) : (
                        <RemoveCircleOutlineIcon />
                      )
                    }
                    variant="contained"
                  >
                    {session.currentSession ? "Log out" : "Remove"}
                  </LoadingButton>

                  {/* Current Device Chip for larger screens */}
                  {session.currentSession && (
                    <div className="hidden md:flex md:py-2">
                      <Chip
                        label="This Device"
                        className="bg-green-100 text-green-700 px-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DeviceManagement;
