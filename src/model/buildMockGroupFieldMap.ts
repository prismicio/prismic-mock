import { GroupFieldModelMap, MockModelConfig, ValueOf } from "../types";

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

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";

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
};

export type BuildMockGroupFieldMapConfig = MockModelConfig;

export const buildMockGroupFieldMap = (
	config: BuildMockGroupFieldMapConfig = {},
): GroupFieldModelMap => {
	const faker = createFaker(config.seed);

	const fields: GroupFieldModelMap = {};

	const fieldTypes = faker.random.arrayElements(
		Object.keys(mockModelFns) as (keyof typeof mockModelFns)[],
	);

	for (const fieldType of fieldTypes) {
		const fieldId = generateFieldId({ seed: config.seed });
		const mockModelFn = mockModelFns[fieldType] as (
			config: MockModelConfig,
		) => ValueOf<GroupFieldModelMap>;

		fields[fieldId] = mockModelFn({ seed: config.seed });
	}

	return fields;
};
