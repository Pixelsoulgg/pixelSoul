import axiosInstance from ".";
import { SteamUser } from "@/types/steam.type";

export default class SteamApi {
  private USER_URL:string ="steam"; 

  async getPlayerGeneral(steamId: string): Promise<SteamUser> {
    return axiosInstance.get(`${this.USER_URL}/playerGeneral/${steamId}`);
  }

}