import { IGame, IUser } from "@/types";
import axiosInstance from ".";

export default class AppApi {
  private USER_URL:string ="user";
  private GAME_URL:string ="game";

  getUserById(){}

  async deleteUserById (id: string) {
    return axiosInstance.delete(`${this.USER_URL}/${id}`)
  }

  async createUser(user: IUser) {
    return axiosInstance.post(`${this.USER_URL}`, user);
  }

  async updateUser(id: string, user: Omit<IUser, "email">) {
    return axiosInstance.patch(`${this.USER_URL}/${id}`, user)
  }

  async getGames(): Promise<IGame[]> {
    return axiosInstance.get(this.GAME_URL);
  }

}