"use client";
import axios from "axios";
import {
  getLocalStorage,
  onClearAllStorage,
  showToaster,
} from "./helperFunctions";
import { AXIOS_AVOIDING_URLS, TOASTER_AVOIDING_URLS } from "./constant";

export const apiInstance = axios.create({
  baseURL: "/api",
});

apiInstance.interceptors.request.use(
  async (config) => {
    const user = getLocalStorage("user", "cookies");

    if (user?.access_token) {
      config.headers["Authorization"] = `Bearer ${user?.access_token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const data = error?.response?.data;
    const status = error?.status;

    if (status === 401 && !AXIOS_AVOIDING_URLS?.includes(error?.config?.url)) {
      // onClearAllStorage(false);
    } else {
      if (!TOASTER_AVOIDING_URLS?.includes(error?.config?.url)) {
        showToaster(data?.message, false);
      }
    }

    return Promise.reject(error);
  }
);
