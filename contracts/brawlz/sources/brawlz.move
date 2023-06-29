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
        name:string,
        level: u64,
        experience: u64
    }

    struct Bot has key, store {
        id: UID,
        name:string,
        level: u64,
        experience: u64,
        game_id: ID,
    }

    struct Skin has key, store {
        id: UID,
        name: string,
        color: string
    }

    struct Weapon has key, store {
        id: UID,
        name: string,
        strenght:u64
    }

    //mint hero
    public entry fun mintHero(name:string, ctx: &mut TxContext){
        let hero=Hero{
            id:object::new(ctx),
            name,
            level:0,
            experience:0
        };
        transfer::transfer(hero,tx_context::sender(ctx));
    }
    
    public entry fun mintSkin(name:string,color:string,ctx:&mut TxContext){
        let skin=Skin{
            id:object::new(ctx),
            name,
            color
        }
    }
}