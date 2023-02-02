import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";

const ProtectedRoute = ({ children }) => {
	const { token } = useContext(TokenContext);

	if (token === "null") {
		return <Navigate to='/login' replace />;
	}

	return children;
};

export default ProtectedRoute;
