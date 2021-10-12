import { GroupFieldModelMap, MockModelConfig } from "../types";

import { boolean } from "../model/boolean";
import { color } from "../model/color";
import { contentRelationship } from "../model/contentRelationship";
import { date } from "../model/date";
import { embed } from "../model/embed";
import { geoPoint } from "../model/geoPoint";
import { image } from "../model/image";
import { integrationFields } from "../model/integrationFields";
import { keyText } from "../model/keyText";
import { link } from "../model/link";
import { linkToMedia } from "../model/linkToMedia";
import { number } from "../model/number";
import { richText } from "../model/richText";
import { select } from "../model/select";
import { timestamp } from "../model/timestamp";
import { title } from "../model/title";

import { createFaker } from "./createFaker";
import { generateFieldId } from "./generateFieldId";

const mockModelFns = {
	boolean,
	color,
	contentRelationship,
	date,
	embed,
	geoPoint,
	image,
	integrationFields,
	keyText,
	link,
	linkToMedia,
	number,
	richText,
	select,
	timestamp,
	title,
} as const;

type MockModelFns = typeof mockModelFns;
type MockModelTypes = keyof MockModelFns;

export type BuildMockGroupFieldMapConfig = {
	configs?: {
		[P in keyof MockModelFns]?: {
			count?: number;
			config?: Parameters<MockModelFns[P]>[0];
		};
	};
} & MockModelConfig;

export const buildMockGroupFieldMap = (
	config: BuildMockGroupFieldMapConfig = {},
): GroupFieldModelMap => {
	const faker = createFaker(config.seed);

	const configs =
		config.configs ||
		({} as NonNullable<BuildMockGroupFieldMapConfig["configs"]>);

	const fields: GroupFieldModelMap = {};

	for (const mockModelType in mockModelFns) {
		const mockModelFn = mockModelFns[mockModelType as MockModelTypes];
		const mockModelMapConfig = configs[mockModelType as MockModelTypes] || {};
		const count =
			mockModelMapConfig.count ?? faker.random.arrayElement([0, 0, 0, 1]);

		for (let i = 0; i < count; i++) {
			const fieldId = generateFieldId({ seed: config.seed });

			fields[fieldId] = mockModelFn({
				seed: config.seed,
				...mockModelMapConfig.config,
			});
		}
	}

	return fields;
};
