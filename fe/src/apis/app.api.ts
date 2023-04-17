import { IGame, IUser } from "@/types";
import axiosInstance from ".";
import { NFT, NFTResponse } from "@/types/nft.type";

export default class AppApi {
  private USER_URL:string ="user";
  private GAME_URL:string ="game";
  private NFT_URL = "nft";


  async getNfts(address: string): Promise<NFTResponse> {
   return axiosInstance.get(`${this.NFT_URL}/${address}`);  
  }

  async deleteUserById (id: string) {
    return axiosInstance.delete(`${this.USER_URL}/${id}`)
  }

  async createUser(user: IUser): Promise<IUser> {
    return axiosInstance.post(`${this.USER_URL}`, user);
  }

  async updateUser(id: string, user: Omit<IUser, "email">) {
    return axiosInstance.patch(`${this.USER_URL}/${id}`, user);
  }

  async getUserById(id: string): Promise<IUser> {
    return axiosInstance.get(`${this.USER_URL}/${id}`);
  }

  async addSteamInfo(userId: string, steamId: string) {
    return axiosInstance.post(`${this.USER_URL}/addSteamId/${userId}`, {steamId});
  }
  
  async addWallet(userId: string, walletAddress: string):Promise<IUser> {
    return axiosInstance.post(`${this.USER_URL}/addWallet/${userId}`, {walletAddress});
  }

  //Games
  async getGames(): Promise<IGame[]> {
    return axiosInstance.get(this.GAME_URL);
  }

}