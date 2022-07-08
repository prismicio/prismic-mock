import * as prismicT from "@prismicio/types";

import { MockValueConfigForModel, ModelValue, Seed } from "../types";
import * as value from "../value";

import { createFaker, Faker } from "./createFaker";

type ValueForModelConfig<Model extends prismicT.CustomTypeModelField> = {
	model: Model;
	config?: Omit<MockValueConfigForModel<Model>, "faker" | "seed" | "model">;
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

export const valueForModel = <Model extends prismicT.CustomTypeModelField>(
	config: ValueForModelConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model;

	switch (model.type) {
		case prismicT.CustomTypeModelFieldType.Boolean: {
			return value.boolean({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Color: {
			return value.color({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Link: {
			switch (model.config?.select) {
				case prismicT.CustomTypeModelLinkSelectType.Document: {
					return value.contentRelationship({
						faker,
						model: model as prismicT.CustomTypeModelContentRelationshipField,
						...config.config,
					}) as ModelValue<Model>;
				}

				case prismicT.CustomTypeModelLinkSelectType.Media: {
					return value.linkToMedia({
						faker,
						model: model as prismicT.CustomTypeModelLinkToMediaField,
						...config.config,
					}) as ModelValue<Model>;
				}

				default: {
					return value.link({
						faker,
						model: model as prismicT.CustomTypeModelLinkField,
						...config.config,
					}) as ModelValue<Model>;
				}
			}
		}

		case prismicT.CustomTypeModelFieldType.Date: {
			return value.date({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Embed: {
			return value.embed({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.GeoPoint: {
			return value.geoPoint({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Image: {
			return value.image({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Text: {
			return value.keyText({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Number: {
			return value.number({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Select: {
			return value.select({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Timestamp: {
			return value.timestamp({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.StructuredText: {
			if (
				model.config &&
				"single" in model.config &&
				model.config.single &&
				model.config.single
					.split(",")
					.every((element) => /heading[1-6]/.test(element.trim()))
			) {
				return value.title({
					faker,
					model: model as prismicT.CustomTypeModelTitleField,
					...config.config,
				}) as ModelValue<Model>;
			} else {
				return value.richText({
					faker,
					model,
					...config.config,
				}) as ModelValue<Model>;
			}
		}

		case prismicT.CustomTypeModelFieldType.IntegrationFields: {
			return value.integrationFields({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.UID: {
			return value.uid({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Group: {
			return value.group({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.LegacySlices:
		case prismicT.CustomTypeModelFieldType.Slices: {
			return value.sliceZone({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		default: {
			throw new Error(
				`The "${model.type}" field type is not supported in @prismicio/mock.`,
			);
		}
	}
};
