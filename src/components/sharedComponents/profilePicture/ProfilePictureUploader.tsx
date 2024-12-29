import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Typography from "../Typography";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { uploadProfilePicture } from "../../../controllers/contentUploadController/uploadProfilePictureController";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/rootReducer";
import { fetchUserInfo } from "../../../redux/slices/user";
import { showToast } from "../../../utils/toast";
import CustomButton from "../CustomButton";
import UploaderPictureDisplay from "./UploaderPictureDisplay";

interface ProfilePictureUploaderProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  purpose: ImagePurpose;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  open = false,
  setOpen,
  purpose,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [preview, setPreview] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [filename, setFilename] = useState("");

  const [imageOffset, setImageOffset] = useState<ImageOffset>({ x: 0, y: 0 });
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userInfoStatus = useSelector((state: RootState) => state.user.status);
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [imageDetails, setImageDetails] = useState<string | ArrayBuffer | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!userInfo && userInfoStatus !== "loading") {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, userInfo, userInfoStatus]);

  useEffect(() => {
    if (error) {
      showToast(error, error, "error");
    }
  }, [error]);

  useEffect(() => console.log(imageOffset), [imageOffset]);

  const onChooseFileClick = () => {
    hiddenFileInput?.current?.click();
  };

  const validateImage = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return false;
      } else if (file.size > 25000000) {
        setError("File size exceeds the 25MB limit.");
        return false;
      }
      setError("");
      return true;
    }
  };

  const onClose = () => {
    setPreview("");
    setOpen(false);
  };

  const getImageDimensions = async (file: File) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    return { width: img.width, height: img.height };
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      const reader = new FileReader();
      reader.onload = async () => {
        const { width, height } = await getImageDimensions(file);
        setDimensions({ width, height });

        setFilename(file.name);
        setImageDetails(reader.result);
        setPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const onUploadPicture = async () => {
    if (imageDetails && userInfo?.id) {
      setUploadLoading(true);
      await uploadProfilePicture(
        imageDetails.toString(),
        userInfo.id,
        filename,
        purpose,
        imageOffset,
        dimensions
      );
      setOpen(false);
      navigate(0);
      setUploadLoading(false);
    }
  };

  return (
    <Dialog
      PaperProps={{
        className:
          "flex lg:w-[60%] lg:h-[60%] sm:w-full sm:h-full bg-white dark:bg-gray-800",
      }}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="flex justify-between p-4 items-center bg-gray-100 dark:bg-gray-700">
        <Typography className="text-lg font-normal">
          Upload Profile Picture
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon className="text-gray-500 hover:text-gray-800" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div className="flex flex-col items-center gap-4 overflow-hidden">
          {preview ? (
            <UploaderPictureDisplay
              imageSrc={preview}
              diameter={400}
              setImagePosition={setImageOffset}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
              <AddPhotoAlternateIcon className="text-gray-400 text-6xl" />
              <Typography className="text-gray-500 mt-2">
                Select an image to preview
              </Typography>
            </div>
          )}
          <input
            ref={hiddenFileInput}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <CustomButton
            variant="contained"
            color="primary"
            onClick={onChooseFileClick}
          >
            Choose File
          </CustomButton>
        </div>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={onUploadPicture}
          disabled={!imageDetails || uploadLoading}
        >
          {uploadLoading ? "Uploading..." : "Upload"}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProfilePictureUploader;
