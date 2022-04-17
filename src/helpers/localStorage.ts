const localStorage = window.localStorage;

export function saveDataLocal(key: string, value: string) {
  console.log("Key: " + key);
  console.log("Value:" + value);
  console.log("---------------");
  return localStorage.setItem(key, value);
}

export function getDataLocal(key: string): any {
  return localStorage.getItem(key);
}

export function removeItemDataLocal(key: string) {
  return localStorage.removeItem(key);
}

export function removeAllDataLocal() {
  return localStorage.clear();
}
