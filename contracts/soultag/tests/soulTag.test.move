// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

#[test_only]
module soultag::soulTagTest {
    use sui::test_scenario as ts;
    use soultag::soulTag::{Self,SoulTag,Quest,AdminCap};
    #[test]
    #[allow(unused_function)]
    fun mint_update() {
        let addr1 = @0xA;
        // create the NFT
        let scenario = ts::begin(addr1);
        {
            soulTag::testInit(ts::ctx(&mut scenario));
            let cap=ts::take_from_sender<AdminCap>(&mut scenario);
            soulTag::mint(&cap, b"name test", b"pft test",10, addr1, ts::ctx(&mut scenario));
            ts::return_to_sender(&mut scenario,cap);
        };
        // update its reputation
        ts::next_tx(&mut scenario, addr1);
        {
            let ntft = ts::take_from_sender<SoulTag>(&mut scenario);
            soulTag::createQuest(b"test quest",b"https://123",ts::ctx(&mut scenario));
            let quest=ts::take_from_sender<Quest>(&mut scenario);
            soulTag::update(&mut ntft,10,quest,ts::ctx(&mut scenario)) ;
            assert!(soulTag::reputation(&ntft)== &20, 0);
            ts::return_to_sender(&mut scenario, ntft);
        };
        ts::end(scenario);
    }
}