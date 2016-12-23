import { Injectable }       from '@angular/core';
import { Http,
         Response,
         Headers,
         Request,
         RequestMethod,
         RequestOptions,
         URLSearchParams }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {
    UserType,
    AuthData,
    Angular2TokenOptions
} from './authentication.model';

@Injectable()
export class AuthenticationService {

    get currentUserType(): string {
        if (this._currentUserType != null)
            return this._currentUserType.name;
        else
            return null;
    }

    get currentUserData(): string {
        return this._currentUserData;
    }

    public _options: Angular2TokenOptions;
    public _currentUserType: UserType;
    public _currentAuthData: AuthData;
    public _currentUserData: any;

      constructor(public http: Http) {
          this.init();
      }

      // Inital configuration
      init(options?: Angular2TokenOptions) {

          let defaultOptions: Angular2TokenOptions = {
              // apiPath:                    'https://nimbus-app.cfapps.io/api/admin',
              // apiPath:                    'https://dev-nimbus.cfapps.io/api',
              apiPath:                    'http://localhost:3000/api/admin',

              signInPath:                 'auth/sign_in',
              signInRedirect:             null,

              signOutPath:                'auth/sign_out',
              validateTokenPath:          'auth/validate_token',

              registerAccountPath:        'auth',
              deleteAccountPath:          'auth',
              registerAccountCallback:    window.location.href,

              updatePasswordPath:         'auth',

              resetPasswordPath:          'auth/password',
              resetPasswordCallback:      window.location.href,

              userTypes:                  null,

              oAuthPaths: {
                  github:                 'auth/github',
                  facebook:               'auth/facebook',
                  google_oauth2:          'auth/google_oauth2'
              }
          };

          this._options = Object.assign(defaultOptions, options);

          this._tryLoadAuthData();
      }

      // Register request
      registerAccount(firstname: string, lastname: string, email: string, password: string, passwordConfirmation: string, retailer: number, role: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              first_name: firstname,
              last_name: lastname,
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
              retailer_id: retailer,
              role: role
          });

          return this.post(this._constructUserPath() + this._options.registerAccountPath, body);
      }

      // Delete Account
      deleteAccount(): Observable<Response> {
          return this.delete(this._constructUserPath() + this._options.deleteAccountPath);
      }

      // Sign in request and set storage
      signIn(email: string, password: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              email: email,
              password: password
          });

          let observ = this.post(this._constructUserPath() + this._options.signInPath, body);

          observ.subscribe(res => this._storeCurrentUserData(res.json().data), error => null);

          return observ;
      }

      signInOAuth(oAuthType: string) {

          let oAuthPath: string;
          oAuthPath = this._options.oAuthPaths[oAuthType]

          window.location.replace(this._constructApiPath() + oAuthPath);
      }

      // Sign out request and delete storage
      signOut(): Observable<Response> {
          let observ = this.delete(this._constructUserPath() + this._options.signOutPath);

          localStorage.clear();
          this._currentAuthData = null;
          this._currentUserType = null;
          this._currentUserData = null;

          return observ;
      }

      // Validate token request
      validateToken(): Observable<Response> {
          let observ = this.get(this._constructUserPath() + this._options.validateTokenPath);

          observ.subscribe(res => this._storeCurrentUserData(res.json().data), error => null);

          return observ;
      }

      // Update password request
      updatePassword(password: string, passwordConfirmation: string, currentPassword?: string, userType?: string): Observable<Response> {

          if (userType != null)
              this._currentUserType = this._getUserTypeByName(userType);

          let body: string;

          if (currentPassword == null) {
              body = JSON.stringify({
                  password: password,
                  password_confirmation: passwordConfirmation
              });
          } else {
              body = JSON.stringify({
                  current_password: currentPassword,
                  password: password,
                  password_confirmation: passwordConfirmation
              });
          }

          return this.put(this._constructUserPath() + this._options.updatePasswordPath, body);
      }

      // Reset password request
      resetPassword(email: string, userType?: string): Observable<Response> {

          if (userType == null)
              this._currentUserType = null;
          else
              this._currentUserType = this._getUserTypeByName(userType);

          let body = JSON.stringify({
              email: email,
              redirect_url: this._options.resetPasswordCallback
          });

          return this.post(this._constructUserPath() + this._options.resetPasswordPath, body);
      }

      // Standard HTTP requests
      get(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Get,
              url:    this._constructApiPath() + path
          }));
      }

      post(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Post,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      put(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Put,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      delete(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Delete,
              url:    this._constructApiPath() + path
          }));
      }

      patch(path: string, data: any): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Patch,
              url:    this._constructApiPath() + path,
              body:   data
          }));
      }

      head(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Head,
              url:    this._constructApiPath() + path
          }));
      }

      options(path: string): Observable<Response> {
          return this.sendHttpRequest(new RequestOptions({
              method: RequestMethod.Options,
              url:    this._constructApiPath() + path
          }));
      }

      // Construct and send Http request
      sendHttpRequest(requestOptions: RequestOptions): Observable<Response> {

          let headers: Headers;
          let baseRequestOptions: RequestOptions;
          let mergedRequestOptions: RequestOptions;

          // Set Headers
          if (this._currentAuthData != null)
              headers = new Headers({
                  'Content-Type': 'application/json', // ToDo: Add to RequestOptions if available
                  'Accept': 'application/json',
                  'Access-Token': this._currentAuthData.accessToken,
                  'Client': this._currentAuthData.client,
                  'Expiry': this._currentAuthData.expiry,
                  'Token-Type': this._currentAuthData.tokenType,
                  'Uid': this._currentAuthData.uid
                  // 'Content-Type': 'application/json', // ToDo: Add to RequestOptions if available
                  // 'Accept': 'application/json',
                  // 'access-token': this._currentAuthData.accessToken,
                  // 'client': this._currentAuthData.client,
                  // 'expiry': this._currentAuthData.expiry,
                  // 'token-type': this._currentAuthData.tokenType,
                  // 'uid': this._currentAuthData.uid
              });
          else
              headers = new Headers({
                  'Content-Type': 'application/json', // ToDo: Add to RequestOptions if available
                  'Accept': 'application/json'
              });

          // Construct Default Request Options
          baseRequestOptions = new RequestOptions({
              headers: headers
          })

          // Merge standard and custom RequestOptions
          mergedRequestOptions = baseRequestOptions.merge(requestOptions);

          let response = this.http.request(new Request(mergedRequestOptions)).share();

          this._handleResponse(response);

          return response;
      }

      public getCurrentUser() {
          this._currentUserData = JSON.parse(localStorage.getItem('currentUser'));

          return this._currentUserData;
      }

      public _storeCurrentUserData(userData) {
          this._currentUserData = userData;

          localStorage.setItem('currentUser', JSON.stringify(this._currentUserData));
      }


      // Check if response is complete and newer, then update storage
      public _handleResponse(response: Observable<Response>) {
          response.subscribe(res => {
              this._parseAuthHeadersFromResponse(<any>res);
          }, error => {
              this._parseAuthHeadersFromResponse(<any>error);
          });
      }

      public _parseAuthHeadersFromResponse(data: any){
          let headers = data.headers;

          let authData: AuthData = {
              accessToken:    headers.get('Access-Token'),
              client:         headers.get('Client'),
              expiry:         headers.get('Expiry'),
              tokenType:      headers.get('Token-Type'),
              uid:            headers.get('Uid')

              // accessToken:    headers.get('access-token'),
              // client:         headers.get('client'),
              // expiry:         headers.get('expiry'),
              // tokenType:      headers.get('token-type'),
              // uid:            headers.get('uid')
          };

          this._setAuthData(authData);
      }

      // Try to get auth data from storage.
      public _getAuthDataFromStorage() {

          let authData: AuthData = {
              accessToken:    localStorage.getItem('accessToken'),
              client:         localStorage.getItem('client'),
              expiry:         localStorage.getItem('expiry'),
              tokenType:      localStorage.getItem('tokenType'),
              uid:            localStorage.getItem('uid')
          };

          if (this._checkIfComplete(authData))
              this._currentAuthData = authData;
      }

      // Write auth data to storage
      public _setAuthData(authData: AuthData) {

          if (this._checkIfComplete(authData) && this._checkIfNewer(authData)) {

              this._currentAuthData = authData;

              localStorage.setItem('accessToken', authData.accessToken);
              localStorage.setItem('client', authData.client);
              localStorage.setItem('expiry', authData.expiry);
              localStorage.setItem('tokenType', authData.tokenType);
              localStorage.setItem('uid', authData.uid);

              if (this._currentUserType != null)
                  localStorage.setItem('userType', this._currentUserType.name);

          }
      }

      // Check if auth data complete
      public _checkIfComplete(authData: AuthData): boolean {
          if (
              authData.accessToken != null &&
              authData.client != null &&
              authData.expiry != null &&
              authData.tokenType != null &&
              authData.uid != null
          ) {
              return true;
          } else {
              return false;
          }
      }

      // Check if response token is newer
      public _checkIfNewer(authData: AuthData): boolean {
          if (this._currentAuthData != null)
              return authData.expiry >= this._currentAuthData.expiry;
          else
              return true;
      }

      public _parseAuthUrl(url) {
        if (url.get('auth_token')) {
        }
      }

      // Try to load user config from query params or storage
      public _tryLoadAuthData() {

          let queryParams: any = this.getJsonFromUrl(false);
          if (queryParams.auth_token) {
            let newAuthData: AuthData = {
                accessToken:    queryParams.auth_token,
                client:         queryParams.client_id,
                expiry:         queryParams.expiry,
                uid:            queryParams.uid,
                tokenType:      'Bearer'
            };
            console.log(newAuthData)
            this._setAuthData(newAuthData);
          }

          let userType = this._getUserTypeByName(localStorage.getItem('userType'));
          if (userType)
              this._currentUserType = userType;

          this._getAuthDataFromStorage();

          if (this._currentAuthData != null)
              this.validateToken();
      }

      // Match user config by user config name
      public _getUserTypeByName(name: string): UserType {
          if (name == null || this._options.userTypes == null)
              return null;

          return this._options.userTypes.find(
              userType => userType.name === name
          );
      }

      public _constructUserPath(): string {
          if (this._currentUserType == null)
              return '';
          else
              return this._currentUserType.path + '/';
      }

      public _constructApiPath(): string {
          if (this._options.apiPath == null)
              return '';
          else
              return this._options.apiPath + '/';
      }

      public getJsonFromUrl(hashBased) {
        var query;
        if(hashBased) {
          var pos = location.href.indexOf("?");
          if(pos==-1) return [];
          query = location.href.substr(pos+1);
        } else {
          query = location.search.substr(1);
        }
        var result = {};
        query.split("&").forEach(function(part) {
          if(!part) return;
          part = part.split("+").join(" "); // replace every + with space, regexp-free version
          var eq = part.indexOf("=");
          var key = eq>-1 ? part.substr(0,eq) : part;
          var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
          var from = key.indexOf("[");
          if(from==-1) result[decodeURIComponent(key)] = val;
          else {
            var to = key.indexOf("]");
            var index = decodeURIComponent(key.substring(from+1,to));
            key = decodeURIComponent(key.substring(0,from));
            if(!result[key]) result[key] = [];
            if(!index) result[key].push(val);
            else result[key][index] = val;
          }
        });
        return result;
      }
}
