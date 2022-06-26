import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { loginStart, loginSuccess, loginFailure } from "./index";

export const login = async (payload, dispatch) => {
	dispatch(loginStart());
	try {
		
		const { data } = await axiosInstance.post("/login", payload);

		const decodeData = jwt_decode(data.data);
		dispatch(loginSuccess({ ...decodeData, token: data.data }));
		toast.success(data.message);
		window.location = "/home";
		return true;
	} catch (error) {
		dispatch(loginFailure());
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			toast.error(error.response.data.message);
		} else {
			console.log(error);
			toast.error("Something went wrong!");
		}
		return false;
	}
};
