export interface MediaItem {
  id: string;
  title: string;
  url: string;
  image?: string; // Will be added later
}

export interface MediaCategory {
  id: string;
  name: string;
  icon: string;
  items: MediaItem[];
}

export const favoriteMedia: MediaCategory[] = [
  {
    id: 'video-games',
    name: 'Video Games',
    icon: '🎮',
    items: [
      { id: 'hollow-knight', title: 'Hollow Knight', url: 'https://www.metacritic.com/game/hollow-knight/' },
      { id: 'fata-morgana', title: 'The House in Fata Morgana', url: 'https://www.metacritic.com/game/the-house-in-fata-morgana-dreams-of-the-revenants/' },
      { id: 'persona-5-royal', title: 'Persona 5 Royal', url: 'https://www.metacritic.com/game/persona-5-royal/' },
      { id: 'red-dead-2', title: 'Red Dead Redemption 2', url: 'https://www.metacritic.com/game/red-dead-redemption-2/' },
      { id: 'sekiro', title: 'Sekiro', url: 'https://www.metacritic.com/game/sekiro-shadows-die-twice/' },
      { id: 'dark-souls-3', title: 'Dark Souls 3', url: 'https://www.metacritic.com/game/dark-souls-iii/' },
      { id: 'outer-wilds', title: 'Outer Wilds', url: 'https://www.metacritic.com/game/outer-wilds/' },
      { id: 'disco-elysium', title: 'Disco Elysium', url: 'https://www.metacritic.com/game/disco-elysium/' },
      { id: 'breath-of-wild', title: 'Breath of the Wild', url: 'https://www.metacritic.com/game/the-legend-of-zelda-breath-of-the-wild/' },
      { id: 'silent-hill-2', title: 'Silent Hill 2', url: 'https://www.metacritic.com/game/silent-hill-2-restless-dreams/' },
      { id: 'elden-ring', title: 'Elden Ring', url: 'https://www.metacritic.com/game/elden-ring/' },
      { id: 'persona-4-royal', title: 'Persona 4 Royal', url: 'https://www.metacritic.com/game/persona-4-golden/' },
      { id: 'ff7-remake', title: 'Final Fantasy 7 Remake', url: 'https://www.metacritic.com/game/final-fantasy-vii-remake/' },
      { id: 'pokemon-white', title: 'Pokemon White', url: 'https://www.metacritic.com/game/pokemon-white-version/' },
      { id: 'chrono-cross', title: 'Chrono Cross', url: 'https://www.metacritic.com/game/chrono-cross/' },
      { id: 'devil-may-cry', title: 'Devil May Cry', url: 'https://www.metacritic.com/game/devil-may-cry/' },
      { id: 'hades', title: 'Hades', url: 'https://www.metacritic.com/game/hades/' },
      { id: 'celeste', title: 'Celeste', url: 'https://www.metacritic.com/game/celeste/' },
      { id: 'nier-automata', title: 'Nier Automata', url: 'https://www.metacritic.com/game/nier-automata/' },
      { id: 'yakuza-0', title: 'Yakuza 0', url: 'https://www.metacritic.com/game/yakuza-0/' },
      { id: 'pokemon-soul-silver', title: 'Pokemon Soul Silver', url: 'https://www.metacritic.com/game/pokemon-soulsilver-version/' },
      { id: 'max-payne', title: 'Max Payne', url: 'https://www.metacritic.com/game/max-payne/' },
      { id: 'undertale', title: 'Undertale', url: 'https://www.metacritic.com/game/undertale/' },
      { id: 'kingdom-hearts-2', title: 'Kingdom Hearts 2', url: 'https://www.metacritic.com/game/kingdom-hearts-ii/' },
      { id: 'armored-core-6', title: 'Armored Core 6', url: 'https://www.metacritic.com/game/armored-core-vi-fires-of-rubicon/' }
    ]
  },
  {
    id: 'cinema',
    name: 'Cinema',
    icon: '🎬',
    items: [
      { id: 'come-and-see', title: 'Come and See', url: 'https://letterboxd.com/film/come-and-see/' },
      { id: 'ran', title: 'Ran', url: 'https://letterboxd.com/film/ran/' },
      { id: 'end-of-evangelion', title: 'End of Evangelion', url: 'https://letterboxd.com/film/neon-genesis-evangelion-the-end-of-evangelion/' },
      { id: 'handmaiden', title: 'The Handmaiden', url: 'https://letterboxd.com/film/the-handmaiden/' },
      { id: 'love-exposure', title: 'Love Exposure', url: 'https://letterboxd.com/film/love-exposure/' },
      { id: 'swing-girls', title: 'Swing Girls', url: 'https://letterboxd.com/film/swing-girls/' },
      { id: 'before-sunset', title: 'Before Sunset', url: 'https://letterboxd.com/film/before-sunset/' },
      { id: 'perfect-days', title: 'Perfect Days', url: 'https://letterboxd.com/thomasflight/film/perfect-days-2023/' },
      { id: 'fallen-angels', title: 'Fallen Angels', url: 'https://letterboxd.com/film/fallen-angels/' },
      { id: '2001-space-odyssey', title: '2001: A Space Odyssey', url: 'https://letterboxd.com/film/2001-a-space-odyssey/' },
      { id: 'bride-rip-van-winkle', title: 'A Bride for Rip Van Winkle', url: 'https://letterboxd.com/film/a-bride-for-rip-van-winkle/' },
      { id: 'lily-chou-chou', title: 'All About Lily Chou Chou', url: 'https://letterboxd.com/film/all-about-lily-chou-chou/' },
      { id: 'urusei-yatsura', title: 'Urusei Yatsura Beautiful Dreamer', url: 'https://embed.letterboxd.com/film/urusei-yatsura-beautiful-dreamer/' },
      { id: 'patlabor-2', title: 'Patlabor 2', url: 'https://letterboxd.com/film/patlabor-2-the-movie/' },
      { id: 'kizumonogatari', title: 'Kizumonogatari', url: 'https://letterboxd.com/fantic/list/kizumonogatari/' },
      { id: 'one-piece-baron', title: 'One Piece Baron Omatsuri', url: 'https://letterboxd.com/film/one-piece-baron-omatsuri-and-the-secret-island/' },
      { id: 'mind-game', title: 'Mind Game', url: 'https://letterboxd.com/film/mind-game/' },
      { id: 'drive-my-car', title: 'Drive My Car', url: 'https://letterboxd.com/film/drive-my-car/' },
      { id: 'moonlight-whispers', title: 'Moonlight Whispers', url: 'https://letterboxd.com/film/moonlight-whispers/' },
      { id: 'linda-linda-linda', title: 'Linda Linda Linda', url: 'https://letterboxd.com/film/linda-linda-linda/' },
      { id: 'our-little-sister', title: 'Our Little Sister', url: 'https://letterboxd.com/film/our-little-sister/' },
      { id: 'udaan', title: 'Udaan', url: 'https://letterboxd.com/film/udaan/' },
      { id: 'swades', title: 'Swades', url: 'https://letterboxd.com/film/swades/' },
      { id: 'threads', title: 'Threads', url: 'https://letterboxd.com/film/threads-our-tapestry-of-love/' },
      { id: '3-iron', title: '3-Iron', url: 'https://letterboxd.com/film/3-iron/' }
    ]
  },
  {
    id: 'anime-manga',
    name: 'Anime/Manga',
    icon: '📚',
    items: [
      { id: 'one-piece', title: 'One Piece', url: 'https://myanimelist.net/anime/21/One_Piece?cat=anime' },
      { id: 'gintama', title: 'Gintama', url: 'https://myanimelist.net/anime/918/Gintama' },
      { id: 'march-comes-lion', title: 'March Comes in Like a Lion', url: 'https://myanimelist.net/anime/31646/3-gatsu_no_Lion' },
      { id: 'owarimonogatari', title: 'Owarimonogatari', url: 'https://myanimelist.net/anime/31181/Owarimonogatari' },
      { id: 'steins-gate', title: 'Steins Gate', url: 'https://myanimelist.net/anime/9253/Steins_Gate' },
      { id: 'aria-animation', title: 'Aria the Animation', url: 'https://myanimelist.net/anime/477/Aria_the_Animation' },
      { id: 'heike-monogatari', title: 'Heike Monogatari', url: 'https://myanimelist.net/anime/49738/Heike_Monogatari' },
      { id: 'space-dandy', title: 'Space Dandy', url: 'https://myanimelist.net/anime/20057/Space%E2%98%86Dandy' },
      { id: 'evangelion', title: 'Neon Genesis Evangelion', url: 'https://myanimelist.net/anime/30/Shinseiki_Evangelion' },
      { id: 'nana', title: 'Nana', url: 'https://myanimelist.net/manga/28/Nana' },
      { id: 'phoenix', title: 'Phoenix', url: 'https://myanimelist.net/manga/1325/Hi_no_Tori_1967' },
      { id: 'ooku', title: 'Ooku', url: 'https://myanimelist.net/manga/4423/Oooku' },
      { id: 'maquia', title: 'Maquia When the Flower Blooms', url: 'https://myanimelist.net/anime/35851/Sayonara_no_Asa_ni_Yakusoku_no_Hana_wo_Kazarou' },
      { id: 'berserk', title: 'Berserk', url: 'https://myanimelist.net/manga/2/Berserk' },
      { id: 'vagabond', title: 'Vagabond', url: 'https://myanimelist.net/manga/656/Vagabond' },
      { id: 'kill-la-kill', title: 'Kill la Kill', url: 'https://myanimelist.net/anime/18679/Kill_la_Kill' },
      { id: 'chihayafuru', title: 'Chihayafuru', url: 'https://myanimelist.net/manga/13245/Chihayafuru' },
      { id: 'liz-blue-bird', title: 'Liz and the Blue Bird', url: 'https://myanimelist.net/anime/35677/Liz_to_Aoi_Tori' },
      { id: 'black-lagoon', title: 'Black Lagoon', url: 'https://myanimelist.net/anime/889/Black_Lagoon' },
      { id: 'utena', title: 'Revolutionary Girl Utena', url: 'https://myanimelist.net/anime/440/Shoujo_Kakumei_Utena' },
      { id: 'katanagatari', title: 'Katanagatari', url: 'https://myanimelist.net/anime/6594/Katanagatari' },
      { id: 'xxxholic', title: 'xxxHOLiC', url: 'https://myanimelist.net/manga/10/xxxHOLiC' },
      { id: 'flcl', title: 'FLCL', url: 'https://myanimelist.net/anime/227/FLCL' },
      { id: 'frieren', title: 'Frieren', url: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren/' },
      { id: 'maison-ikkoku', title: 'Maison Ikkoku', url: 'https://myanimelist.net/anime/1453/Maison_Ikkoku' },
      { id: 'golden-boy', title: 'Golden Boy', url: 'https://myanimelist.net/anime/268/Golden_Boy' },
      { id: 'sonny-boy', title: 'Sonny Boy', url: 'https://myanimelist.net/anime/48849/Sonny_Boy' },
      { id: 'fire-punch', title: 'Fire Punch', url: 'https://myanimelist.net/manga/98270/Fire_Punch' },
      { id: 'eureka-7', title: 'Eureka 7', url: 'https://myanimelist.net/anime/237/Koukyoushihen_Eureka_Seven' }
    ]
  },
  {
    id: 'music',
    name: 'Music Albums',
    icon: '🎵',
    items: [
      { id: 'grace', title: 'Grace', url: 'https://open.spotify.com/album/7yQtjAjhtNi76KRu05XWFS?si=9eb6ajZZSPmgXTRD1bEEZg' },
      { id: 'imaginal-disk', title: 'Imaginal Disk', url: 'https://open.spotify.com/album/4HTy9WFTYooRjE9giTmzAF?si=SPiwDxqCQdeHEHh21Ndngg' },
      { id: 'luv-sic-hexalogy', title: 'Luv(sic) Hexalogy', url: 'https://open.spotify.com/album/4oT4YRVe43ESrT9rx2LKCM?si=8WFanJt4S3iU4jE-Vosxcg' },
      { id: 'persona-4', title: 'Persona 4', url: 'https://open.spotify.com/album/78LGjDUuu5dQZRfbrFQ2Ys?si=_C59O7qgQ56D-tUjTtXPng' },
      { id: 'heroes', title: 'Heroes', url: 'https://open.spotify.com/album/4I5zzKYd2SKDgZ9DRf5LVk?si=UqQKxk5HRDKbaOjRcJstHg' },
      { id: 'first-love', title: 'First Love', url: 'https://open.spotify.com/album/29U9LtzSF0ftWiLNNw1CP6?si=G6CQVw9BTmWXqIi8TQ483Q' },
      { id: 'world-is-yours', title: 'World is Yours', url: 'https://open.spotify.com/album/4Uq030a2lUBHDUzhiqmgDV?si=Ip2fPgSqSRy3dLpEQffz5w' },
      { id: 'fresh-air', title: 'Fresh Air', url: 'https://open.spotify.com/album/6Jd5SAg6TVeYlXIu5F7Ia8?si=TivgEZqIT7eBNy-5kpVv2A' },
      { id: 'favourite-worst-nightmare', title: 'Favourite Worst Nightmare', url: 'https://open.spotify.com/album/1XkGORuUX2QGOEIL4EbJKm?si=0-5f_vkpSHqmpsbyVMGixw' },
      { id: 'random-access-memories', title: 'Random Access Memories', url: 'https://open.spotify.com/album/4m2880jivSbbyEGAKfITCa?si=rWtwdCrHSImnq-zX33XxZg' },
      { id: 'now-i-see-light', title: 'Now I See the Light', url: 'https://open.spotify.com/album/1AgU32hdZ8BOx6cWVB7Ucv?si=wnPNl2JpTu6y3lsm_InCaw' },
      { id: 'for-lovers', title: 'For Lovers', url: 'https://open.spotify.com/album/0gwS2D9sukMLXNvleEnYr2?si=PxN5hQp6TKqAYpxigulf6Q' },
      { id: 'graduation', title: 'Graduation', url: 'https://open.spotify.com/album/4SZko61aMnmgvNhfhgTuD3?si=ukiX2k9cQQKdETPAuGHvoA' },
      { id: 'turbulence', title: 'Turbulence', url: 'https://open.spotify.com/album/3GDjlxu7DcrHJXPsCqdBnp?si=eENA1NdfTciuP70-z9ejUw' },
      { id: 'madvillainy', title: 'Madvillainy', url: 'https://open.spotify.com/album/19bQiwEKhXUBJWY6oV3KZk?si=A4JHbluFRs6HjqO29RXWxw' },
      { id: 'in-rainbows', title: 'In Rainbows', url: 'https://open.spotify.com/album/5vkqYmiPBYLaalcmjujWxK?si=zmCdW0p4T-OFJsAlvAnNKw' },
      { id: 'nonadaptation', title: 'Nonadaptation', url: 'https://open.spotify.com/album/2mZUejhzFxhZu2Zd5XV3kX?si=6fwO2wpCTr64qOYNCPFTYw' },
      { id: 'new-abnormal', title: 'The New Abnormal', url: 'https://open.spotify.com/album/2xkZV2Hl1Omi8rk2D7t5lN?si=jCDyo-GiQ7WHFF0LPAJHJg' },
      { id: 'channel-orange', title: 'Channel ORANGE', url: 'https://open.spotify.com/album/392p3shh2jkxUxY2VHvlH8?si=zNwRy2jbSfG8tOACbN2RIA' },
      { id: 'aalas-ka-pedh', title: 'Aalas ka Pedh', url: 'https://open.spotify.com/album/5xOkxpVDHdpWkI9mNfYXab?si=GanlQa6OR8a7pZRr_5kUHA' },
      { id: 'jaago', title: 'Jaago', url: 'https://open.spotify.com/album/0iH6pbUrb45P62B82PHDLb?si=kQPhlgWOTcyZIHkYN7ldug' },
      { id: 'the-end', title: 'THE END', url: 'https://open.spotify.com/album/1EPcY6kCs6RPlcdkdaKX2A?si=KWRpMg2_Sx2nGecH7NvMNA' },
      { id: 'dark-side-moon', title: 'The Dark Side of the Moon', url: 'https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv?si=G7PGkHvLTKi-ZCpgeJj0Kw' },
      { id: 'another-one', title: 'Another One', url: 'https://open.spotify.com/album/5FiDVzxLqGtYjF5yzmMoj4?si=IlaH_cW9QhuYJH0yPXsDuA' },
      { id: 'deathmetal', title: 'D>E>A>T>H>M>E>T>A>L', url: 'https://open.spotify.com/album/2MASm01cgG0a0CgioQpe6Q?si=badM7rK4QNahcwhgBvnB_Q' },
      { id: 'souvlaki', title: 'Souvlaki', url: 'https://open.spotify.com/album/4i21O3uVh5palcfFhCjlT7?si=iKI7ZUOBT_GWTQ8kEcaqnA' },
      { id: 'plastic-beach', title: 'Plastic Beach', url: 'https://open.spotify.com/album/2dIGnmEIy1WZIcZCFSj6i8?si=6clDHX23RpCLn3s2P8IYng' },
      { id: 'timely', title: 'Timely!!', url: 'https://open.spotify.com/album/3OvZYx7AAGplmJjwD29JiV?si=9wky6ZAyT12RZozTT6EGqA' }
    ]
  }
];
