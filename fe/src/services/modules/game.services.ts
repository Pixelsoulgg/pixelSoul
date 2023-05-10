import { IGameDungeon } from "@/types/dungeon.types";
import { api } from "../api";

const GAME_URL = "game"; 
export const gameApiServices = api.injectEndpoints({
  endpoints: builder => ({
    getGames: builder.query<IGameDungeon[], void>({
      query: () => GAME_URL
    })
  })
});

export const {useGetGamesQuery} = gameApiServices;