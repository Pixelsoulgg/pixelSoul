module brawlz::brawlz {

    use sui::object::{Self, UID,ID};
    use sui::transfer;
    use std::string;
    use sui::tx_context::{Self, TxContext};

    struct GameInfo has key, store {
        id: UID,
        name: string::String,
        pfp: string::String,
        reputation:u8,
        questID:ID
    }
}