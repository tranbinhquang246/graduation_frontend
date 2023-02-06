export default function checkAuthenticated() {
  if (localStorage.getItem("jwt_token")) {
    return true;
  }
  return false;
}
