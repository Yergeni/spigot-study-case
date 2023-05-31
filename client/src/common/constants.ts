export const API_BASE_URL = 'http://localhost:4000';

export const API_USER_PATH = '/api/users';
export const API_POST_PATH = '/api/posts';
// User paths
export const LOGIN_PATH = API_USER_PATH + "/login";
export const LOGOUT_PATH = API_USER_PATH + "/logout";
export const REGISTER_PATH = API_USER_PATH + "/register";
export const PROFILE_PATH = API_USER_PATH + "/profile";
// Post paths
export const GET_ALL_POSTS_PATH = API_POST_PATH + "/all";
export const CREATE_POST_PATH = API_POST_PATH + "/create";

export const POSTS_ROUTE = "/posts"
export const ROUTES = {
  HOME: "/",
  LOGIN: LOGIN_PATH,
  REGISTER: REGISTER_PATH,
  PROFILE: PROFILE_PATH,
  CREATE_POST: "/posts/create",
  VIEW_POST: "/posts/:id",
  UPDATE_POST: "/posts/:id/edit",
}