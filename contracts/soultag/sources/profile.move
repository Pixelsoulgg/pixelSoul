// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module soultag::profile {
    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use sui::event;
    use sui::object_table::{Self, ObjectTable};

    struct Profile has key{
        id:UID,
        soulTagOwner:address,
        soulTagId:ID,
        reputation:u64,
        quests:ObjectTable<ID,Quest>
    }

    struct Quest has key, store{
        id:UID,
        name: string::String,
        url:Url
    }

    struct OperatorCap has key,store{
        id:UID
    }

    struct ProfileCreated has copy,drop{
        profileId:ID,
        owner:address
    }

    struct ReputationIncreased has copy,drop{
        profileId:ID,
        newReputation:u64
    }

    #[allow(unused_function)]
    fun init(ctx: &mut TxContext) {
        transfer::transfer(OperatorCap {
            id: object::new(ctx)
        }, tx_context::sender(ctx));
    }

    public entry fun add_operator_cap(_:&OperatorCap,receipient:address,ctx:&mut TxContext){
        transfer::transfer(OperatorCap {
            id: object::new(ctx)
        }, receipient);
    }

    public entry fun createQuest(_:&OperatorCap, name:vector<u8>,url:vector<u8>,ctx:&mut TxContext){
        let quest=Quest{
            id:object::new(ctx),
            name:string::utf8(name),
            url:url::new_unsafe_from_bytes(url)
        };
        transfer::share_object(quest);
    }

    public entry fun createProfile(_:&OperatorCap,soulTagOwner:address,soulTagId:ID,reputation:u64,ctx:&mut TxContext){
        let id=object::new(ctx);
        let profileId=object::uid_to_inner(&id);
        let sender=tx_context::sender(ctx);
        let profile= Profile{
            id,
            soulTagOwner,
            soulTagId,
            reputation,
            quests:object_table::new(ctx)
        };
        transfer::transfer(profile,sender);
        event::emit(ProfileCreated{
            profileId,
            owner:sender
        });
    }

    public entry fun update_reputation(profile:&mut Profile,increase:u64,quest:&Quest, ctx:&mut TxContext){
        let newReputation=profile.reputation + increase;
        profile.reputation=profile.reputation + increase;
        let q=Quest{
            id:object::new(ctx),
            name:quest.name,
            url:quest.url
        };
        object_table::add(&mut profile.quests,object::id(&q),q);
        event::emit(ReputationIncreased{
            profileId:object::uid_to_inner(&profile.id),
            newReputation
        })
    }

}