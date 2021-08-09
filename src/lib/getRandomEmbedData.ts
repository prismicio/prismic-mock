import { createFaker } from "../lib/createFaker";

import { MockEmbedData, MockValueConfig } from "../types";

const dataSet: MockEmbedData[] = [
	{
		url: "https://www.youtube.com/watch?v=fiOwHYFkUz0",
		embed_url: "https://www.youtube.com/embed/fiOwHYFkUz0",
		thumbnail_url: "https://i.ytimg.com/vi/fiOwHYFkUz0/hqdefault.jpg",
		thumbnail_height: 360,
		thumbnail_width: 480,
		html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/fiOwHYFkUz0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
	},
	{
		url: "https://www.youtube.com/watch?v=c-ATzcy6VkI",
		embed_url: "https://www.youtube.com/embed/c-ATzcy6VkI",
		thumbnail_url: "https://i.ytimg.com/vi/c-ATzcy6VkI/hqdefault.jpg",
		thumbnail_height: 360,
		thumbnail_width: 480,
		html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/c-ATzcy6VkI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
	},
	{
		url: "https://www.youtube.com/watch?v=iewZXv94XGY",
		embed_url: "https://www.youtube.com/watch?v=fiOwHYFkUz0",
		thumbnail_url: "https://i.ytimg.com/vi/iewZXv94XGY/hqdefault.jpg",
		thumbnail_height: 360,
		thumbnail_width: 480,
		html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/iewZXv94XGY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
	},
	{
		url: "https://twitter.com/prismicio/status/1356293316158095361",
		embed_url: "https://www.youtube.com/watch?v=iewZXv94XGY",
		thumbnail_url: null,
		thumbnail_height: null,
		thumbnail_width: null,
		html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Gatsby is a popular choice for Prismic users and we work hard on delivering a CMS that plays to its strengths.<br><br>But, what makes <a href="https://twitter.com/GatsbyJS?ref_src=twsrc%5Etfw">@GatsbyJS</a> so popular?<br><br>Here are some of <a href="https://twitter.com/mxstbr?ref_src=twsrc%5Etfw">@mxstbr</a>&#39;s thoughts on Gatsby&#39;s success and how they&#39;re improving developer experience.<a href="https://t.co/ZjCPvsWWUD">https://t.co/ZjCPvsWWUD</a> <a href="https://t.co/EQqzJpeNKl">pic.twitter.com/EQqzJpeNKl</a></p>&mdash; Prismic (@prismicio) <a href="https://twitter.com/prismicio/status/1356293316158095361?ref_src=twsrc%5Etfw">February 1, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
	},
	{
		url: "https://twitter.com/timbenniks/status/1304146886832594944",
		thumbnail_url: null,
		thumbnail_width: null,
		thumbnail_height: null,
		embed_url: "https://twitter.com/timbenniks/status/1304146886832594944",
		html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I’ve been diving deep on <a href="https://twitter.com/prismicio?ref_src=twsrc%5Etfw">@prismicio</a> <a href="https://twitter.com/hashtag/slicemachine?src=hash&amp;ref_src=twsrc%5Etfw">#slicemachine</a> today. I made all my own components and I used custom slices. It works like a charm with <a href="https://twitter.com/nuxt_js?ref_src=twsrc%5Etfw">@nuxt_js</a>. Also: I’m coding with this view. <a href="https://t.co/F0I8X9gz39">pic.twitter.com/F0I8X9gz39</a></p>&mdash; Tim Benniks (@timbenniks) <a href="https://twitter.com/timbenniks/status/1304146886832594944?ref_src=twsrc%5Etfw">September 10, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
	},
	{
		url: "https://twitter.com/prismicio/status/1354112310252630016",
		thumbnail_url: null,
		thumbnail_width: null,
		thumbnail_height: null,
		embed_url: "https://twitter.com/prismicio/status/1354112310252630016",
		html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re launching a new <a href="https://twitter.com/hashtag/SliceContest?src=hash&amp;ref_src=twsrc%5Etfw">#SliceContest</a> tomorrow along with Slice Machine upgrades.<br><br>Want to know more? Join us at tomorrow&#39;s Product Meet-up👇<a href="https://t.co/prYSypiAvB">https://t.co/prYSypiAvB</a><br><br>We can&#39;t tell you any further details for now, but here&#39;s a sneak peek at the prizes👀 <a href="https://t.co/fV1eoGlEBh">pic.twitter.com/fV1eoGlEBh</a></p>&mdash; Prismic (@prismicio) <a href="https://twitter.com/prismicio/status/1354112310252630016?ref_src=twsrc%5Etfw">January 26, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
	},
	{
		url: "https://twitter.com/prismicio/status/1354835716430319617",
		thumbnail_url: null,
		thumbnail_width: null,
		thumbnail_height: null,
		embed_url: "https://twitter.com/prismicio/status/1354835716430319617",
		html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Does anyone want to create a wildly popular website for discussing &#39;Wall Street Bets&#39; using Prismic?<br><br>It may or may not have to look a lot like <a href="https://twitter.com/hashtag/reddit?src=hash&amp;ref_src=twsrc%5Etfw">#reddit</a> and we won&#39;t make it private.<br><br>Just asking for some friends...</p>&mdash; Prismic (@prismicio) <a href="https://twitter.com/prismicio/status/1354835716430319617?ref_src=twsrc%5Etfw">January 28, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
	},
];
type GetRandomEmbedDataConfig = Pick<MockValueConfig, "seed">;

export const getRandomEmbedData = (
	config: GetRandomEmbedDataConfig = {},
): MockEmbedData => {
	const faker = createFaker(config.seed);

	return faker.random.arrayElement(dataSet);
};
