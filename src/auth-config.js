// client/src/auth-config.js

// Specific settings for our application's
// authentication context. These will override
// the default settings provided by aureliauth

var config = {

  // Our Node API is being served from localhost:3001
  baseUrl: 'https://secure.splitwise.com/api/v3.0/',
  // The API specifies that new users register at the POST /users enpoint.
  //signupUrl: 'users',
  // Logins happen at the POST /sessions/create endpoint.
  //loginUrl: 'sessions/create',
  // The API serves its tokens with a key of id_token which differs from
  // aureliauth's standard.
  tokenName: '7Qi2ZaDFkVcQkh5A4hoSo0oqfE6Lnuw2IGxCSYGt',
  // Once logged in, we want to redirect the user to the welcome view.
  loginRedirect: '#/NewEntry',

}

export default config;