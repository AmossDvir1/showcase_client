import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Button } from "../Button";
import { Popup } from "../Popup";
import CloseIcon from "@mui/icons-material/Close";
import { uploadProfilePicture } from "../../../controllers/contentUploadController/uploadProfilePictureController";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";
import { showToast } from "../../../utils/toast";

interface ProfilePictureUploaderProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  purpose: ImagePurpose;
}
const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  open = false,
  setOpen,
  purpose
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [preview, setPreview] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [imageDimensions, setImageDimensions] = useState<{
    height: null | number;
    width: null | number;
  }>({ height: null, width: null });

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    // Dispatch the async action to fetch user info only if it's not already present
    if (!userInfo && userInfoStatus !== "loading") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  const [imageDetails, setImageDetails] = useState<string | ArrayBuffer | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) {
      showToast(error, error, "error");
    }
  }, [error]);

  const onChooseFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hiddenFileInput?.current && hiddenFileInput?.current.click) {
      hiddenFileInput?.current.click();
    }
  };

  const validateImage = (file: File | null) => {
    if (file) {
      console.log(file.size)
      if (!file.type.startsWith("image/")) {
        setError("Please Select an Image File");
        return false;
      } else if (file.size > 10000000) {
        setError("File Size is Too Large");
        return false;
      } else {
        setError("");
        return true;
      }
    }
  };

  const onClose = () => {
    setPreview("");
    setOpen(false);
  };

  const getImageDimensions = async (file: File) => {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    let width = img.width;
    let height = img.height;
    return {
      width,
      height,
    };
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file: File;
    if (e?.target?.files && e?.target?.files?.length > 0) {
      file = e.target.files[0];
      //   console.log(file);
      if (validateImage(file)) {
        setPreview(URL.createObjectURL(file));
        reader.readAsDataURL(e?.target?.files[0]);
        reader.onload = async () => {
          const { height, width } = await getImageDimensions(file);

          setImageDimensions({ height, width });
          setFilename(file.name);
          setImageDetails(reader.result);
        };
        reader.onerror = () => setError("Error while choosing image");
      }
    }
  };

  const onUploadPicture = async () => {
    if (imageDetails && userInfo?.userId) {
      setUploadLoading(true);
      const res = await uploadProfilePicture(
        imageDetails.toString(),
        userInfo.userId,
        filename,
        purpose
      );
      setOpen(false);
      navigate(0);
    }
    console.log(imageDetails);
    setUploadLoading(false);
  };

  return (
    <div>
      <Dialog
        PaperProps={{
          className:
            "flex lg:w-[60%] lg:h-[60%] sm:w-full sm:h-full bg-zinc-100",
        }}
        fullScreen={fullScreen}
        open={open}
      >
        <DialogTitle
          className="flex justify-between p-3 items-center"
          id="responsive-dialog-title"
        >
          <Typography>Upload Photo</Typography>
          <IconButton className="p-0" onClick={onClose}>
            <CloseIcon className="rounded-full w-8 h-8 bg-gray-300 fill-gray-600 hover:bg-[rgb(195,199,205)] transition-all"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <div className="p-6 flex flex-col items-center justify-center">
            <Button round={false} onClick={onChooseFileClick}>
              Choose File
            </Button>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              accept="image/*"
              className=""
              id="contained-button-file"
              type="file"
              onChange={onFileChange}
            />
            {preview && imageDimensions.height && imageDimensions.width && (
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                className="p-6"
                alt="profile"
                src={preview}
              ></img>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex-col w-full">
            <Divider />
            <div className="flex justify-end w-full mt-2">
              {false && <Popup label="Discard Changes"></Popup>}
              <Button
                className="mr-2 bg-green-600"
                bgcolor="bg-green-600"
                bgcolorhover="hover:bg-green-500"
                bgdisabledcolor="rgb(22,163,74,0.25)"
                round
                btnsize="sm"
                onClick={onUploadPicture}
                loading={uploadLoading}
                disabled={!imageDetails}
                loadingText="Uploading..."
                type="submit"
              >
                + Upload Photo
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePictureUploader;
