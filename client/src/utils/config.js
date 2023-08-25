const ENV_VARS = {
  SERVER_URL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_SERVER_URL
      : process.env.REACT_APP_SERVER_URL_PROD,
};
export default ENV_VARS;
