import type { RouteObject } from "./types";
import { Navigate, createHashRouter,createMemoryRouter, redirect } from "react-router-dom";

import LoginPage from "@/views/login";
import HomePage from "@/views/home";
import App from "@/App";


const rootRoutes: RouteObject[] = [
	{
		path: "/",
		name: "Root",
		element: <Navigate to="/home" />,
	},
	{
		path: "/app",
		name: "Root",
		element: <App></App>,
	},
	{
		path: "/home",
		name: "Home",
		element: <HomePage />,
    meta: {
			title: "首页",
			icon: "home",
			affix: true,
			orderNo: 1,
			hideChildrenInMenu: true,
		},
	},
	{
		path: "/login",
		name: "Login",
		element: <LoginPage />,
    meta: {
			title: "登录页",
			key: "login",
		},
		loader: () => {

			return null;
		},
	},
];


export const router = createHashRouter(rootRoutes);
// export const router = createMemoryRouter(rootRoutes);
