import { TypeOptions, toast } from "react-toastify";

export const showToast = (
  title: string,
  message: string,
  type?: TypeOptions
) => {
  switch (type) {
    case "error":
      toast.error(title, {
        position: toast.POSITION.BOTTOM_LEFT,
        // className:"bg-red-400 text-cyan-50",
        data: {
          title: message,
          text: "We are here again with another article",
        },
      });
      break;
    case "info":
      toast.error(title, {
        position: toast.POSITION.BOTTOM_LEFT,
        // className:"bg-red-400 text-cyan-50",
        data: {
          title: message,
          text: "We are here again with another article",
        },
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
        position: toast.POSITION.BOTTOM_LEFT,
        // className:"bg-red-400 text-cyan-50",
        data: {
          title: message,
          text: "We are here again with another article",
        },
      });
      break;
    default:
      toast(title, {
        position: toast.POSITION.BOTTOM_LEFT,
        // className:"bg-red-400 text-cyan-50",
        data: {
          title: message,
          text: "We are here again with another article",
        },
      });
  }
};
