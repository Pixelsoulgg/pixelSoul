import { OpenIDData } from "@/types";

export default class StorageHelpers {
  private  STEAM = 'STEAM';

  setAuth0Info() {

  }
  getAuth0Info() {}

  setSteamInfo(info: OpenIDData) {
    localStorage.setItem(this.STEAM, JSON.stringify(info))
  }
  getSteamInfo() {
    const str = localStorage.getItem(this.STEAM);
    return str ? JSON.parse(str) as OpenIDData : undefined;
  }

}