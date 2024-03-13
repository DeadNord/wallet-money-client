// const getIsLoggedIn = (state: { question: { isLoggedIn: any } }) => state.question.isLoggedIn;

const getUserAccess = (state: {
  auth: {
    accessToken: string;
  };
}) => state.auth.accessToken;

const getUserInfo = (state: {
  auth: {
    user: {
      email: string;
    };
  };
}) => state.auth.user;

const getIsLoggedIn = (state: {
  auth: {
    isLoggedIn: boolean;
  };
}) => state.auth.isLoggedIn;

export const authSelectors = { getUserAccess, getUserInfo, getIsLoggedIn };
