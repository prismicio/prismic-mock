import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

const urls = [
	"https://slicemachine.dev",
	"https://prismic.io",
	"http://google.com",
	"http://twitter.com",
];

type LinkArgs = {
	type?: Exclude<prismicT.LinkType, prismicT.LinkType.Any>;
};

export const link = (args: LinkArgs = {}): prismicT.LinkField => {
	const type =
		args.type ||
		faker.random.arrayElement([
			prismicT.LinkType.Web,
			prismicT.LinkType.Document,
			prismicT.LinkType.Media,
		]);

	switch (type) {
		case prismicT.LinkType.Web: {
			const url = faker.random.arrayElement(urls);

			return {
				link_type: prismicT.LinkType.Web,
				url,
				target: faker.datatype.boolean() ? "_blank" : undefined,
			};
		}

		case prismicT.LinkType.Document: {
			return {
				link_type: prismicT.LinkType.Document,
				id: faker.git.shortSha(),
				uid: changeCase.snakeCase(faker.lorem.words(2)),
				type: changeCase.capitalCase(faker.company.bsNoun()),
				tags: Array(faker.datatype.number(3))
					.fill(undefined)
					.map(() => faker.lorem.word()),
				lang: faker.lorem.word(),
				url: "#",
				slug: changeCase.snakeCase(faker.lorem.words(2)),
				isBroken: faker.datatype.boolean(),
			};
		}

		case prismicT.LinkType.Media: {
			return {
				link_type: prismicT.LinkType.Media,
				name: faker.system.commonFileName(),
				kind: faker.system.commonFileType(),
				url: "#",
				size: faker.datatype.number().toString(),
				height: faker.datatype.number().toString(),
				width: faker.datatype.number().toString(),
			};
		}
	}
};
