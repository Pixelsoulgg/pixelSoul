module brawlz::brawlz {
    use std::option::{Self, Option};
    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};

    struct GameInfo has key, store {
        id: UID,
        hero1: ID,
        hero2: Option<ID>,
        isBot:u8,
        winner:Option<ID>,
    }

    struct Hero has key, store {
        id: UID,
        name:string::String,
        level: u64,
        experience: u64,
        head:Option<Head>,
        body:Option<Body>,
        leg:Option<Leg>
    }

    struct Bot has key, store {
        id: UID,
        name:string::String,
        strenght:u64
    }

    struct Head has key, store {
        id: UID,
        color: string::String
    }

    struct Body has key, store {
        id: UID,
        color: string::String
    }

    struct Leg has key, store {
        id: UID,
        color: string::String
    }

    struct Sword has key, store {
        id: UID,
        strenght:u64
    }

    struct Gun has key, store {
        id: UID,
        strenght:u64
    }

    struct AdminCap has key{id:UID}

    #[allow(unused_function)]
    fun init(ctx: &mut TxContext){
        transfer::transfer(AdminCap{
            id:object::new(ctx)
        },tx_context::sender(ctx));
    }
    //mint hero
    public entry fun mintHero(name:vector<u8>,head:vector<u8>,body:vector<u8>,leg:vector<u8>, ctx: &mut TxContext){
        let ohead=Head{
            id:object::new(ctx),
            color:string::utf8(head)
         };
         let obody=Body{
            id:object::new(ctx),
            color:string::utf8(body)
         };
         let oleg=Leg{
            id:object::new(ctx),
            color:string::utf8(leg)
         };
        let hero=Hero{
            id:object::new(ctx),
            name:string::utf8(name),
            level:0,
            experience:0,
            head:option::some(ohead),
            body:option::some(obody),
            leg:option::some(oleg),
        };
        transfer::transfer(hero,tx_context::sender(ctx));
    }
    
    public entry fun createGameWithBot(hero1:&Hero,ctx:&mut TxContext){
        let bot=Bot{
                id:object::new(ctx),
                strenght:100,
                name:string::utf8(b"bot"),
            };
        transfer::transfer(GameInfo{
            id:object::new(ctx),
            hero1:object::id(hero1),
            hero2:option::some(object::uid_to_inner(&bot.id)),
            isBot:1,
            winner:option::none()
        },tx_context::sender(ctx));
        transfer::transfer(bot,tx_context::sender(ctx));
    }

    public entry fun heroWin(game:&mut GameInfo,winner:&Hero){
        game.winner=option::some(object::id(winner))
    }

    public entry fun botWin(game:&mut GameInfo,winner:&Bot){
        game.winner=option::some(object::id(winner))
    }
}