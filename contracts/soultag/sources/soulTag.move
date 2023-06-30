// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module soultag::soulTag {

    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use sui::event;
    use sui::object_table::{Self, ObjectTable};

    struct SoulTag has key, store {
        id: UID,
        name: string::String,
        pfp: string::String,
        reputation:u64,
        quests:ObjectTable<ID,Quest>
    }

    struct Quest has key, store{
        id:UID,
        name: string::String,
        url:Url
    }

    struct AdminCap has key{
        id:UID
    }

    struct SoulTagCreated has copy,drop{
        soulTagId:ID,
        owner:address
    }

    struct ReputationIncreased has copy,drop{
        soulTagId:ID,
        newReputation:u64
    }

    #[allow(unused_function)]
    fun init(ctx: &mut TxContext) {
        transfer::transfer(AdminCap {
            id: object::new(ctx)
        }, tx_context::sender(ctx));
    }

    #[allow(unused_function)]
    public entry fun mint(_:&AdminCap, name:vector<u8>,pfp:vector<u8>,reputation:u64,receipient:address, ctx:&mut TxContext){
        let id=object::new(ctx);
        let soulTagId=object::uid_to_inner(&id);
        let soulTag=SoulTag{
            id,
            name:string::utf8(name),
            pfp:string::utf8(pfp),
            reputation,
            quests:object_table::new(ctx)
        };
        transfer::transfer(soulTag,receipient);
        event::emit(SoulTagCreated{
            soulTagId,
            owner:receipient
        });
    }
    public fun reputation(soulTag:&SoulTag):&u64{
        &soulTag.reputation
    }
    #[allow(unused_function)]
    public entry fun update(soulTag:&mut SoulTag,increase:u64,quest: Quest, _:&mut TxContext){
        let newReputation=soulTag.reputation+increase;
        soulTag.reputation=soulTag.reputation+increase;
        object_table::add(&mut soulTag.quests,object::id(&quest),quest);
        event::emit(ReputationIncreased{
            soulTagId:object::uid_to_inner(&soulTag.id),
            newReputation
        })
    }

    public fun createQuest(name:vector<u8>,url:vector<u8>,ctx:&mut TxContext){
        let quest=Quest{
            id:object::new(ctx),
            name:string::utf8(name),
            url:url::new_unsafe_from_bytes(url)
        };
        transfer::share_object(quest);
    }

    #[test_only]
    public fun testInit(ctx:&mut TxContext){
        init(ctx);
    }
    
}