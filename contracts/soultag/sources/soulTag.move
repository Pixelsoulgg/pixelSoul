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
    use sui::table::{Self,Table};


    struct SoulTag has key {
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

    struct SoulTagName has key,store{
        id:UID,
        names:Table<string::String,string::String>
    }

    #[allow(unused_function)]
    fun init(ctx: &mut TxContext) {
        transfer::transfer(AdminCap {
            id: object::new(ctx)
        }, tx_context::sender(ctx));

        let soulTagNames=SoulTagName{
            id:object::new(ctx),
            names:table::new(ctx)
        };

        transfer::share_object(soulTagNames);
    }

    #[allow(unused_function)]
    public entry fun mint(name:vector<u8>,pfp:vector<u8>,soulTag_name:&mut SoulTagName, ctx:&mut TxContext){
        let id=object::new(ctx);
        let soulTagId=object::uid_to_inner(&id);
        let sender=tx_context::sender(ctx);
        let soulTag=SoulTag{
            id,
            name:string::utf8(name),
            pfp:string::utf8(pfp),
            reputation:1,
            quests:object_table::new(ctx)
        };
        transfer::transfer(soulTag,sender);
        table::add(&mut soulTag_name.names,string::utf8(name),string::utf8(name));
        event::emit(SoulTagCreated{
            soulTagId,
            owner:sender
        });
    }
    public fun reputation(soulTag:&SoulTag):&u64{
        &soulTag.reputation
    }
    #[allow(unused_function)]
    public entry fun update(_:&AdminCap,soulTag:&mut SoulTag,increase:u64,quest:&Quest, ctx:&mut TxContext){
        let newReputation=soulTag.reputation+increase;
        soulTag.reputation=soulTag.reputation+increase;
        let q=Quest{
            id:object::new(ctx),
            name:quest.name,
            url:quest.url
        };
        object_table::add(&mut soulTag.quests,object::id(&q),q);
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