import CookiesClient from "js-cookie";

export function saveData(key: string, value: any, expired?: number) {
  return CookiesClient.set(key, value, { expires: expired });
}

export function getData(key: string): string {
  return CookiesClient.get(key)!;
}

export function removeData(key: string) {
  CookiesClient.remove(key);
  return true;
}

export function removeMultiData(listKey: string[]) {
  for (let i = 0; i <= listKey.length; i++) {
    removeData(listKey[i]);
  }
}

export function removeAll() {
  Object.keys(CookiesClient.get()).forEach(function (cookie) {
    CookiesClient.remove(cookie);
  });
  return true;
}

export default CookiesClient;
