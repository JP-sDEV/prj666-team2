## GOOGLE CLIENT SECRETS:

{"web":{"client_id":"24802856036-lr5bfqd7nkhin07pc2dhb06p684ados5.apps.googleusercontent.com","project_id":"prj666-450705","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:3000/api/auth/callback/google"],"javascript_origins":["http://localhost:3000"]}}

## CURRENT ISSUES:

User registration via Google Auth #29
Summary:

When a user clicks on "register with Google", the user is redirected to Google Auth. Successful authentication returns a token used for identification and protected routes.
Background:

Description

Authenticate a user using Google OAuth with NextAuth. The request requires authentication via a bearer token or relies on a session for the user authentication.

Request Body Format
Parameter Description Default Value Example
email The email of the user to be authenticated. N/A user@example.com
access_token The Google OAuth access token received after user login. N/A ya29.a0AfH6SMDuvZ07L...
HTTP Response Codes

    200 OK — Request was successful and the user is authenticated.
    400 Bad Request — Missing or invalid parameters in the request body.
    401 Unauthorized — Missing or invalid authentication credentials. Please ensure that you provide a valid Google access token in the request body.
    500 Internal Server Error — Something went wrong on the server.

Example Request

POST /api/auth/signin/google HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Content-Length: 160

{
"email": "user@example.com",
"access_token": "ya29.a0AfH6SMDuvZ07L..."
}

Example Response

{
"status": "success",
"message": "User authenticated successfully.",
"data": {
"user_id": "12345",
"email": "user@example.com",
"name": "John Doe",
"session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}

Acceptance Criteria:

1. Request Body Validation

   Given a request to authenticate a user,
   When the request body does not contain both the email and access_token parameters,
   Then the system should:

Return a 400 Bad Request status.
Include an error message like: "Missing email or access token."

2. Valid Access Token Check

   Given a user sends a valid Google OAuth access token in the request body,
   When the access token is invalid or expired,
   Then the system should:

Return a 401 Unauthorized status.
Include an error message like: "Invalid or expired access token."

3. Successful Authentication Response

   Given the user is successfully authenticated with a valid email and access token,

   When the request is processed,

   Then the system should:

Include the following JSON response structure:

{
"status": "success",
"message": "User authenticated successfully.",
"data": {
"user_id": "12345",
"email": "user@example.com",
"name": "John Doe",
"session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}

- [ ] Return a `200 OK` status.

Get user's metric data #30
Summary:

This endpoint is protected, user must be authenticated. The logged in user should get their specified metric data. The default date-time range is 24 hours.
Background:

Description

Retrieve all datapoints of metric from device_id from a specified date-time range. The request requires authentication via a bearer token.

Query Parameters
Parameter Description Default Value Example
device_id Device collecting the requested data N/A 1
metric Type(s) of data to return temperature temperature, humidity, moisture
start Start date to query the data from 24 hours prior to request date-time 2025-01-01T08:00
end Time of request N/A 2025-01-01T08:00
HTTP Response Codes

    200 OK — Request was successful and data was returned.
    400 Bad Request — Invalid or missing query parameters.
    401 Unauthorized: Missing or invalid authentication token. Please ensure that you provide a valid Bearer token in the Authorization header.
    404 Not Found — Device not found.
    500 Internal Server Error — Something went wrong on the server.

Example Request

GET /api/devices/1/metrics/temperature,humidity?start=2025-01-01T08:00&end=2025-01-01T08:59 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Example Response

{
"status": "success",
"data": {
"temperature": [
{
"timestamp": "2024-02-01T08:00:00Z",
"value": 22.5,
"unit": "C"
}
],
"humidity": [
{
"timestamp": "2024-02-01T08:00:00Z",
"value": 45,
"unit": "%RH"
}
]
}
}

Acceptance Criteria:

1.  Successful Data Retrieval

        Given a valid Bearer token is provided and the correct query parameters are included (device_id, metric, start, end),
        When the request to retrieve data is sent,
        Then the system should:
        Successfully retrieve data for the requested metrics (temperature, humidity, etc.) from the specified device_id within the date-time range.
        Return a 200 OK status with the following JSON response structure:

{
"status": "success",
"data": {
"temperature": [
{
"timestamp": "2024-02-01T08:00:00Z",
"value": 22.5,
"unit": "C"
}
],
"humidity": [
{
"timestamp": "2024-02-01T08:00:00Z",
"value": 45,
"unit": "%RH"
}
]
}
}

Dependencies:

User registration via Google Auth #29

Implement Google OAuth integration on backend #35
Summary

Enable user authentication via Google OAuth, allowing users to sign in using their Google accounts. This will provide a secure and seamless login experience.
Background

Google OAuth integration simplifies user authentication, enhancing security, and reducing the need for password management. This is a key feature for user onboarding and account management.
Acceptance Criteria

Users can log in using their Google account.
OAuth authentication flow is implemented correctly, including:

    Redirecting users to Google’s login page.
    Handling OAuth callback and exchanging the authorization code for an access token.
    Retrieving user profile data (email, name, and profile picture).
    Creating a new user in the database if they do not exist.
    Generating and returning a session token upon successful authentication.

Secure token storage and proper session management.
Error handling for failed authentication attempts.
Unit tests and integration tests to validate functionality.

Set up Google API credentials #36
Summary

Configure Google API credentials to enable OAuth authentication for user login. This involves setting up a Google Cloud project and obtaining the necessary client credentials.
Background

Google OAuth requires API credentials to authenticate users securely. These credentials allow the backend to request authentication tokens and retrieve user information.
Acceptance Criteria

Create a new project in Google Cloud Console.
Enable the "Google Identity Platform" API.
Configure OAuth consent screen with required details.
Generate OAuth 2.0 client credentials (Client ID & Client Secret).
Add allowed redirect URIs for authentication callbacks.
Securely store client credentials in environment variables.
Verify authentication by testing with a Google OAuth flow.

Implement frontend logic to handle Google Auth login flow #37
Summary

Develop the frontend logic to allow users to authenticate using Google OAuth. This includes initiating the login process, handling authentication responses, and managing user sessions.
Background

Google OAuth provides a secure and seamless way for users to log in without needing to create a new password. Implementing this feature enhances user experience and security.
Acceptance Criteria

Add a "Sign in with Google" button to the login page.
Integrate NextAuth to initiate authentication.
Redirect users to Google's authentication page.
Handle authentication response and extract the authorization code or access token.
Send the authorization code to the backend for verification.
Store authentication tokens securely in local storage or session storage.
Display user profile information (e.g., name, email, profile picture) upon successful login.
Implement logout functionality to clear session data.
Show appropriate error messages if authentication fails.
Ensure smooth user experience with loading indicators and UI feedback.

Dependencies

Implement Google OAuth integration on backend #35
Set up Google API credentials #36
Store Google user data in the database (e.g., user ID, email) #38

Test Google Auth integration #39
Summary

Validate the implementation of Google OAuth authentication by thoroughly testing the entire authentication flow, including sign-in, user data storage, and error handling.
Background

Testing ensures that the Google OAuth integration works as expected, providing users with a seamless login experience and properly handling edge cases and potential errors.
Acceptance Criteria

Test the Google OAuth login flow:

    Ensure users can successfully log in using their Google account.
    Verify that the authentication token is correctly exchanged for access and refresh tokens.
    Confirm that user data (e.g., email, name, profile picture) is correctly retrieved from Google.

Test the creation of new user accounts when the user is logging in for the first time.
Test user data storage in the database, ensuring that information like Google user ID and email are correctly saved.
Test the handling of returning users, ensuring that their data is updated (e.g., last login timestamp).
Test invalid login attempts (e.g., expired tokens, incorrect credentials) and ensure proper error messages are displayed.
Test the logout functionality to ensure session data is cleared.
Test edge cases such as user revoking access or token expiration.
Ensure proper error handling when the Google API is unavailable or returns errors.
Perform cross-browser testing to ensure compatibility.

Dependencies

Implement frontend logic to handle Google Auth login flow #37
Store Google user data in the database (e.g., user ID, email) #38
