import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

import Button from "../components/ui/Button";

import { LOGIN_PATH, ROUTES } from "../common/constants";

import axiosInstance from "../utils/http.utils";

import "./PagesCommon.css";

// TODO: improve by handling loading and error states
export default function LoginPage() {
	const navigate = useNavigate();
	const { setUser } = useUserContext();

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: improve validations
		if (!usernameRef.current?.value || !passwordRef.current?.value) return;
		axiosInstance
			.post(LOGIN_PATH, {
				username: usernameRef.current.value,
				password: passwordRef.current.value,
			})
			.then((response) => {
				if (response.status === 200) {
					setUser({
						id: response.data.id,
						username: response.data.username,
						role: response.data.role,
					});
					navigate(ROUTES.HOME);
				} else {
					alert("Login failed!");
				}
			})
			.catch((error) => {
				console.error("LOGIN ERROR: ", error);
				alert("Login failed!");
			});
	};

	return (
		<form className="login" onSubmit={handleLogin}>
			<h1>Login</h1>
			<input
				ref={usernameRef}
				type="text"
				name="username"
				placeholder="Username"
			/>
			<input
				ref={passwordRef}
				type="password"
				name="password"
				placeholder="Password"
			/>
			<Button>Login</Button>
		</form>
	);
}
