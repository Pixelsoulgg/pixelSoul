export const NUMBER_PATTERN = "/^[0-9]*.?[0-9]*$/";
export const IPT_PRICE = 0.2;

export const user = {
  name: "vien test",
  picture:
    "https://lh3.googleusercontent.com/a/AGNmyxa0lKiJqqHry_ETr6c8270j3vYbyYo2C9xdCIFzl34=s96-c",
  email: "test@gmail.com",
};

export const fonts = {
  // Inter: "Inter",
  // Lexend: "Lexend",
  Inter: "VT323",
  Lexend: "VT323",
  VT323: "VT323",
  Silkscreen: "Silkscreen",
  QuinqueFive: "QuinqueFive",
};

export const layouts = {
  title: "pixelSoul",
};

export const CHOOSE_BEST = [0.05, 0.1, 0.25, 0.5, 0.75, 1, 2, 3];

export const SBTs_And_Collectibles = {
  header: [
    { label: "Name", width: "60%" },
    { label: "Value" },
    { label: "Source", description: "v" },
  ],
  data: [
    {
      img: "file.svg",
      name: "Spotify",
      kb: 200,
      amount: 18.99,
      type: "Subscriptions",
    },
    { img: "img.svg", name: "A Coffee", kb: 200, amount: 4.5, type: "Dining" },
    {
      img: "img.svg",
      name: "Rosso Antico",
      kb: 200,
      amount: 4.5,
      type: "UnCategorized",
    },
  ],
};

export const Bundles_And_Packages = {
  header: [
    { label: "Merchant", width: "60%" },
    { label: "Amount" },
    { label: "Floor", description: "Floor price" },
  ],
  data: [
    {
      img: "file.svg",
      name: "Spotify",
      kb: 200,
      amount: 18.99,
      type: "Subscriptions",
    },
    { img: "img.svg", name: "A Coffee", kb: 200, amount: 4.5, type: "Dining" },
    {
      img: "img.svg",
      name: "Rosso Antico",
      kb: 200,
      amount: 4.5,
      type: "UnCategorized",
    },
  ],
};

export const NFTsData = {
  header: [
    { label: "Name", width: "50%" },
    { label: "Rarity", with: "30%" },
    { label: "Description", width: "20%" },
  ],
  data: [
    {
      name: "Steam Card Level 1",
      kb: 200,
      amount: 18.99,
      type: "Subscriptions",
    },
    { name: "Steam Card Level 1", kb: 200, amount: 4.5, type: "Dining" },
    {
      name: "Steam Card Level 1",
      kb: 200,
      amount: 4.5,
      type: "UnCategorized",
    },
  ],
};

export const MyCollectiblesData = {
  header: [
    { label: "Name", width: "60%" },
    { label: "SoulScore Value" },
    { label: "Source", width: "10%" },
  ],
  data: [
    {
      name: "Steam Card Level 1",
      kb: 200,
      amount: 18.99,
      type: "Subscriptions",
    },
    { name: "Steam Card Level 1", kb: 200, amount: 4.5, type: "Dining" },
    {
      name: "Steam Card Level 1",
      kb: 200,
      amount: 4.5,
      type: "UnCategorized",
    },
  ],
};

export const footer_menu = [
  { title: "General", menus: [
    { name: "Home", href: "#" },
    { name: "Team", href: "#" },
    { name: "Job", href: "#" },
    { name: "Docs", href: "#" },
    { name: "Blog", href: "#" },
  ] },
  { title: "Resources", menus: [
    { name: "Partnership", href: "#" },
    { name: "Brand guilde", href: "#" },
  ] },
  { title: "Trust & Legal", menus: [
    { name: "Privacy policy", href: "#" },
    { name: "Team of service", href: "#" },
  ] },
];


export const ReferralData = [
  {
    value: 1,
    label: 5,
    logo: 1,
    child: [
      {lable: 1, icon: 1}
    ]
  },
  {
    value: 1,
    label: 10,
    logo: 1,
    child: [
      {lable: 5, icon: 1},
      {lable: 1, icon: 2},
    ]
  },
  {
    value: 1,
    label: 15,
    logo: 1,
    child: [
      {lable: 10, icon: 1},
      {lable: 1, icon: 2},
    ]
  },

  {
    value: 2,
    label: 20,
    logo: 2,
    child: [
      {lable: 20, icon: 1},
      {lable: 1, icon: 2},
      {lable: 1, icon: 3},
      {lable: 1, icon: 4},
    ]
  },

  {
    value: 2,
    label: 25,
    logo: 2,
    child: [
      {lable: 25, icon: 1},
      {lable: 1, icon: 2},      
      {lable: 1, icon: 4},
      {lable: 1, icon: 5},
    ]
  },

  {
    value: 2,
    label: 30,
    logo: 2,
    child: [
      {lable: 30, icon: 1},
      {lable: 2, icon: 4},
      {lable: 1, icon: 6},
    ]
  },

  {
    value: 3,
    label: 31,
    logo: 3,    
  },
]

export const GameHubs = [
  {
    name: 'Brawlhalla',
    id: 5
  },
  {
    name: 'Grand Theft Auto 5',
    id: 1
  },
  {
    name: 'Team Fortress 2',
    id: 2
  },
  {
    name: 'Pay Day 2',
    id: 3
  },
  {
    name: 'Counter Strike',
    id: 4
  },
]

export const GameHubGamesData = [
  {
    name: 'Grand Theft Auto 5',
    id: 1,
    type: 'action',
  },
  {
    name: 'Left 4 Dead',
    id: 2,
    type: 'action',
  },
  {
    name: 'Grand Theft Auto 5',
    id: 3,
    type: 'action',
  },
  {
    name: 'Terraria',
    id: 4,
    type: 'action',
  },
]

//[hat, body, leg]
//hat: 1,2,3,4,5,6,7,8
//body: red, blue, green, orange, brown, black
//leg: red, blue, green, orange, brown, black
export const character_nft_data = {
  1: [5, 'red', 'red'],
  2: [1, 'green', 'brow'],
  3: [4, 'orange', 'orange'],
  4: [5, 'brown', 'brown'],
  5: [5, 'green', 'green'],
}
