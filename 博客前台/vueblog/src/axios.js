import axios from "axios";
import ElementUI from 'element-ui';


axios.defaults.baseURL = "http://127.0.0.1:81";

axios.interceptors.request.use(config => {
	return config
})

axios.interceptors.response.use(response => {
	let res = response.data;
	if (res.code === 200) {
		return response
	} else if (res.code === 400) {
		ElementUI.Message.error(res.message)
		window.localStorage.removeItem("token")
		window.location.href = "/#/login"
		return Promise.reject(response.data.message)
	} else {
		ElementUI.Message.error(response.data.message)
		return Promise.reject(response.data.message)
	}
}, error => {
	console.log(error)
	if (error.response.data) {
		error.message = error.response.data.message
	}
	if (error.response.status === 400) {
		ElementUI.Message.error("用户未登录")
	}
	ElementUI.Message.error(error.message)
	return Promise.reject(error)
})
