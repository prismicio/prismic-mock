import * as prismicT from "@prismicio/types";

import { MockValueConfig, ModelValue, ModelValueMap } from "../types";
import {
	MockBooleanValueConfig,
	MockColorValueConfig,
	MockContentRelationshipValueConfig,
	MockDateValueConfig,
	MockEmbedValueConfig,
	MockGeoPointValueConfig,
	MockGroupValueConfig,
	MockImageValueConfig,
	MockIntegrationFieldsValueConfig,
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

const getValueConfigType = <Model extends prismicT.CustomTypeModelField>(
	model: Model,
): keyof ValueForModelMapConfigs => {
	switch (model.type) {
		case prismicT.CustomTypeModelFieldType.Boolean:
			return "boolean";

		case prismicT.CustomTypeModelFieldType.Color:
			return "color";

		case prismicT.CustomTypeModelFieldType.Date:
			return "date";

		case prismicT.CustomTypeModelFieldType.Embed:
			return "embed";

		case prismicT.CustomTypeModelFieldType.GeoPoint:
			return "geoPoint";

		case prismicT.CustomTypeModelFieldType.Group:
			return "group";

		case prismicT.CustomTypeModelFieldType.Image:
			return "image";

		case prismicT.CustomTypeModelFieldType.Link: {
			switch (model.config.select) {
				case prismicT.CustomTypeModelLinkSelectType.Document:
					return "contentRelationship";
				case prismicT.CustomTypeModelLinkSelectType.Media:
					return "linkToMedia";
				default:
					return "link";
			}
		}

		case prismicT.CustomTypeModelFieldType.Number:
			return "number";

		case prismicT.CustomTypeModelFieldType.Select:
			return "select";

		case prismicT.CustomTypeModelFieldType.StructuredText: {
			if (
				"single" in model.config &&
				model.config.single
					.split(",")
					.every((element) => /heading{1,6}/.test(element.trim()))
			) {
				return "title";
			} else {
				return "richText";
			}
		}

		case prismicT.CustomTypeModelFieldType.Text:
			return "keyText";

		case prismicT.CustomTypeModelFieldType.Timestamp:
			return "timestamp";

		case prismicT.CustomTypeModelFieldType.UID:
			return "uid";

		case prismicT.CustomTypeModelFieldType.IntegrationFields:
			return "integrationFields";

		case prismicT.CustomTypeModelFieldType.Group:
			return "group";

		case prismicT.CustomTypeModelFieldType.Slices:
			return "slices";
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
	integrationFields?: MockIntegrationFieldsValueConfig;
	keyText?: MockKeyTextValueConfig;
	link?: MockLinkValueConfig;
	linkToMedia?: MockLinkToMediaValueConfig;
	number?: MockNumberValueConfig;
	richText?: MockRichTextValueConfig;
	select?: MockSelectValueConfig;
	slices?: MockSliceZoneValueConfig;
	timestamp?: MockTimestampValueConfig;
	title?: MockTitleValueConfig;
	uid?: MockUIDValueConfig;
};

type ValueForModelMapConfig<
	ModelMap extends Record<string, prismicT.CustomTypeModelField>,
> = {
	map: ModelMap;
	configs?: ValueForModelMapConfigs;
} & Omit<MockValueConfig, "model">;

export const valueForModelMap = <
	ModelMap extends Record<string, prismicT.CustomTypeModelField>,
>(
	config: ValueForModelMapConfig<ModelMap>,
): ModelValueMap<ModelMap> => {
	const result = {} as ModelValueMap<ModelMap>;

	for (const fieldId in config.map) {
		const fieldModel = config.map[fieldId];
		const fieldConfigType = getValueConfigType(fieldModel);
		const fieldConfig = config.configs?.[fieldConfigType];

		result[fieldId] = valueForModel({
			seed: config.seed,
			model: fieldModel as prismicT.CustomTypeModelField,
			config: fieldConfig,
		}) as ModelValue<typeof fieldModel>;
	}

	return result;
};
