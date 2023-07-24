import { ISoulTagNft, ISuiNftItem } from "@/types/nft.type";
import { getSuiNetworkConnection, package_type, soultag_check_condition } from "@/utils/suis";
import {
  JsonRpcProvider,
  testnetConnection,
  devnetConnection,
} from "@mysten/sui.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSuiNFTAction = createAsyncThunk<ISuiNftItem[], string>(
  "sui/getSuiNFTAction",
  async (wallet) => {
    if (wallet) {
      const owner = wallet;
      const suiConnection = getSuiNetworkConnection();
      const provider = new JsonRpcProvider(suiConnection);
      const objects = await provider.getOwnedObjects({ owner });
      const ids = objects.data.map((p) => p.data?.objectId);
      const newIds: string[] = [];
      ids.forEach((p) => {
        if (p) {
          newIds.push(p);
        }
      });

      const txns = await provider.multiGetObjects({
        ids: newIds,
        options: {
          showType: true,
          showContent: true,
        },
      });

      const a = txns
        .filter((p) => p.data && p.data.type === package_type)
        .map((tx) => {
          //@ts-ignore
          const fields = tx.data?.content?.fields;
          const nft: ISuiNftItem = {
            name: fields.name,
            objectId: tx.data?.objectId || "",
            type: tx.data?.type || "",
            body: fields.body.fields.color,
            gun: fields.gun.fields.strenght,
            head: fields.head.fields.color,
            leg: fields.leg.fields.color,
            level: Number(fields.level),
            sword: fields.sword.fields.strenght,
            image: fields.image,
            experience: Number(fields.experience),
            winBot: Number(fields.winBot),
            winUser: Number(fields.winUser),
          };
          return nft;
        });
      return a;
    }
    return [];
  }
);

export const checkSoulTagAction = createAsyncThunk<ISoulTagNft | undefined, string>(
  "sui/checkSoulTagAction",
  async (owner) => {
    if (owner) {
      const suiConnection = getSuiNetworkConnection();
      const provider = new JsonRpcProvider(suiConnection);
      const objects = await provider.getOwnedObjects({ owner }); 
      const ids = objects.data.map((p) => p.data?.objectId);
      const newIds: string[] = [];
      ids.forEach((p) => {
        if (p) {
          newIds.push(p);
        }
      });
      const txns = await provider.multiGetObjects({
        ids: newIds,
        options: {
          showType: true,
          showContent: true,
        },
      });
      const nft = txns.find((p) => p.data && p.data.type === soultag_check_condition);
      if (!nft) return undefined;
      //@ts-ignore
      const fields = nft.data?.content?.fields;
      const soulTagNft: ISoulTagNft = {
        name: fields.name,
        objectId: fields.id.id,
        pfp: fields.pfp,
        reputation: Number(fields.reputation),
      }
      return soulTagNft;
    }
    return undefined;
  }
);
