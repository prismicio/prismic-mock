import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

import { boolean } from "./model/boolean";
import { color } from "./model/color";
import { contentRelationship } from "./model/contentRelationship";
import { date } from "./model/date";
import { embed } from "./model/embed";
import { geoPoint } from "./model/geoPoint";
import { image } from "./model/image";
import { keyText } from "./model/keyText";
import { link } from "./model/link";
import { linkToMedia } from "./model/linkToMedia";
import { number } from "./model/number";
import { select } from "./model/select";
import { timestamp } from "./model/timestamp";

const fieldConfigFns = {
	boolean,
	color,
	contentRelationship,
	date,
	embed,
	geoPoint,
	image,
	keyText,
	link,
	linkToMedia,
	number,
	select,
	timestamp,
} as const;

export type BuildRandomGroupFieldMapFieldConfigTypes =
	keyof typeof fieldConfigFns;

export type BuildRandomGroupFieldMapFieldCounts = Partial<
	Record<BuildRandomGroupFieldMapFieldConfigTypes, number>
>;

export type BuildRandomGroupFieldMapFieldArgs = {
	[P in BuildRandomGroupFieldMapFieldConfigTypes]?: Parameters<
		typeof fieldConfigFns[P]
	>;
};

export type BuildRandomGroupFieldMapArgs = {
	fieldCounts?: BuildRandomGroupFieldMapFieldCounts;
	fieldArgs?: BuildRandomGroupFieldMapFieldArgs;
};

const getRandomFieldCount = (): number => {
	return faker.random.arrayElement([0, 0, 1, 2]);
};

export const buildRandomGroupFieldMap = (
	args: BuildRandomGroupFieldMapArgs = {},
): Record<string, prismicT.CustomTypeModelFieldForGroup> => {
	const fieldCounts = args.fieldCounts || {
		boolean: getRandomFieldCount(),
		color: getRandomFieldCount(),
		contentRelationship: getRandomFieldCount(),
		date: getRandomFieldCount(),
		embed: getRandomFieldCount(),
		geoPoint: getRandomFieldCount(),
		image: getRandomFieldCount(),
		keyText: getRandomFieldCount(),
		link: getRandomFieldCount(),
		linkToMedia: getRandomFieldCount(),
		number: getRandomFieldCount(),
		select: getRandomFieldCount(),
		timestamp: getRandomFieldCount(),
	};
	const fieldArgs =
		args.fieldArgs ||
		({} as NonNullable<BuildRandomGroupFieldMapArgs["fieldArgs"]>);

	const fields = {} as Record<string, prismicT.CustomTypeModelFieldForGroup>;
	for (const fieldType in fieldCounts) {
		const count = fieldCounts[fieldType as keyof typeof fieldCounts] || 0;
		const fieldConfigFn =
			fieldConfigFns[fieldType as keyof typeof fieldConfigFns];
		const fieldConfigArgs =
			fieldArgs[fieldType as keyof typeof fieldArgs] || [];

		for (let i = 0; i < count; i++) {
			const fieldId = changeCase.snakeCase(
				faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
			);

			fields[fieldId] = fieldConfigFn(...fieldConfigArgs);
		}
	}

	return fields;
};
