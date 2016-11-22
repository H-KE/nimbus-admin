export interface UserType {
    name: string;
    path: string;
}

export interface AuthData {
    accessToken:    string;
    client:         string;
    expiry:         string;
    tokenType:      string;
    uid:            string;
}

export interface OAuthPaths {
    github?:        string;
    facebook?:      string;
    google_oauth2?: string;
}

export interface Angular2TokenOptions {
    apiPath?:                   string;

    signInPath?:                string;
    signInRedirect?:            string;

    signOutPath?:               string;
    validateTokenPath?:         string;

    deleteAccountPath?:         string;
    registerAccountPath?:       string;
    registerAccountCallback?:   string;

    updatePasswordPath?:        string;

    resetPasswordPath?:         string;
    resetPasswordCallback?:     string;

    userTypes?:                 UserType[];

    oAuthPaths?:                OAuthPaths;
}
