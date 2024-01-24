import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../user.service';
import { IUserPayload } from '@app/interfaces/user';
import { OAUTH_CONFIG } from 'src/config/tokens/oauth-conection.token';
import { StorageHelper } from '@app/helpers/storage.helper';
import { StorageKeyEnum } from '@app/interfaces/enums/storage.enum';

/**
 * Servicio para autenticación social.
 */
@Injectable({
  providedIn: 'root',
})
export class SocialAuthService {
  private config = inject(OAUTH_CONFIG);
  private oauth = inject(OAuthService);
  private userService = inject(UserService<IUserPayload>);

  constructor() {
    this.initLogin(this.config);
  }
  /**
   * Inicia el flujo de inicio de sesión.
   */
  public login() {
    this.oauth.initLoginFlow();
    StorageHelper.setItem(StorageKeyEnum.Token, this.getIdToken());
  }
  /**
   * Cierra la sesión actual.
   */
  public logout() {
    this.oauth.logOut();
    this.userService.clearUser();
    StorageHelper.removeItem(StorageKeyEnum.Token);
  }
  /**
   * Obtiene el perfil del usuario autenticado.
   * @returns El perfil del usuario.
   */
  public getProfile() {
    return this.oauth.getIdentityClaims();
  }
  /**
   * Obtiene el token de identificación del usuario autenticado.
   * @returns El token de identificación.
   */
  public getIdToken() {
    return this.oauth.getIdToken();
  }
  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns `true` si el usuario ha iniciado sesión, de lo contrario `false`.
   */
  public getIsLoggedIn() {
    return this.oauth.hasValidAccessToken();
  }
  /**
   * Inicializa la autenticación
   * @param {AuthConfig} config configuración de auntenticación del servicio OAuth
   */
  private initLogin(config: AuthConfig) {
    this.oauth.configure(config);
    this.oauth.setupAutomaticSilentRefresh();
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }
}
