import { IGameDungeon } from "@/types/dungeon.types";
import { api } from "../api";
import { IChest, IChestAmount, IMysteryChest, IUser } from "@/types";

const GAME_URL = "game";
const CHEST_URL = "chest";
const USER_URL = "user";
const MYSTERY_CHEST_URL = "mystery-chest";

export const gameCheckApiServices = api.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<IGameDungeon[], void>({
      query: () => GAME_URL,
    }),

    getChest: builder.query<IChest[], string>({
      query: (auth0Sub) => `${CHEST_URL}/${auth0Sub}`,
      providesTags: (result) => {
        return [{ type: 'Chests', id: 'LIST' }]
      }
    }),

    getMysteryChest: builder.query<IMysteryChest[], string>({
      query: (auth0Sub) => `${MYSTERY_CHEST_URL}/${auth0Sub}`,
      providesTags: (result) => {
        return [{ type: 'Chests', id: 'LIST' }]
      }
    }),

    getAmountGroupByRarity: builder.query<IChestAmount[], string>({
      query: (auth0Sub) => `${CHEST_URL}/summary/${auth0Sub}`,
      providesTags: (result) => {
        return [{ type: 'Chests', id: 'LIST' }]
      }
    }),

    addSuiWallet: builder.mutation<
      IUser,
      { auth0Sub: string; suiWalletAddress: string }
    >({
      query(data) {
        return {
          url: `${USER_URL}/addSuiWallet/${data.auth0Sub}`,
          method: "POST",
          body: { walletAddress: data.suiWalletAddress },
        };
      },
    }),

    

    claimMysteryChest: builder.mutation<void, string>({
      query: (auth0Sub) => {
        return {
          url: `${MYSTERY_CHEST_URL}/claim/${auth0Sub}`,
          method: "POST",
          body: {},
        };
      },
    }),

    openChest: builder.mutation<{reward: string}, { auth0Sub: string; type: number; amount: number }>({
      query: (body) => {
        return {
          url: `${MYSTERY_CHEST_URL}/open`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Chests', id: 'LIST' }])
    }),

    
  }),
});

export const {
  useGetGamesQuery,
  useGetChestQuery,
  useAddSuiWalletMutation,
  useGetMysteryChestQuery,
  useClaimMysteryChestMutation,
  useOpenChestMutation,
  useGetAmountGroupByRarityQuery
} = gameCheckApiServices;
