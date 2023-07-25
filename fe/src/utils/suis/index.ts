import {
  devnetConnection,
  mainnetConnection,
  testnetConnection,
} from "@mysten/sui.js";
import { getSuiNetworkEnv } from "../env.helpers";

const soultag_package_id =
  "0x8df27b06b9845229a14b190b36f84b4975bd46cc45cc5467f514c6f686efa101";
export const SOULTAG_CHECK_NAME = `0xacf0f6f9d20882dd35e6814c91c7899c1dbbbd832f90533ed865f1891884a2db`;
export const soultag_package = `${soultag_package_id}::soulTag::mint`;
export const soultag_check_condition = `${soultag_package_id}::soulTag::SoulTag`;

export const CHECK_NAME_OBJECT_ID =
  "0x7a2982a80f5dd142267cf36c940e3c2cf337806462ccc7c3efdb37e120632827";

export const coinType = `0x2505fc7fa0a7ea8b19e439e95b12b59e8762b15832c806de21f8b059f845775b::brawlz::mint_hero`;
export const package_type =
  "0x2505fc7fa0a7ea8b19e439e95b12b59e8762b15832c806de21f8b059f845775b::brawlz::Hero";
export const operator_address =
  "0x7589cb9fad93acf50fac1fb0add781f5418f76a37e2ebe76b0382761aa878bab";

// SOULTAG_PROFILE
export const SOULTAG_PROFILE =
  "0xc7ceda43defb0116f6a46be4b5f3d0fb1662f715b4d97805484a86c7faac5a8e";
export const SOUL_TAG_OWNER = '0xb54632b9447663b22318f99f4f4098113de8ad4526cb03661833a2ce7cbf741c';
export const SOUL_TAG_PROFILE_CONDITION = `${soultag_package_id}::profile::Profile`
//END SOULTAG_PROFILE

export const getSuiNetworkConnection = () => {
  const env = getSuiNetworkEnv();
  switch (env) {
    case "TEST":
      return testnetConnection;
    case "MAIN":
      return mainnetConnection;
    default:
      return devnetConnection;
  }
};
