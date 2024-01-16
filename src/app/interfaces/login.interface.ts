export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  usuario: string;
  token: string;
}

export interface IRegister {
  nombre: string;
  apellidos: string;
  telefono?: number | string;
  email: string;
  password: string;
}
