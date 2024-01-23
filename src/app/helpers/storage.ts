import { StorageKeyEnum } from "@app/interfaces/enums/storage.enum";

export class StorageHelper {

  public static setItem(key: StorageKeyEnum, value: any, useSessionStorage: boolean = true): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;

    storage.setItem(key, JSON.stringify(value));
  }

  public static getItem<T>(key: StorageKeyEnum, useSessionStorage: boolean = true): T | null {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    const item = storage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  public static removeItem(key: StorageKeyEnum, useSessionStorage: boolean = true): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;

    storage.removeItem(key);
  }

  public static clear(useSessionStorage: boolean = true): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;

    storage.clear();
  }
}