// APIs paths
export const API_BASE_URL = 'http://localhost:4000';

export const LOGIN_PATH = "/login";
export const LOGOUT_PATH = "/logout";
export const REGISTER_PATH = "/register";
export const PROFILE_PATH = "/profile";
// Post paths
export const ALL_POSTS_PATH = "/posts";
export const CREATE_POST_PATH = "/posts/create";

export const ROUTES = {
  HOME: "/",
  LOGIN: LOGIN_PATH,
  REGISTER: REGISTER_PATH,
  PROFILE: PROFILE_PATH,
  CREATE_POST: CREATE_POST_PATH,
  VIEW_POST: "/posts/:id",
  UPDATE_POST: "/posts/:id/edit"
}