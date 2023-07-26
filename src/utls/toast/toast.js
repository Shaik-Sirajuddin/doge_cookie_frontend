import { toast } from "react-hot-toast";

export const succesToast = (message, id = 1) => {
  return toast.success(message, {
    id: id,
  });
};

export const errorToast = (message = "Something went wrong!", id = 1) => {
  return toast.error(message, {
    id: id,
  });
};
