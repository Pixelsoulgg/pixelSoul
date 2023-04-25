import { IGameDungeon } from "@/types/dungeon.types";
import axiosInstance from ".";

export default class GameApi {
  private USER_URL:string ="game"; 

  async getGames(): Promise<IGameDungeon[]> {
    return axiosInstance.get(`${this.USER_URL}`);
  }

}