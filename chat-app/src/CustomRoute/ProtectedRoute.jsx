import { useAuthAndChatContext } from "../Context/Context"; 
import { Outlet,Navigate } from "react-router-dom";

const ProtectedRoute = ({  }) => {
  const { currentUser } = useAuthAndChatContext();

  // If the user is authenticated, render the original element, otherwise, redirect to the login page
  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;