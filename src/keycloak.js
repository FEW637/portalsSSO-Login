const keycloakConfig = {
  authServerUrl: "https://dev-sso.techberry.co.th",
  realm: "master",
  clientId: "admin-cli",
  redirectUri: window.location.origin + "/dashboard",
  responseType: "code",
};

export default keycloakConfig;