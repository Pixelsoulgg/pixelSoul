import axiosInstance from ".";
import { IChallenge, IDungeonCheckResponse, UserChallengeObject } from "@/types/dungeon.types";

export default class ChallengeApi {
  private USER_URL:string ="challenge"; 

  async getChallengesBySteamId(steamId: string): Promise<UserChallengeObject[]> {
    return axiosInstance.get(`${this.USER_URL}/${steamId}`);
  }

  async activeChallenge(steamId: string, challengeId: number): Promise<IChallenge> {
    return axiosInstance.patch(`${this.USER_URL}/active`, {steamId, challengeId});
  }

  async checkChallenge(steamId: string, challengeId: number): Promise<IDungeonCheckResponse> {
    return axiosInstance.post(`${this.USER_URL}/check`, {steamId, challengeId});
  }
}