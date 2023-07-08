## This document describe the currunt functions of soultag smart contract on SUI (WIP)

+ Structs

```
struct SoulTag has key, store {
        id: UID,
        name: string::String,
        pfp: string::String,
        reputation:u64,
        quests:ObjectTable<ID,Quest>
    }
```
id: This field represents the unique identifier of the SoulTag , which is a unique value assigned to each SoulTag instance.

name: This field holds the name associated with the SoulTag and is of type string::String. 

pfp: This field represents the profile picture associated with the SoulTag and is also of type string::String. It represents the path or reference to the image file used as the profile picture.

reputation: This field holds an unsigned 64-bit integer (u64) representing the reputation of the SoulTag. The reputation value is used to gauge the credibility or standing of the SoulTag within a system or community.

quests: This field is of type ObjectTable<ID, Quest>, where ID is likely another type representing unique identifiers for quests, and Quest represents the type of objects stored in the ObjectTable.

```
struct Quest has key, store{
        id:UID,
        name: string::String,
        url:Url
    }
```
id: This field represents the unique identifier of the Quest and is of type UID. 

name: This field holds the name of the Quest and is of type string::String. 

url: This field represents the URL associated with the Quest and is of type Url. It is used to store the web location or reference related to the quest, allowing users to access additional information or resources associated with the quest through the provided URL.

+ Events

```
struct SoulTagCreated has copy,drop{
        soulTagId:ID,
        owner:address
    }

```
This event is emmit when we create a new Soultag


```
  struct ReputationIncreased has copy,drop{
        soulTagId:ID,
        newReputation:u64
    }
```
This event is emit when we update the reputation of a soultag

+ Functions
```
 public entry fun update(soulTag:&mut SoulTag,increase:u64,quest:&Quest, ctx:&mut TxContext){
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
```
We call this function to update the SoulTag and the correspondent quest (why we update)

```
  public fun createQuest(name:vector<u8>,url:vector<u8>,ctx:&mut TxContext){
        let quest=Quest{
            id:object::new(ctx),
            name:string::utf8(name),
            url:url::new_unsafe_from_bytes(url)
        };
        transfer::share_object(quest);
    }
```
We call this function to create a quest, We will need this quest to update the reputation of the soultag