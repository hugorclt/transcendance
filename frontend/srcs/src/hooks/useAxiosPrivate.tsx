import { axiosPrivate } from "../services/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAtom } from "jotai";
import { userAtom } from "../services/store";

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const [user, setUser] = useAtom(userAtom);

  //this hook will attach the interceptors to the axios instance
  useEffect(() => {
    //===== REQUEST INTERCEPTOR =====
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //===== RESPONSE INTERCEPTOR =====
    const responseIntercept = axiosPrivate.interceptors.response.use(
      //if response is ok we return the response
      (response) => response,
      async (error) => {
        //in case we intercept an error
        const prevRequest = error?.config; //accessing the previous request
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          //if we are getting 401 for the first time we repeat it
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; //we set the token we just got
          return axiosPrivate(prevRequest); //making the request again
        }
        return Promise.reject(error);
      }
    );

    //if we don't remove interceptors, they pile up
    //to avoid this we remove them
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [user.accessToken, refresh]);
  return axiosPrivate;
}

export default useAxiosPrivate;
