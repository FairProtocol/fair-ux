export enum RoutePaths {
  home = 'home',
  start = 'start',
  docs = 'docs',
  createAuction = 'create-auction',
  tc = 'tc',
  auctionList = 'auction-list',
  auction = 'auction',
  privateAuctionSigner = 'private-auction-signer',
}

export enum SubRoutePaths {
  launchAuction = 'launch-auction',
  appendix = 'appendix',
  network = 'network',
  token = 'token',
  details = 'details',
  auction = 'auction',
  social = 'social',
}

export interface Route {
  path: string
  name: string | string[]
  subPaths?: {
    [key in keyof typeof SubRoutePaths]?: Route
  }
}

export const routes: {
  [key in keyof typeof RoutePaths]: Route
} = {
  home: {
    path: '/',
    name: 'start',
  },
  start: {
    path: '/start',
    name: 'start',
  },
  docs: {
    path: '/docs',
    name: 'Docs',
  },
  createAuction: {
    path: '/create-auction',
    name: 'Create Auction',
    subPaths: {
      launchAuction: {
        path: '#launch-auction',
        name: 'Launch Auction',
      },
      network: {
        path: '#network',
        name: 'Network',
      },
      token: {
        path: '#token',
        name: 'Token',
      },
      details: {
        path: '#details',
        name: 'Details',
      },
      auction: {
        path: '#auction',
        name: 'Auction',
      },
      social: {
        path: '#social',
        name: 'Social',
      },
    },
  },
  tc: {
    path: '/tc',
    name: 'Terms & Conditions',
    subPaths: {
      appendix: {
        path: '#appendix',
        name: 'Appendix',
      },
    },
  },
  auctionList: {
    path: '/list',
    name: 'Auction List',
  },
  auction: {
    path: '/auction',
    name: 'Auction',
  },
  privateAuctionSigner: {
    path: '/private-auction-signer',
    name: 'Private Auction Signer',
  },
}
