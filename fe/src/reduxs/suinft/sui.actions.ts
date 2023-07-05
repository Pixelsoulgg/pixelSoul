import { ISuiNftItem } from "@/types/nft.type";
import { package_type } from "@/utils/suis";
import { JsonRpcProvider, testnetConnection } from "@mysten/sui.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSuiNFTAction = createAsyncThunk<ISuiNftItem[], string>(
  "sui/getSuiNFTAction",
  async (wallet) => {
    if (wallet) {
      const owner = wallet;
      const provider = new JsonRpcProvider(testnetConnection);
      const objects = await provider.getOwnedObjects({ owner });
      const ids = objects.data.map((p) => p.data?.objectId);
      const newIds: string[] = [];
      ids.forEach(p => {
        if (p) {newIds.push(p)}
      })
      const txns = await provider.multiGetObjects({
        ids: newIds,
        options: {
          showType: true,
          showContent: true,
        },
      });
      
     const a= txns.filter((p) => p.data && p.data.type === package_type).map((tx) => {
      console.log({tx})
      //@ts-ignore
      const fields = tx.data?.content?.fields; 
      const nft: ISuiNftItem = {
        name: fields.name,
        objectId: tx.data?.objectId || '',
        type: tx.data?.type || '',
        body: fields.body.fields.color,
        gun: fields.gun.fields.strenght,
        head: fields.head.fields.color,
        leg: fields.leg.fields.color,
        level: Number(fields.level),
        sword: fields.sword.fields.strenght,
        image: fields.image
      };
        return nft;
      })
     return a;    
    }
    return [];
  }
);
