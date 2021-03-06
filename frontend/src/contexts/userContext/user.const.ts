import { UserContextInterface } from './user.types';

export const INITIAL_USER_CONTEXT: UserContextInterface = {
  isAuth: false,
  user: null as unknown as UserContextInterface['user'],
  setUser: null as unknown as UserContextInterface['setUser'],
  userLoading: false,
  setUserLoading: null as unknown as UserContextInterface['setUserLoading'],
  userRole: null as unknown as UserContextInterface['userRole'],
  setUserRole: null as unknown as UserContextInterface['setUserRole'],
  handleLogout: null as unknown as UserContextInterface['handleLogout'],
  handleLogin: null as unknown as UserContextInterface['handleLogin'],
  handleDeleteUserAccount:
    null as unknown as UserContextInterface['handleDeleteUserAccount'],
};
