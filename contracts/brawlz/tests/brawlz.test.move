// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

#[test_only]
module brawlz::brawlz_test {
    use sui::test_scenario as ts;
    use brawlz::brawlz::{Self,Hero,AdminCap,GameInfo};
    #[test]
    #[allow(unused_function)]
    fun mint_hero_start_update_game() {
        let addr1 = @0xA;
        let addr2 = @0xB;
        // create the NFT
        let scenario = ts::begin(addr1);
        {
            brawlz::testInit(ts::ctx(&mut scenario));
        };
        ts::next_tx(&mut scenario, addr1);
        {
            brawlz::mint_hero(b"hero 1", b"green",b"blue",b"red", ts::ctx(&mut scenario));
        };
        ts::next_tx(&mut scenario, addr2);
        {
            brawlz::mint_hero(b"hero 2", b"green",b"blue",b"red", ts::ctx(&mut scenario));
        };
        ts::next_tx(&mut scenario,addr1);
        {
            let hero = ts::take_from_sender<Hero>(&mut scenario);
            assert!(brawlz::level(&hero)==0,0);
            ts::return_to_sender(&mut scenario, hero);
        };
        ts::next_tx(&mut scenario,addr2);
        {
            let hero = ts::take_from_sender<Hero>(&mut scenario);
            assert!(brawlz::level(&hero)==0,0);
            ts::return_to_sender(&mut scenario, hero);
        };
        //create game
        ts::next_tx(&mut scenario,addr1);
        {
            let cap = ts::take_from_sender<AdminCap>(&mut scenario);
            let hero1 = ts::take_from_sender<Hero>(&mut scenario);
            let hero2 = ts::take_from_address<Hero>(&mut scenario,addr2);
            brawlz::create_game_with_hero(&cap,&hero1,&hero2,ts::ctx(&mut scenario));
            ts::return_to_sender(&mut scenario, hero1);
            ts::return_to_sender(&mut scenario, cap);
            ts::return_to_address(addr2, hero2);
        };
        ts::next_tx(&mut scenario,addr1);
        {
            let game = ts::take_from_sender<GameInfo>(&mut scenario);
            assert!(brawlz::game_status(&game)==1,1);
            ts::return_to_sender(&mut scenario, game);
        };
        ts::next_tx(&mut scenario,addr1);
        {
            let hero = ts::take_from_sender<Hero>(&mut scenario);
            let game = ts::take_from_sender<GameInfo>(&mut scenario);

            brawlz::hero_win(&mut game,&mut hero);
            ts::return_to_sender(&mut scenario, game);
            ts::return_to_sender(&mut scenario, hero);
        };
        ts::next_tx(&mut scenario,addr1);
        {
            let hero = ts::take_from_sender<Hero>(&mut scenario);
            assert!(brawlz::xp(&hero)==10,2);
            ts::return_to_sender(&mut scenario, hero);
        };
        ts::end(scenario);
    }
}