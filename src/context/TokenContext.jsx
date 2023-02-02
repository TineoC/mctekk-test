import React, { createContext, useEffect, useState } from "react";

const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
	const [token, setToken] = useState("null");

	useEffect(() => {
		const existingToken = localStorage.getItem("token"); //! Vulnerability issue token should be stored in httpOnly cookie

		if (existingToken) setToken(existingToken);
	}, []);

	useEffect(() => {
		localStorage.setItem("token", token);
	}, [token]);

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export { TokenContext, TokenContextProvider };
