import { IGameDungeon } from "@/types/dungeon.types";
import { api } from "../api";
import { IChest, IMysteryChest, IUser } from "@/types";

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

    getMysteryChest: builder.query<IMysteryChest[], string>({
      query: (auth0Sub) => `${MYSTERY_CHEST_URL}/${auth0Sub}`,
    }),

    claimMysteryChest: builder.mutation<void, string>({
      query: (auth0Sub) => {
        return {
          url: `${MYSTERY_CHEST_URL}/claim/${auth0Sub}`,
          method: "POST",
          body: {}
        };
      },
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetChestQuery,
  useAddSuiWalletMutation,
  useGetMysteryChestQuery,
  useClaimMysteryChestMutation,
} = gameCheckApiServices;
