const { makeVar, useReactiveVar } = require('@apollo/client');

const authVarId = '_auth_data_';

const initialValue = {
  userName: '',
  userId: '',
  isLoggedIn: false,
};

const authVar = makeVar({ ...initialValue });

const setVar = (userName = '', userId = '', isLoggedIn = false) => {
  const authData = { userId, userName, isLoggedIn };

  localStorage.setItem(authVarId, JSON.stringify(authData));
  authVar(authData);
};

const getVar = () => {
  return authVar();
};

const resetVar = () => {
  localStorage.removeItem(authVarId);
  authVar({ ...initialValue });
};

const hydrate = () => {
  const localDataStr = localStorage.getItem(authVarId);
  const authVarData = getVar();

  if (!localDataStr) {
    if (authVarData.isLoggedIn) {
      resetVar();
    }
    return;
  }
  if (JSON.stringify(authVarData) === localDataStr) {
    return;
  }

  const localDataObj = JSON.parse(localDataStr);

  setVar(localDataObj.userName, localDataObj.userId, localDataObj.isLoggedIn);
};

export const useAuthVar = () => {
  authDataManager.hydrate();
  return useReactiveVar(authVar);
};

export const authDataManager = {
  setVar,
  getVar,
  resetVar,
  hydrate,
};
