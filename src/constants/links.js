export const LINKS = {
	Support: 'https://help.synthetix.io/hc/en-us',
	Tokens: 'https://www.synthetix.io/tokens/',
	Trading: {
		DexAG: 'https://dex.ag/',
		Uniswap: 'https://uniswap.exchange/',
		OneInch: 'https://1inch.exchange/#/sETH/DAI',
		OneInchLink: (base, quote) => `https://1inch.exchange/#/${base}/${quote}`,
	},
	Learn: {
		Litepaper: 'https://www.synthetix.io/litepaper',
		Tokens: 'https://www.synthetix.io/tokens',
		Blog: 'https://blog.synthetix.io/',
	},
	Products: {
		Mintr: 'https://www.synthetix.io/products/mintr',
		Dashboard: 'https://dashboard.synthetix.io/',
	},
	Connect: {
		Community: 'https://www.synthetix.io/community',
		ContactUs: 'https://www.synthetix.io/contact-us',
	},
	Social: {
		Twitter: 'https://twitter.com/synthetix_io',
		Medium: 'https://blog.synthetix.io/',
		Discord: 'https://discordapp.com/invite/AEdUHzt',
		GitHub: 'https://github.com/synthetixio',
	},
	Misc: {
		EthereumOrg: 'https://ethereum.org/',
		DefiNetwork: 'https://defi.network/',
		Messari: 'https://messari.io/asset/synthetix',
	},
};
