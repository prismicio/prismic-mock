import * as prismic from "@prismicio/client";

import { MockValueConfigForModel, ModelValue, Seed } from "../types";
import * as value from "../value";

import { createFaker, Faker } from "./createFaker";

type ValueForModelConfig<Model extends prismic.CustomTypeModelField> = {
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

export const valueForModel = <Model extends prismic.CustomTypeModelField>(
	config: ValueForModelConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model;

	switch (model.type) {
		case prismic.CustomTypeModelFieldType.Boolean: {
			return value.boolean({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Color: {
			return value.color({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Link: {
			switch (model.config?.select) {
				case prismic.CustomTypeModelLinkSelectType.Document: {
					return value.contentRelationship({
						faker,
						model: model as prismic.CustomTypeModelContentRelationshipField,
						...config.config,
					}) as ModelValue<Model>;
				}

				case prismic.CustomTypeModelLinkSelectType.Media: {
					return value.linkToMedia({
						faker,
						model: model as prismic.CustomTypeModelLinkToMediaField,
						...config.config,
					}) as ModelValue<Model>;
				}

				default: {
					return value.link({
						faker,
						model: model as prismic.CustomTypeModelLinkField,
						...config.config,
					}) as ModelValue<Model>;
				}
			}
		}

		case prismic.CustomTypeModelFieldType.Date: {
			return value.date({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Embed: {
			return value.embed({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.GeoPoint: {
			return value.geoPoint({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Image: {
			return value.image({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Text: {
			return value.keyText({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Number: {
			return value.number({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Select: {
			return value.select({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Timestamp: {
			return value.timestamp({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.StructuredText: {
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
					model: model as prismic.CustomTypeModelTitleField,
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

		case prismic.CustomTypeModelFieldType.IntegrationFields: {
			return value.integrationFields({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.UID: {
			return value.uid({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.Group: {
			return value.group({
				faker,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismic.CustomTypeModelFieldType.LegacySlices:
		case prismic.CustomTypeModelFieldType.Slices: {
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
