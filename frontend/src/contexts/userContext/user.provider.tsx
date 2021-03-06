import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { UserInformationInterface } from '../../_types/user';
import userContext from './user.context';
import { UserContextInterface } from './user.types';
import { PICKANDEAT_LS_T } from '../../_constants/localStorage';
import Swal from 'sweetalert2';
import { Buffer } from "buffer"

const { Provider } = userContext;

const UserProvider: FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null as unknown as UserInformationInterface);
  const [userLoading, setUserLoading] = useState(false);
  const [userRole, setUserRole] = useState(null as unknown as string);

  /***************
    * User Logout
  /**************/
  const handleLogout = useCallback(() => {
    localStorage.removeItem(PICKANDEAT_LS_T);
    setUser(null as unknown as UserInformationInterface);
    setUserRole(null as unknown as string);
    setIsAuth(false);
  }, [setIsAuth, setUser, setUserRole]);

  /***************
   * User authentication
   /**************/
  const handleLogin = useCallback(
    (token) => {
      // Modal message
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        scrollbarPadding: false,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      if (token && token.length > 0) {
        const authAxios = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `${process.env.REACT_APP_ACCESS_TOKEN_TYPE} ${token}`,
          },
        });

        const parsedToken = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString()
        );

        // parsedToken.exp * 1000 to get it in millisecond
        const notExpiry = parsedToken?.exp * 1000 > Date.now();

        if (parsedToken?.id && notExpiry) {
          return authAxios
            .get(`users/${parsedToken.id}`)
            .then((res) => {
              setUser(res.data);
              setUserRole(res.data.role);
              setIsAuth(true);
              setUserLoading(false);
              Toast.fire({
                icon: 'success',
                title: 'Successfully connected!',
              });
            })
            .catch(() => {
              setUserLoading(false);
              handleLogout();
            });
        } else {
          setUserLoading(false);
          handleLogout();
        }
      }
    },
    [handleLogout]
  );

  /***************
   * Check if a user has previously logged in
   /**************/
  useEffect(() => {
    const refetch = () => {
      const encodedUserToken = localStorage.getItem(PICKANDEAT_LS_T);

      if (encodedUserToken && encodedUserToken.length > 0) {
        handleLogin(
          JSON.parse(Buffer.from(encodedUserToken, 'base64').toString())
        );
      } else {
        handleLogout();
      }
    };
    refetch();

    window.addEventListener('storage', refetch);

    return () => window.removeEventListener('storage', refetch);
  }, [handleLogin, handleLogout]);

  /***************
   * User delete account
   /**************/
  const handleDeleteUserAccount = useCallback(() => {
    const encodedUserToken = localStorage.getItem(PICKANDEAT_LS_T);

    if (encodedUserToken && encodedUserToken.length > 0) {
      const decodedToken = JSON.parse(
        Buffer.from(encodedUserToken, 'base64').toString()
      );

      const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `${process.env.REACT_APP_ACCESS_TOKEN_TYPE} ${decodedToken}`,
        },
      });

      const parsedToken = JSON.parse(
        Buffer.from(decodedToken.split('.')[1], 'base64').toString()
      );

      return authAxios
        .delete(`users/${parsedToken?.id}`)
        .then(() => {
          handleLogout();
          Swal.fire({
            title: 'Deleted!',
            text: `Your account has been deleted.`,
            icon: 'success',
            scrollbarPadding: false,
          });
        })
        .catch(() => {
          handleLogout();
        });
    }
    return handleLogout();
  }, [handleLogout]);

  const contextValue: UserContextInterface = useMemo(
    () => ({
      isAuth,
      user,
      setUser,
      userLoading,
      setUserLoading,
      userRole,
      setUserRole,
      handleLogout,
      handleLogin,
      handleDeleteUserAccount,
    }),
    [
      isAuth,
      user,
      setUser,
      userLoading,
      setUserLoading,
      userRole,
      setUserRole,
      handleLogout,
      handleLogin,
      handleDeleteUserAccount,
    ]
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export default UserProvider;
