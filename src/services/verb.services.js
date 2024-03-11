import axios from "axios";
import forEach from "lodash.foreach";
const Axios = axios.create();

// Request interceptor for API calls
Axios.interceptors.request.use(
  async (config) => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    config.headers = {
      Authorization: `${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const apiUrl = "http://localhost:3001";

const createParams = (listOfParams) => {
  let array = [];
  forEach(listOfParams, (paramValue, paramKey) => {
    array.push(
      encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramValue)
    );
  });
  return array.join("&");
};

const buildUrl = (endpointUrl, params, apiType = null) => {
  const firstEndpointUrlChar = endpointUrl.charAt(0);
  const addSlash = firstEndpointUrlChar === "/" ? "" : "/";
  let url = apiUrl + addSlash + endpointUrl;
  url = !url.endsWith("/") ? url + "/" : url;
  url = params ? url + "?" + createParams(params) : url;
  return url;
};

export const fetchToken = (passedToken) => {
  if (passedToken) {
    return `${passedToken}`;
  }
  const token = `${localStorage.getItem("token")}`;
  return token;
};

export const getRequest = (url, params = null, hasHeaders, passedToken) => {
  const token = fetchToken(passedToken);
  return Axios.get(
    `${buildUrl(url, params)}`,
    hasHeaders
      ? {
          headers: {
            authorization: token,
          },
        }
      : null
  );
};

export const postRequest = (url, params = null, hasHeaders, data, apiType) => {
  const token = fetchToken();
  return Axios.post(
    `${buildUrl(url, params, apiType)}`,
    { ...data },
    hasHeaders
      ? {
          headers: {
            authorization: token,
          },
        }
      : null
  );
};

export const putRequest = (url, params = null, hasHeaders, data, apiType) => {
  const token = fetchToken();
  return Axios.put(
    `${buildUrl(url, params, apiType)}`,
    { ...data },
    hasHeaders
      ? {
          headers: {
            authorization: token,
          },
        }
      : null
  );
};

export const deleteRequest = (url, params = null, hasHeaders, data) => {
  const token = fetchToken();
  return Axios.delete(
    `${buildUrl(url, params)}`,
    hasHeaders
      ? {
          headers: {
            authorization: token,
          },
          data: { ...data },
        }
      : { data: { ...data } }
  );
};

export const getAPIUrl = () => {
  return apiUrl;
};
