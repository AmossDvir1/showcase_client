import { Typography } from "@mui/material";
import { ToastPosition, TypeOptions, toast } from "react-toastify";

const errorOptions = {
  toastId: "error",
  position: "bottom-left" as ToastPosition | undefined,
}
const infoOptions = {
  toastId: "info",
  position: "bottom-left" as ToastPosition | undefined,
}
const warningOptions = {
  toastId: "warning",
  position: "bottom-left" as ToastPosition | undefined,
}
const successOptions = {
  toastId: "success",
  position: "bottom-left" as ToastPosition | undefined,
}

const Msg: React.FC<{message: string}> = ({message}) => (
  <Typography>
    {message ?? ""}
  </Typography>
);

export const showToast = (
  title: string,
  message: string,
  type?: TypeOptions
) => {
  switch (type) {
    case "error":
      toast.error(<Msg message={message}/>, errorOptions); 
      break;
    case "info":
      toast.info(<Msg message={message}/>, infoOptions);
      break;
    case "success":
      toast.success(<Msg message={message}/>, successOptions);
      break;
    case "warning":
      toast.warning(<Msg message={message}/>, warningOptions);
      break;
    default:
      toast(title, {
        toastId: "default",
        position: "bottom-left",
      });
  }
};
