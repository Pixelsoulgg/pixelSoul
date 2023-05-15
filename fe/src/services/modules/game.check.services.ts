import { IGameDungeon } from "@/types/dungeon.types";
import { api } from "../api";
import { IChest, IUser } from "@/types";

const GAME_URL = "game"; 
const CHEST_URL = 'chest';
const USER_URL = 'user';


export const gameCheckApiServices = api.injectEndpoints({
  endpoints: builder => ({
    getGames: builder.query<IGameDungeon[], void>({
      query: () => GAME_URL
    }),

    getChest: builder.query<IChest[], string>({
      query: (auth0Sub) => `${CHEST_URL}/${auth0Sub}`
    }),

    addSuiWallet: builder.mutation<IUser, {auth0Sub: string, suiWalletAddress: string}>({
      query(data) {
        console.log({data})
        return {
            url: `${USER_URL}/addSuiWallet/${data.auth0Sub}`,
            method: 'POST',
            body: {walletAddress: data.suiWalletAddress}
        }
      },
    })
  })
});




export const {useGetGamesQuery, useGetChestQuery, useAddSuiWalletMutation} = gameCheckApiServices;