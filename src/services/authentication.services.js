import { notification } from "antd";
import { getRequest, postRequest } from "./verb.services";

export const setTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const userLogin = (data, resolve, reject) => {
  return postRequest("auth/login", null, false, data)
    .then(({ data }) => {
      const resData = data.data;
      notification.success({
        message: "Success",
        description: 'Successfully logged in!',
      });
      setTokenToLocalStorage(resData.token);
      resolve(resData);
    })
    .catch((error) => {
      const err =
        error && error.response && error.response.data
          ? error.response.data.message
          : "Something went wrong";
      // Notify Error
      notification.error({
        message: "Error",
        description: err,
      });
      return reject();
    });
};

export const userSignup = (data, resolve, reject) => {
  return postRequest("auth/signup", null, false, data)
    .then(({ data }) => {
      const resData = data.data;
      notification.success({
        message: "Success",
        description: 'Successfully signed up!',
      });
      setTokenToLocalStorage(resData.token);
      resolve(resData);
    })
    .catch((error) => {
      const err =
        error && error.response && error.response.data
          ? error.response.data.message
          : "Something went wrong";
      // Notify Error
      notification.error({
        message: "Error",
        description: err,
      });
      return reject();
    });
};

export const verifyUser = (resolve, reject) => {
  return getRequest("user/me", null, false)
    .then(({ data }) => {
      const resData = data.data;
      resolve(resData);
    })
    .catch((error) => {
      const err =
        error && error.response && error.response.data
          ? error.response.data.message
          : "Something went wrong";
      // Notify Error
      notification.error({
        message: "Error",
        description: err,
      });
      return reject();
    });
};

export const logout = () => {
  return removeTokenFromLocalStorage();
};
