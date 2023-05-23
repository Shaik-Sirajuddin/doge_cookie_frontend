import { presale, dashboard, logout, staking, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'presale',
    imgUrl: presale,
    link: '/presale',
  },
  {
    name: 'staking',
    imgUrl: staking,
    link: '/staking',
    // disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/login',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];

export const exploreWorlds = [
  {
    id: 'nft-1',
    imgUrl: '/images/nft1 (3).png',
    title: 'doge NFT',
  },
  {
    id: 'nft-2',
    imgUrl: '/images/nft1 (2).png',
    title: 'doge NFT',
  },
  {
    id: 'nft-3',
    imgUrl: '/images/nft1 (1).png',
    title: 'doge NFT',
  },
  {
    id: 'nft-4',
    imgUrl: '/images/planet-04.png',
    title: 'doge NFT',
  },
  {
    id: 'nft-5',
    imgUrl: '/images/planet-05.png',
    title: 'Doge NFT',
  },
];


export const startingFeatures = [
  'Buy Doge Cookie',
  'Stake to Earn',
  'Vote to Earn',
  'Vote to Earn',
  'Referal System',
];

export const newFeatures = [
  {
    imgUrl: '/images/vrpano.svg',
    title: 'Presale stage 1',
    presale: '30 Billion $DCK',
    subtitle:'0.0001$ = 1 DCK',
    dollarPrice: '1$ = 10,000DCK',
    totalPrice: 'Total Price at stage 1 = $3M'
  },
  {
    imgUrl: '/images/headset.svg',
    title: 'Presale stage 2',
    presale: '25Billion $DCK',
    subtitle:'0.00018$ = 1DCK',
    dollarPrice: '1$ = 5555DCK',
    totalPrice: 'Total stage 2 price = $4.5M'
  },
    {
    imgUrl: '/images/headset.svg',
    title: 'Presale Stage 3',
    presale: '20 Billion $DCK',
    subtitle:'0.00022$ = 1DCK',
    dollarPrice: '1$ = 4,545DCK',
    totalPrice: ' Total stage 3 price = $4.4M'
  },
  {
    imgUrl: '/images/headset.svg',
    title: 'Total Stage 4',
    presale: '15Billion $DCK',
    subtitle: '0.00026$ = 1DCK',
    dollarPrice: '1$ = 3846DCK',
    totalPrice: 'Total stage 4 price = $3.9M'
  },
    {
    imgUrl: '/images/headset.svg',
    title: 'Total stage 5',
    presale: '10 Billion $DCK',
    subtitle:'0.00030$ = 1DCK ',
    dollarPrice: '1$ = 3,333DCK',
    totalPrice: 'Total stage 5 price =$3M'
  },
];

export const insights = [
  {
    imgUrl: '/images/unibg4.jpg',
    title: 'Mission',
    subtitle:
        "Doge Cookie is World's first meme token with a fully decentralized community and endless earning possibilities for its members. Our core objective is to build a formidable ecosystem that transfers 90% of its generated revenue back to its members.",
  },
  {
    imgUrl: '/images/planet-07.png',
    title: 'The Doge Cookie Token',
    subtitle:
        'The   Doge   cookie   native   cryp-tographically   secured   fungible   protocol   token   (ticker   symbol   $DCK)  is  a  transferable  repre-sentation   of   attributed   utility   functions  provided  in  the  Doge  cookie protocol/code 2. VALUESDOGE COOKIECommunity:AT $DCK we work with a team of cryptocurrency experts, journalists, developers, designers, and strategists who understand the in and out of the cryptocurrency world backs $DCK. The team at $DCK has han-dled core cryptocurrency projects with impressive success stories.',
  },
  {
    imgUrl: '/images/planet-08.png',
    title: 'Community',
    subtitle:
        'AT $DCK we work with a team of cryptocurrency experts, journalists, developers, designers, and strategists who understand the in and out of the cryptocurrency world backs $DCK. The team at $DCK has han-dled core cryptocurrency projects with impressive success stories',
  },
];

export const socials = [
  {
    name: 'twitter',
    url: '/images/twitter.svg',
  },
  {
    name: 'instagram',
    url: '/images/instagram.svg',
  },
];
