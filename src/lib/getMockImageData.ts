import { createFaker, Faker } from "../lib/createFaker";

import { MockImageData, Seed } from "../types";

const dataSet: MockImageData[] = [
	{
		url: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d",
		width: 4240,
		height: 2832,
	},
	{
		url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
		width: 7372,
		height: 4392,
	},
	{
		url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
		width: 2560,
		height: 1705,
	},
	{
		url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5",
		width: 2200,
		height: 1467,
	},
	{
		url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
		width: 5616,
		height: 3744,
	},
	{
		url: "https://images.unsplash.com/photo-1604537466608-109fa2f16c3b",
		width: 4240,
		height: 2832,
	},
	{
		url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
		width: 2560,
		height: 1440,
	},
	{
		url: "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg",
		width: 6373,
		height: 4253,
	},
	{
		url: "https://images.unsplash.com/photo-1504198266287-1659872e6590",
		width: 4272,
		height: 2848,
	},
	{
		url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
		width: 4554,
		height: 3036,
	},
	{
		url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
		width: 6550,
		height: 4367,
	},
	{
		url: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c",
		width: 6000,
		height: 4000,
	},
	{
		url: "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f",
		width: 6000,
		height: 4000,
	},
	{
		url: "https://images.unsplash.com/photo-1504567961542-e24d9439a724",
		width: 4608,
		height: 3456,
	},
	{
		url: "https://images.unsplash.com/photo-1444464666168-49d633b86797",
		width: 4844,
		height: 3234,
	},
	{
		url: "https://images.unsplash.com/photo-1553531384-397c80973a0b",
		width: 4335,
		height: 6502,
	},
];

type GetMockImageDataConfig =
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  };

export const getMockImageData = (
	config: GetMockImageDataConfig,
): MockImageData => {
	const faker = config.faker || createFaker(config.seed);

	return faker.randomElement(dataSet);
};
