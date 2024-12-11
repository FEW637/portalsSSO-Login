const keycloakConfig = {
  authServerUrl: "https://dev-sso.techberry.co.th",
  realm: "master",
  clientId: "admin-cli",
  redirectUri: "https://dev-sso.techberry.co.th/dashboard",  // Update this to your production URL
  responseType: "code",
};

export default keycloakConfig;