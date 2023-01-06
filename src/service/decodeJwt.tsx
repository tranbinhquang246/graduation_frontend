import jwtDecode from "jwt-decode";
export default function decodeJwt() {
  const token = localStorage.getItem("jwt_token") || "{}";
  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    return false;
  }
}
