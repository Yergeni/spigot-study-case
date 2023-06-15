import React, { useState } from "react";
import Button from "../components/ui/Button";
import { ROUTES, REGISTER_PATH } from "../common/constants";
import axiosInstance from "../utils/http.utils";

import "./PagesCommon.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";

type FormData = {
	username: string;
	password: string;
	confirmPassword: string;
};

const initialState: FormData = {
	username: "",
	password: "",
	confirmPassword: "",
};

export default function RegisterPage() {
	const navigate = useNavigate();
	const { setUser } = useUserContext();

	const [formData, setformData] = useState<FormData>(initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setformData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: improve by adding validations
		axiosInstance
			.post(REGISTER_PATH, {
				username: formData.username,
				password: formData.password,
			})
			.then((response) => {
				if (response.status === 201) {
					setUser({
						id: response.data.id,
						username: response.data.username,
						role: response.data.role,
					});
					navigate(ROUTES.HOME);
				} else {
					alert("Registration failed!");
				}
			})
			.catch((error) => {
				console.error("REGITRATION ERROR: ", error);
				alert("Registration failed!");
			});
	};

	return (
		<form className="register" onSubmit={handleSubmit}>
			<h1>Register</h1>
			<input
				required
				type="text"
				name="username"
				placeholder="Username"
				value={formData.username}
				onChange={handleChange}
			/>
			<input
				required
				type="password"
				name="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
			/>
			<input
				required
				type="password"
				name="confirmPassword"
				placeholder="Confirm Password"
				value={formData.confirmPassword}
				onChange={handleChange}
			/>
			<Button>Register</Button>
		</form>
	);
}
