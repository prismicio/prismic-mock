import { MockModelConfig, NestedGroupFieldModelMap, ValueOf } from "../types";

import { boolean } from "../model/boolean";
import { color } from "../model/color";
import { contentRelationship } from "../model/contentRelationship";
import { date } from "../model/date";
import { embed } from "../model/embed";
import { geoPoint } from "../model/geoPoint";
import { image } from "../model/image";
import { integration } from "../model/integration";
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
	integration,
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
	config: BuildMockGroupFieldMapConfig,
): NestedGroupFieldModelMap => {
	const faker = config.faker || createFaker(config.seed);

	const fields: NestedGroupFieldModelMap = {};

	const fieldTypes = faker.randomElements(
		Object.keys(mockModelFns) as (keyof typeof mockModelFns)[],
	);

	for (const fieldType of fieldTypes) {
		const fieldId = generateFieldId({ faker });
		const mockModelFn = mockModelFns[fieldType] as (
			config: MockModelConfig,
		) => ValueOf<NestedGroupFieldModelMap>;

		fields[fieldId] = mockModelFn({ faker });
	}

	return fields;
};
