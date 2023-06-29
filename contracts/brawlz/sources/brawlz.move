module brawlz::brawlz {

    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};

    struct GameInfo has key, store {
        id: UID,
        hero1: ID,
        hero2: ID,
        isBot:u8,
        result:u8
    }

   struct Hero has key, store {
        id: UID,
        name:string::String,
        level: u64,
        experience: u64
    }

    struct Bot has key, store {
        id: UID,
        name:string::String,
        level: u64,
        experience: u64,
        game_id: ID,
    }

    struct Skin has key, store {
        id: UID,
        name: string::String,
        color: string
    }

    struct Weapon has key, store {
        id: UID,
        name: string::String,
        strenght:u64
    }

    //mint hero
    public entry fun mintHero(name:string::String, ctx: &mut TxContext){
        let hero=Hero{
            id:object::new(ctx),
            name,
            level:0,
            experience:0
        };
        transfer::transfer(hero,tx_context::sender(ctx));
    }
    
    public entry fun mintSkin(name:string::String,color:string::String,ctx:&mut TxContext){
        let skin=Skin{
            id:object::new(ctx),
            name,
            color
        }
    }
}