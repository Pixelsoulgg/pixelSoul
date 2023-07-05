module brawlz::brawlz {
    use std::option::{Self, Option};
    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};

    struct GameInfo has key, store {
        id: UID,
        hero1: ID,
        status:u8,
        isBot:u8,
        hero2: Option<ID>,
        winner:Option<ID>,
    }

    struct Hero has key, store {
        id: UID,
        name:string::String,
        image:string::String,
        level: u64,
        experience: u64,
        head:Option<Head>,
        body:Option<Body>,
        leg:Option<Leg>,
        sword:Option<Sword>,
        gun:Option<Gun>
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

    public fun create_head(color:vector<u8>,ctx:&mut TxContext):Head{
        Head{
            id:object::new(ctx),
            color:string::utf8(color)
        }
    }

    public fun create_body(color:vector<u8>,ctx:&mut TxContext):Body{
        Body{
            id:object::new(ctx),
            color:string::utf8(color)
        }
    }

    public fun create_leg(color:vector<u8>,ctx:&mut TxContext):Leg{
        Leg{
            id:object::new(ctx),
            color:string::utf8(color)
        }
    }

    public fun create_sword(strenght:u64,ctx:&mut TxContext):Sword{
        Sword{
            id:object::new(ctx),
            strenght
        }
    }

    public fun create_gun(strenght:u64,ctx:&mut TxContext):Gun{
        Gun{
            id:object::new(ctx),
            strenght
        }
    }

    public fun equip_head(hero: &mut Hero, new_head: Head): Option<Head> {
        option::swap_or_fill(&mut hero.head, new_head)
    }

    public fun equip_body(hero: &mut Hero, new_body: Body): Option<Body> {
        option::swap_or_fill(&mut hero.body, new_body)
    }

    public fun equip_leg(hero: &mut Hero, new_leg: Leg): Option<Leg> {
        option::swap_or_fill(&mut hero.leg, new_leg)
    }

    public fun equip_sword(hero: &mut Hero, new_sword: Sword): Option<Sword> {
        option::swap_or_fill(&mut hero.sword, new_sword)
    }

    public fun equip_gun(hero: &mut Hero, new_gun: Gun): Option<Gun> {
        option::swap_or_fill(&mut hero.gun, new_gun)
    }

    public fun level(hero:&Hero):u64{
        hero.level
    }

    public fun xp(hero:&Hero):u64{
        hero.experience
    }

    public fun game_status(game:&GameInfo):u8{
        game.status
    }

    public entry fun mint_hero(name:vector<u8>,head:vector<u8>,body:vector<u8>,leg:vector<u8>,image:vector<u8>, ctx: &mut TxContext){
        let ohead=create_head(head,ctx);
        let obody=create_body(body,ctx);
        let oleg=create_leg(leg,ctx);
        let osword=create_sword(100,ctx);
        let ogun=create_gun(200,ctx);
        let hero=Hero{
            id:object::new(ctx),
            name:string::utf8(name),
            image:string::utf8(image),
            level:0,
            experience:0,
            head:option::some(ohead),
            body:option::some(obody),
            leg:option::some(oleg),
            sword:option::some(osword),
            gun:option::some(ogun)
        };
        transfer::transfer(hero,tx_context::sender(ctx));
    }
    
    public entry fun create_game_with_bot(_:&AdminCap,hero1:&Hero,ctx:&mut TxContext){
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
            status:1,
            winner:option::none()
        },tx_context::sender(ctx));
        transfer::transfer(bot,tx_context::sender(ctx));
    }

    public entry fun create_game_with_hero(_:&AdminCap, hero1:&Hero,hero2:&Hero,ctx:&mut TxContext){
        transfer::transfer(GameInfo{
            id:object::new(ctx),
            hero1:object::id(hero1),
            hero2:option::some(object::id(hero2)),
            isBot:0,
            status:1,
            winner:option::none()
        },tx_context::sender(ctx));
    }

    public entry fun hero_win(game:&mut GameInfo,winner:&mut Hero){
        let xp=1;
        if(game.isBot==0)
            xp=10;
        let new_xp=winner.experience + xp;
        winner.experience=new_xp;
        let c_level=winner.level;
        let n_level=new_xp/50;
        if(n_level > c_level)
            winner.level=n_level;
        game.winner=option::some(object::id(winner));
    }

    public entry fun bot_win(game:&mut GameInfo,winner:&Bot){
        game.winner=option::some(object::id(winner));
    }
    #[test_only]
    public fun testInit(ctx:&mut TxContext){
        init(ctx);
    }

}