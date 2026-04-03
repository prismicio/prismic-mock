import * as prismic from "@prismicio/client"

import { createFaker, type Faker } from "../lib/createFaker"
import type {
	GroupFieldModelMap,
	NestedGroupFieldModelMap,
	Seed,
	SlicePrimaryFieldModelMap,
	WithoutFakerConfig,
} from "../types"
import { boolean, type MockBooleanModelConfig } from "./boolean"
import { buildMockGroupFieldMap, type BuildMockGroupFieldMapConfig } from "./buildMockGroupFieldMap"
import { color, type MockColorModelConfig } from "./color"
import { contentRelationship, type MockContentRelationshipModelConfig } from "./contentRelationship"
import { customType, type MockCustomTypeModelConfig } from "./customType"
import { date, type MockDateModelConfig } from "./date"
import { embed, type MockEmbedModelConfig } from "./embed"
import { geoPoint, type MockGeoPointModelConfig } from "./geoPoint"
import { group, type MockGroupModelConfig } from "./group"
import { image, type MockImageModelConfig } from "./image"
import { integration, type MockIntegrationFieldModelConfig } from "./integration"
import { keyText, type MockKeyTextModelConfig } from "./keyText"
import { link, type MockLinkModelConfig } from "./link"
import { linkToMedia, type MockLinkToMediaModelConfig } from "./linkToMedia"
import { number, type MockNumberModelConfig } from "./number"
import { richText, type MockRichTextModelConfig } from "./richText"
import { select, type MockSelectModelConfig } from "./select"
import { sharedSlice, type MockSharedSliceModelConfig } from "./sharedSlice"
import { sharedSliceChoice } from "./sharedSliceChoice"
import {
	sharedSliceVariation,
	type MockSharedSliceVariationModelConfig,
} from "./sharedSliceVariation"
import { slice, type MockSliceModelConfig } from "./slice"
import { sliceZone, type MockSliceZoneModelConfig } from "./sliceZone"
import { type MockTableModelConfig, table } from "./table"
import { timestamp, type MockTimestampModelConfig } from "./timestamp"
import { title, type MockTitleModelConfig } from "./title"
import { uid, type MockUIDModelConfig } from "./uid"

export const createModelMockFactory = (
	...args: ConstructorParameters<typeof ModelMockFactory>
): ModelMockFactory => {
	return new ModelMockFactory(...args)
}

type ModelMockFactoryConfig =
	| {
			seed: Seed
	  }
	| {
			faker: Faker
	  }

export class ModelMockFactory {
	private faker: Faker

	constructor(config: ModelMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed)
	}

	get seed(): Seed {
		return this.faker.seed
	}

	buildMockGroupFieldMap(
		config?: WithoutFakerConfig<BuildMockGroupFieldMapConfig>,
	): NestedGroupFieldModelMap {
		return buildMockGroupFieldMap({ ...config, faker: this.faker })
	}

	boolean(
		config?: WithoutFakerConfig<MockBooleanModelConfig>,
	): prismic.CustomTypeModelBooleanField {
		return boolean({ ...config, faker: this.faker })
	}

	color(config?: WithoutFakerConfig<MockColorModelConfig>): prismic.CustomTypeModelColorField {
		return color({ ...config, faker: this.faker })
	}

	contentRelationship<CustomTypeIDs extends string, Tags extends string>(
		config?: WithoutFakerConfig<MockContentRelationshipModelConfig<CustomTypeIDs, Tags>>,
	): prismic.CustomTypeModelContentRelationshipField<CustomTypeIDs, Tags> {
		return contentRelationship({ ...config, faker: this.faker })
	}

	customType<Definition extends prismic.CustomTypeModelTab | prismic.CustomTypeModelDefinition>(
		config?: WithoutFakerConfig<MockCustomTypeModelConfig<Definition>>,
	): ReturnType<typeof customType<Definition>> {
		return customType({ ...config, faker: this.faker })
	}

	date(config?: WithoutFakerConfig<MockDateModelConfig>): prismic.CustomTypeModelDateField {
		return date({ ...config, faker: this.faker })
	}

	embed(config?: WithoutFakerConfig<MockEmbedModelConfig>): prismic.CustomTypeModelEmbedField {
		return embed({ ...config, faker: this.faker })
	}

	geoPoint(
		config?: WithoutFakerConfig<MockGeoPointModelConfig>,
	): prismic.CustomTypeModelGeoPointField {
		return geoPoint({ ...config, faker: this.faker })
	}

	group<Fields extends GroupFieldModelMap>(
		config?: WithoutFakerConfig<MockGroupModelConfig<Fields>>,
	): prismic.CustomTypeModelGroupField<Fields> {
		return group({ ...config, faker: this.faker })
	}

	image<ThumbnailNames extends string = string>(
		config?: WithoutFakerConfig<MockImageModelConfig<ThumbnailNames>>,
	): prismic.CustomTypeModelImageField<ThumbnailNames> {
		return image({ ...config, faker: this.faker })
	}

	integration(
		config?: WithoutFakerConfig<MockIntegrationFieldModelConfig>,
	): prismic.CustomTypeModelIntegrationField {
		return integration({ ...config, faker: this.faker })
	}

	keyText(
		config?: WithoutFakerConfig<MockKeyTextModelConfig>,
	): prismic.CustomTypeModelKeyTextField {
		return keyText({ ...config, faker: this.faker })
	}

	link<AllowTargetBlank extends boolean = boolean>(
		config?: WithoutFakerConfig<MockLinkModelConfig<AllowTargetBlank>>,
	): ReturnType<typeof link<AllowTargetBlank>> {
		return link({ ...config, faker: this.faker })
	}

	linkToMedia(
		config?: WithoutFakerConfig<MockLinkToMediaModelConfig>,
	): ReturnType<typeof linkToMedia> {
		return linkToMedia({ ...config, faker: this.faker })
	}

	number(config?: WithoutFakerConfig<MockNumberModelConfig>): prismic.CustomTypeModelNumberField {
		return number({ ...config, faker: this.faker })
	}

	richText<WithMultipleBlocks extends boolean = boolean>(
		config?: WithoutFakerConfig<MockRichTextModelConfig<WithMultipleBlocks>>,
	): ReturnType<typeof richText<WithMultipleBlocks>> {
		return richText({ ...config, faker: this.faker })
	}

	select<Option extends string, DefaultOption extends Option>(
		config?: WithoutFakerConfig<MockSelectModelConfig<Option, DefaultOption>>,
	): prismic.CustomTypeModelSelectField<Option, DefaultOption> {
		return select({ ...config, faker: this.faker })
	}

	sharedSlice<Variation extends prismic.SharedSliceModelVariation>(
		config?: WithoutFakerConfig<MockSharedSliceModelConfig<Variation>>,
	): prismic.SharedSliceModel<string, Variation> {
		return sharedSlice({ ...config, faker: this.faker })
	}

	sharedSliceChoice(): prismic.CustomTypeModelSharedSlice {
		return sharedSliceChoice()
	}

	sharedSliceVariation<
		ID extends string,
		PrimaryFields extends SlicePrimaryFieldModelMap,
		ItemsFields extends NestedGroupFieldModelMap,
	>(
		config?: WithoutFakerConfig<
			MockSharedSliceVariationModelConfig<ID, PrimaryFields, ItemsFields>
		>,
	): prismic.SharedSliceModelVariation<ID, PrimaryFields, ItemsFields> {
		return sharedSliceVariation({ ...config, faker: this.faker })
	}

	slice<
		NonRepeatFields extends NestedGroupFieldModelMap,
		RepeatFields extends NestedGroupFieldModelMap,
	>(
		config?: WithoutFakerConfig<MockSliceModelConfig<NonRepeatFields, RepeatFields>>,
	): prismic.CustomTypeModelSlice<NonRepeatFields, RepeatFields> {
		return slice({ ...config, faker: this.faker })
	}

	sliceZone<
		Slices extends Record<
			string,
			prismic.CustomTypeModelSlice | prismic.CustomTypeModelSharedSlice
		>,
	>(
		config?: WithoutFakerConfig<MockSliceZoneModelConfig<Slices>>,
	): prismic.CustomTypeModelSliceZoneField<Slices> {
		return sliceZone({ ...config, faker: this.faker })
	}

	table(config?: WithoutFakerConfig<MockTableModelConfig>): prismic.CustomTypeModelTableField {
		return table({ ...config, faker: this.faker })
	}

	timestamp(
		config?: WithoutFakerConfig<MockTimestampModelConfig>,
	): prismic.CustomTypeModelTimestampField {
		return timestamp({ ...config, faker: this.faker })
	}

	title(config?: WithoutFakerConfig<MockTitleModelConfig>): prismic.CustomTypeModelTitleField {
		return title({ ...config, faker: this.faker })
	}

	uid(config?: WithoutFakerConfig<MockUIDModelConfig>): prismic.CustomTypeModelUIDField {
		return uid({ ...config, faker: this.faker })
	}
}
