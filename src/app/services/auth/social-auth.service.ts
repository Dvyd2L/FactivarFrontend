
/**
 * Servicio para autenticación social.
 */
import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../user.service';
import { IGoogleProfile } from '@app/interfaces/google-profile';
import { IUserPayload } from '@app/interfaces/user';
import { AuthService } from './auth.service';
import { GOOGLE_OAUTH_CONFIG } from 'src/config/tokens/oauth-conection.token';
import { RolesEnum } from '@app/interfaces/enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class SocialAuthService {
  /**
   * Configuración para autenticación con Google.
   */
  private googleConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: environment.googleClient.id,
    redirectUri: window.location.origin,
    scope: 'openid profile email',
  };

  /**
   * Configuración para autenticación con Facebook.
   */
  private facebookConfig: AuthConfig = {
    issuer: 'https://www.facebook.com/v18.0/dialog/oauth',
    redirectUri: window.location.origin,
    clientId: environment.facebookClient.id,
    dummyClientSecret: environment.facebookClient.secret,
    tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scope: 'public_profile,email',
    oidc: false,
    requireHttps: false,
  };

  constructor(
    private oauthService: OAuthService,
    private userService: UserService<IUserPayload>,
    // @Inject(GOOGLE_OAUTH_CONFIG) authConfig: AuthConfig,
  ) {
    this.initGoogleLogin();
  }

  /**
   * Inicia el flujo de inicio de sesión.
   */
  public login() {
    this.oauthService.initLoginFlow();

    const googleProfile = this.getProfile() as IGoogleProfile;

    this.userService.updateUser({
      Email: googleProfile.email,
      Role: RolesEnum.User,
      Thumbprint: googleProfile.picture,
      Sid: googleProfile.sub,
      Name: googleProfile.name,
      Surname: googleProfile.family_name,
      exp: googleProfile.exp,
      iss: googleProfile.iss,
      aud: googleProfile.aud,
      token: this.getIdToken(),
    });
  }

  /**
   * Cierra la sesión actual.
   */
  public logout() {
    this.oauthService.logOut();
    this.userService.clearUser();
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * @returns El perfil del usuario.
   */
  public getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  /**
   * Obtiene el token de identificación del usuario autenticado.
   * @returns El token de identificación.
   */
  public getIdToken() {
    return this.oauthService.getIdToken();
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns `true` si el usuario ha iniciado sesión, de lo contrario `false`.
   */
  public getIsLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  // Google

  /**
   * Inicializa la autenticación con Google.
   */
  public initGoogleLogin() {
    this.oauthService.configure(this.googleConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // Facebook

  /**
   * Inicializa la autenticación con Facebook.
   */
  public initFacebookLogin() {
    this.oauthService.configure(this.facebookConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
