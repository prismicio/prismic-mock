import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock Embed field value", executeTwiceMacro, value.embed, [
	{
		type: "rich",
		url: "https://www.youtube.com/watch?v=fiOwHYFkUz0",
		html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/fiOwHYFkUz0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
		title: "Ullam Voluptate Inventore",
		version: "10",
		cache_age: 48268,
		embed_url: "https://www.youtube.com/embed/fiOwHYFkUz0",
		author_url: "#",
		author_name: "Grady, Langosh and Schimmel",
		provider_name: "Greenholt Group",
		thumbnail_width: 480,
		thumbnail_height: 360,
		thumbnail_url: "https://i.ytimg.com/vi/fiOwHYFkUz0/hqdefault.jpg",
		width: 421,
		height: 500,
	},
	{
		type: "link",
		url: "https://www.youtube.com/watch?v=c-ATzcy6VkI",
		html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/c-ATzcy6VkI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
		title: "Porro Voluptatem Ab",
		version: "0",
		cache_age: 49551,
		embed_url: "https://www.youtube.com/embed/c-ATzcy6VkI",
		author_url: "#",
		author_name: "Ondricka Inc",
		provider_name: "Morar, Prosacco and Mertz",
		thumbnail_width: 480,
		thumbnail_height: 360,
		thumbnail_url: "https://i.ytimg.com/vi/c-ATzcy6VkI/hqdefault.jpg",
		width: 276,
		height: 405,
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.embed({ seed: 1 }),
	[
		{
			type: "link",
			url: "https://www.youtube.com/watch?v=iewZXv94XGY",
			html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/iewZXv94XGY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
			title: "Quisquam Recusandae Alias",
			version: "0",
			cache_age: 30233,
			embed_url: "https://www.youtube.com/watch?v=fiOwHYFkUz0",
			author_url: "#",
			author_name: "Corkery, Feil and Bosco",
			provider_name: "Dibbert - Howell",
			thumbnail_width: 480,
			thumbnail_height: 360,
			thumbnail_url: "https://i.ytimg.com/vi/iewZXv94XGY/hqdefault.jpg",
			width: 304,
			height: 401,
		},
		{
			type: "link",
			url: "https://www.youtube.com/watch?v=iewZXv94XGY",
			html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/iewZXv94XGY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
			title: "Ut Nulla Quam",
			version: "0",
			cache_age: 68521,
			embed_url: "https://www.youtube.com/watch?v=fiOwHYFkUz0",
			author_url: "#",
			author_name: "Doyle - Kihn",
			provider_name: "Fay, Balistreri and Lesch",
			thumbnail_width: 480,
			thumbnail_height: 360,
			thumbnail_url: "https://i.ytimg.com/vi/iewZXv94XGY/hqdefault.jpg",
			width: 401,
			height: 475,
		},
	],
);
