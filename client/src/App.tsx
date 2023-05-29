import { Routes, Route } from "react-router-dom";

import { ROUTES } from "./common/constants";

import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import EditPostPage from "./pages/EditPostPage";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout />}>
				<Route index element={<PostListPage />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
				{/* Posts */}
				<Route path={ROUTES.CREATE_POST} element={<CreatePost />} />
				<Route path={ROUTES.VIEW_POST} element={<PostPage />} />
				<Route path={ROUTES.UPDATE_POST} element={<EditPostPage />} />
			</Route>
		</Routes>
	);
}

export default App;
