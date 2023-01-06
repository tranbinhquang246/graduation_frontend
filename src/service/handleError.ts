import { toast } from "react-toastify";

export default function handleError(error: any) {
  switch (error.response.data.statusCode) {
    case 401:
      localStorage.removeItem("jwt_token");
      window.location.href = "http://localhost:3000/login";
      return;
    default:
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
  }
}
