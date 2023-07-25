// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

#[test_only]
module soultag::soulTagTest {
    use sui::test_scenario as ts;
    use soultag::soulTag::{Self,SoulTagInfor};
    #[test]
    #[allow(unused_function)]
    fun mint() {
        let addr1 = @0xA;
        // create the NFT
        let scenario = ts::begin(addr1);
        {
            soulTag::testInit(ts::ctx(&mut scenario));
            
        };
        ts::next_tx(&mut scenario, addr1);
        {
            let cap=ts::take_shared<SoulTagInfor>(&mut scenario);
            soulTag::mint( b"name test", b"pft test",&mut cap, ts::ctx(&mut scenario));
            ts::return_shared(cap);
        };
        ts::end(scenario);
    }
}