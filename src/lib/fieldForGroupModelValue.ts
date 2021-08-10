import * as prismicT from "@prismicio/types";

import {
	MockValueConfig,
	MockValueConfigForModel,
	ModelValue,
	SetRequired,
} from "../types";

type FieldForGroupModelValueConfig<
	Model extends prismicT.CustomTypeModelFieldForGroup,
> = {
	config?: Omit<MockValueConfigForModel<Model>, "seed" | "model">;
} & SetRequired<MockValueConfig<Model>, "model">;

import * as value from "../value";

export const fieldForGroupModelValue = <
	Model extends prismicT.CustomTypeModelFieldForGroup,
>(
	config: FieldForGroupModelValueConfig<Model>,
): ModelValue<Model> => {
	const model = config.model;

	switch (model.type) {
		case prismicT.CustomTypeModelFieldType.Boolean: {
			return value.boolean({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Color: {
			return value.color({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Link: {
			switch (model.config.select) {
				case prismicT.CustomTypeModelLinkSelectType.Document: {
					return value.contentRelationship({
						seed: config.seed,
						model: model as prismicT.CustomTypeModelContentRelationshipField,
						...config.config,
					}) as ModelValue<Model>;
				}

				case prismicT.CustomTypeModelLinkSelectType.Media: {
					return value.linkToMedia({
						seed: config.seed,
						model: model as prismicT.CustomTypeModelLinkToMediaField,
						...config.config,
					}) as ModelValue<Model>;
				}

				default: {
					return value.link({
						seed: config.seed,
						model: model as prismicT.CustomTypeModelLinkField,
						...config.config,
					}) as ModelValue<Model>;
				}
			}
		}

		case prismicT.CustomTypeModelFieldType.Date: {
			return value.date({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Embed: {
			return value.embed({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.GeoPoint: {
			return value.geoPoint({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Image: {
			return value.image({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Text: {
			return value.keyText({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Number: {
			return value.number({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Select: {
			return value.select({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.Timestamp: {
			return value.timestamp({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.StructuredText: {
			return value.richText({
				seed: config.seed,
				model,
				...config.config,
			}) as ModelValue<Model>;
		}

		case prismicT.CustomTypeModelFieldType.IntegrationFields: {
			// TODO: Should this be something else?
			return {} as ModelValue<Model>;
		}
	}
};
