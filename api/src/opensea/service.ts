import { OPENSEA_API_KEY } from "../settings";
import { NTFCollection, NTFCollectionGeneral, Stats } from "./types";

const axios = require('axios');
const api_host = `https://api.opensea.io/api/v1`;

const axiosOptions = {
    headers: {
        accept: "application/json",
        "X-API-KEY":
            OPENSEA_API_KEY,
    },
};

export async function getNFTStats(slug: string): Promise<Stats> {
    let url = `${api_host}/collection/${slug}/stats`;
    const response = await axios.get(url, axiosOptions);
    const rs = <Stats>response.data.stats;
    return rs;
}

export async function getNFTCollections(wallet: string, limit = 300): Promise<NTFCollectionGeneral[]> {
    let url = `${api_host}/collections?asset_owner=${wallet}&offset=0&limit=${limit}`;

    const response = await axios.get(url, axiosOptions);
    const collections = <NTFCollectionGeneral[]>response.data;
    return collections;
}
