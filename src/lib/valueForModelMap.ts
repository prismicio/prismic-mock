import * as prismic from "@prismicio/client";

import { ModelValue, ModelValueMap, Seed } from "../types";
import {
	MockBooleanValueConfig,
	MockColorValueConfig,
	MockContentRelationshipValueConfig,
	MockDateValueConfig,
	MockEmbedValueConfig,
	MockGeoPointValueConfig,
	MockGroupValueConfig,
	MockImageValueConfig,
	MockIntegrationFieldValueConfig,
	MockKeyTextValueConfig,
	MockLinkToMediaValueConfig,
	MockLinkValueConfig,
	MockNumberValueConfig,
	MockRichTextValueConfig,
	MockSelectValueConfig,
	MockSliceZoneValueConfig,
	MockTimestampValueConfig,
	MockTitleValueConfig,
	MockUIDValueConfig,
} from "../value";

import { valueForModel } from "./valueForModel";
import { createFaker, Faker } from "./createFaker";

const getValueConfigType = <Model extends prismic.CustomTypeModelField>(
	model: Model,
): keyof ValueForModelMapConfigs => {
	switch (model.type) {
		case prismic.CustomTypeModelFieldType.Boolean:
			return "boolean";

		case prismic.CustomTypeModelFieldType.Color:
			return "color";

		case prismic.CustomTypeModelFieldType.Date:
			return "date";

		case prismic.CustomTypeModelFieldType.Embed:
			return "embed";

		case prismic.CustomTypeModelFieldType.GeoPoint:
			return "geoPoint";

		case prismic.CustomTypeModelFieldType.Group:
			return "group";

		case prismic.CustomTypeModelFieldType.Image:
			return "image";

		case prismic.CustomTypeModelFieldType.Link: {
			switch (model.config?.select) {
				case prismic.CustomTypeModelLinkSelectType.Document:
					return "contentRelationship";
				case prismic.CustomTypeModelLinkSelectType.Media:
					return "linkToMedia";
				default:
					return "link";
			}
		}

		case prismic.CustomTypeModelFieldType.Number:
			return "number";

		case prismic.CustomTypeModelFieldType.Select:
			return "select";

		case prismic.CustomTypeModelFieldType.StructuredText: {
			if (
				model.config &&
				"single" in model.config &&
				model.config.single &&
				model.config.single
					.split(",")
					.every((element) => /heading{1,6}/.test(element.trim()))
			) {
				return "title";
			} else {
				return "richText";
			}
		}

		case prismic.CustomTypeModelFieldType.Text:
			return "keyText";

		case prismic.CustomTypeModelFieldType.Timestamp:
			return "timestamp";

		case prismic.CustomTypeModelFieldType.UID:
			return "uid";

		case prismic.CustomTypeModelFieldType.Integration:
			return "integration";

		case prismic.CustomTypeModelFieldType.Slices:
			return "sliceZone";

		default: {
			throw new Error(
				`The "${model.type}" field type is not supported in @prismicio/mock.`,
			);
		}
	}
};

export type ValueForModelMapConfigs = {
	boolean?: MockBooleanValueConfig;
	color?: MockColorValueConfig;
	contentRelationship?: MockContentRelationshipValueConfig;
	date?: MockDateValueConfig;
	embed?: MockEmbedValueConfig;
	geoPoint?: MockGeoPointValueConfig;
	group?: MockGroupValueConfig;
	image?: MockImageValueConfig;
	integration?: MockIntegrationFieldValueConfig;
	keyText?: MockKeyTextValueConfig;
	link?: MockLinkValueConfig;
	linkToMedia?: MockLinkToMediaValueConfig;
	number?: MockNumberValueConfig;
	richText?: MockRichTextValueConfig;
	select?: MockSelectValueConfig;
	sliceZone?: MockSliceZoneValueConfig;
	timestamp?: MockTimestampValueConfig;
	title?: MockTitleValueConfig;
	uid?: MockUIDValueConfig;
};

type ValueForModelMapConfig<
	ModelMap extends Record<string, prismic.CustomTypeModelField>,
> = {
	map: ModelMap;
	configs?: ValueForModelMapConfigs;
} & (
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  }
);

export const valueForModelMap = <
	ModelMap extends Record<string, prismic.CustomTypeModelField>,
>(
	config: ValueForModelMapConfig<ModelMap>,
): ModelValueMap<ModelMap> => {
	const faker = config.faker || createFaker(config.seed);

	const result = {} as ModelValueMap<ModelMap>;

	for (const fieldId in config.map) {
		const fieldModel = config.map[fieldId];
		const fieldConfigType = getValueConfigType(fieldModel);
		const fieldConfig = config.configs?.[fieldConfigType];

		result[fieldId] = valueForModel({
			faker,
			model: fieldModel as prismic.CustomTypeModelField,
			config: fieldConfig,
		}) as ModelValue<typeof fieldModel>;
	}

	return result;
};
