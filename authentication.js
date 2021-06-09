'use strict';

const getAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://auth.lazada.com/rest/auth/token/create',
    method: 'POST',
    body: {
      code: bundle.inputData.code,
      uuid: 38284839234,
      app_key: process.env.CLIENT_ID,
      sign_method: 'sha256',
      timestamp: 1623220257000,
      sign: '9E52E047C5FFEAF552609EECF7E00DEA3A46B5E16B6E9B04B03D0B1F4C7C60D4'

      // Extra data can be pulled from the querystring. For instance:
      // 'accountDomain': bundle.cleanedRequest.querystring.accountDomain
    },
    headers: { 'content-type': 'application/json' },
  });

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.

  // This function should return `access_token`.
  // If your app does an app refresh, then `refresh_token` should be returned here
  // as well
  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
};

const refreshAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://auth.lazada.com/rest/auth/token/refresh',
    method: 'POST',
    body: {
      refresh_token: bundle.authData.refresh_token,
      app_key: process.env.CLIENT_ID,
      sign_method: 'sha256',
      access_token: bundle.authData.access_token,
      timestamp: 1623220257000,
      sign: '9E52E047C5FFEAF552609EECF7E00DEA3A46B5E16B6E9B04B03D0B1F4C7C60D4'
    },
    headers: { 'content-type': 'application/json' },
  });

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.

  // This function should return `access_token`.
  // If the refresh token stays constant, no need to return it.
  // If the refresh token does change, return it here to update the stored value in
  // Zapier
  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }

  return request;
};

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.
const test = (z, bundle) =>
  z.request({ url: 'https://auth-json-server.zapier-staging.com/me' });

module.exports = {
  config: {
    // OAuth2 is a web authentication standard. There are a lot of configuration
    // options that will fit most any situation.
    type: 'oauth2',
    oauth2Config: {
      authorizeUrl: {
        url: 'https://auth.lazada.com/oauth/authorize',
        params: {
          response_type: 'code',
          force_auth: true,
          redirect_uri: '{{bundle.inputData.redirect_uri}}',
          client_id: '{{process.env.CLIENT_ID}}',
        },
      },
      getAccessToken,
      refreshAccessToken,
      autoRefresh: true,
    },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.
    connectionLabel: '{{json.username}}',
  },
  befores: [includeBearerToken],
  afters: [],
};
