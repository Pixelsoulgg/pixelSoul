// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module soultag::soulTag {

    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::table::{Self,Table};

    struct SoulTag has key {
        id: UID,
        name: string::String,
        pfp: string::String
    }

    struct SoulTagCreated has copy,drop{
        soulTagId:ID,
        owner:address
    }

    struct SoulTagInfor has key,store{
        id:UID,
        names:Table<string::String,string::String>,
        owners:Table<address,ID>
    }

    #[allow(unused_function)]
    fun init(ctx: &mut TxContext) {
        let soulTagNames=SoulTagInfor{
            id:object::new(ctx),
            names:table::new(ctx),
            owners:table::new(ctx)
        };
        transfer::share_object(soulTagNames);
    }

    #[allow(unused_function)]
    public entry fun mint(name:vector<u8>,pfp:vector<u8>,soulTag_infor:&mut SoulTagInfor, ctx:&mut TxContext){
        let sender=tx_context::sender(ctx);
        assert!(!table::contains(&mut soulTag_infor.names,string::utf8(name)), 101);
        assert!(!table::contains(&mut soulTag_infor.owners,sender), 102);

        let id=object::new(ctx);
        let soulTagId=object::uid_to_inner(&id);

        let soulTag=SoulTag{
            id,
            name:string::utf8(name),
            pfp:string::utf8(pfp)
        };
        transfer::transfer(soulTag,sender);
        table::add(&mut soulTag_infor.names,string::utf8(name),string::utf8(name));
        table::add(&mut soulTag_infor.owners,sender,soulTagId);

        event::emit(SoulTagCreated{
            soulTagId,
            owner:sender
        });
    }

    #[allow(unused_function)]

    #[test_only]
    public fun testInit(ctx:&mut TxContext){
        init(ctx);
    }
}