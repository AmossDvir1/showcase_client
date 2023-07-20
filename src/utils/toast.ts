import { TypeOptions, toast } from "react-toastify";

export const showToast = (
  title: string,
  message: string,
  type?: TypeOptions
) => {
  switch (type) {
    case "error":
      toast.error(title, {
        toastId: "error",
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case "info":
      toast.info(title, {
        toastId: "info",
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case "success":
      toast.success(title, {
        position: toast.POSITION.BOTTOM_LEFT,
        // className:"bg-red-400 text-cyan-50",
        data: {
          title: message,
          text: "We are here again with another article",
        },
      });
      break;
    case "warning":
      toast.warning(title, {
        toastId: "warning",
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    default:
      toast(title, {
        toastId: "default",
        position: toast.POSITION.BOTTOM_LEFT,
      });
  }
};
