import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LOGOUT_PATH, PROFILE_PATH, ROUTES } from "../common/constants";

import axiosInstance from "../utils/http.utils";
import { useUserContext } from "../context/useUserContext";

import "./Header.css";

export default function Header() {
	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	useEffect(() => {
		const fetchUser = async () => {
			axiosInstance
				.get(PROFILE_PATH)
				.then((response) => {
					setUser({
						id: response.data.user.id,
						username: response.data.user.username,
						role: response.data.user.role,
					});
				})
				.catch((error) => {
					console.error("GET PROFILE ERROR: ", error);
					navigate(ROUTES.LOGIN, { replace: true });
				});
		};

		fetchUser();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogout = () => {
		axiosInstance.post(LOGOUT_PATH).then(() => setUser(null));
		navigate(ROUTES.LOGIN, { replace: true });
	};

	return (
		<header>
			<Link to={ROUTES.HOME} className="logo">
				Spigot Blog Case
			</Link>
			<nav>
				{user ? (
					<>
						<Link to={ROUTES.CREATE_POST}>Create Post</Link>
						<a className="logout" onClick={handleLogout}>
							Logout
						</a>
					</>
				) : (
					<>
						<Link to={ROUTES.LOGIN}>Login</Link>
						<Link to={ROUTES.REGISTER}>Register</Link>
					</>
				)}
			</nav>
		</header>
	);
}
