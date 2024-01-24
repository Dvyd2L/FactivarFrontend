/**
 * Configuración del entorno de desarrollo.
 */
export const environment = {
  /**
   * URL de la API.
   */
  urlAPI: 'https://localhost:7230/',
  
  /**
   * Configuración del cliente de Google.
   */
  googleClient: {
    /**
     * ID del cliente de Google.
     */
    id: '1010715603937-euj34hajhc3hbhqeq42hvvp6nuk6jnr6.apps.googleusercontent.com',
  },
  
  /**
   * Configuración del cliente de Facebook.
   */
  facebookClient : {
    /**
     * ID del cliente de Facebook.
     */
    id: '928477878989848',
    
    /**
     * Clave secreta del cliente de Facebook.
     */
    secret: 'c1d499192517c4613ee9cecaef25a93a'
  },
  
  /**
   * Configuración del almacenamiento.
   */
  storage: {
    /**
     * Usuario del almacenamiento.
     */
    user: 'usuario',
  }
};
