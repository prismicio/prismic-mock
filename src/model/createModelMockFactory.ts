import * as prismicT from "@prismicio/types";

import { createFaker, Faker } from "../lib/createFaker";

import { GroupFieldModelMap, Seed } from "../types";

import { boolean, MockBooleanModelConfig } from "./boolean";
import {
	buildMockGroupFieldMap,
	BuildMockGroupFieldMapConfig,
} from "./buildMockGroupFieldMap";
import { color, MockColorModelConfig } from "./color";
import {
	contentRelationship,
	MockContentRelationshipModelConfig,
} from "./contentRelationship";
import { customType, MockCustomTypeModelConfig } from "./customType";
import { date, MockDateModelConfig } from "./date";
import { embed, MockEmbedModelConfig } from "./embed";
import { geoPoint, MockGeoPointModelConfig } from "./geoPoint";
import { group, MockGroupModelConfig } from "./group";
import { image, MockImageModelConfig } from "./image";
import {
	integrationFields,
	MockIntegrationFieldsModelConfig,
} from "./integrationFields";
import { keyText, MockKeyTextModelConfig } from "./keyText";
import { link, MockLinkModelConfig } from "./link";
import { linkToMedia, MockLinkToMediaModelConfig } from "./linkToMedia";
import { number, MockNumberModelConfig } from "./number";
import { richText, MockRichTextModelConfig } from "./richText";
import { select, MockSelectModelConfig } from "./select";
import { sharedSlice, MockSharedSliceModelConfig } from "./sharedSlice";
import { sharedSliceChoice } from "./sharedSliceChoice";
import {
	sharedSliceVariation,
	MockSharedSliceVariationModelConfig,
} from "./sharedSliceVariation";
import { slice, MockSliceModelConfig } from "./slice";
import { sliceZone, MockSliceZoneModelConfig } from "./sliceZone";
import { timestamp, MockTimestampModelConfig } from "./timestamp";
import { title, MockTitleModelConfig } from "./title";
import { uid, MockUIDModelConfig } from "./uid";

export const createModelMockFactory = (
	...args: ConstructorParameters<typeof ModelMockFactory>
): ModelMockFactory => {
	return new ModelMockFactory(...args);
};

type WithoutFakerConfig<T> = Omit<T, "faker" | "seed">;

type ModelMockFactoryConfig =
	| {
			seed: Seed;
	  }
	| {
			faker: Faker;
	  };

export class ModelMockFactory {
	private faker: Faker;

	constructor(config: ModelMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed);
	}

	get seed() {
		return this.faker.seed;
	}

	buildMockGroupFieldMap(
		config?: WithoutFakerConfig<BuildMockGroupFieldMapConfig>,
	) {
		return buildMockGroupFieldMap({ ...config, faker: this.faker });
	}

	boolean(config?: WithoutFakerConfig<MockBooleanModelConfig>) {
		return boolean({ ...config, faker: this.faker });
	}

	color(config?: WithoutFakerConfig<MockColorModelConfig>) {
		return color({ ...config, faker: this.faker });
	}

	contentRelationship<CustomTypeIDs extends string, Tags extends string>(
		config?: WithoutFakerConfig<
			MockContentRelationshipModelConfig<CustomTypeIDs, Tags>
		>,
	) {
		return contentRelationship({ ...config, faker: this.faker });
	}

	customType<
		Definition extends
			| prismicT.CustomTypeModelTab
			| prismicT.CustomTypeModelDefinition,
	>(config: WithoutFakerConfig<MockCustomTypeModelConfig<Definition>> = {}) {
		return customType({ ...config, faker: this.faker });
	}

	date(config?: WithoutFakerConfig<MockDateModelConfig>) {
		return date({ ...config, faker: this.faker });
	}

	embed(config?: WithoutFakerConfig<MockEmbedModelConfig>) {
		return embed({ ...config, faker: this.faker });
	}

	geoPoint(config?: WithoutFakerConfig<MockGeoPointModelConfig>) {
		return geoPoint({ ...config, faker: this.faker });
	}

	group<Fields extends GroupFieldModelMap>(
		config?: WithoutFakerConfig<MockGroupModelConfig<Fields>>,
	) {
		return group({ ...config, faker: this.faker });
	}

	image<ThumbnailNames extends string = string>(
		config?: WithoutFakerConfig<MockImageModelConfig<ThumbnailNames>>,
	) {
		return image({ ...config, faker: this.faker });
	}

	integrationFields(
		config?: WithoutFakerConfig<MockIntegrationFieldsModelConfig>,
	) {
		return integrationFields({ ...config, faker: this.faker });
	}

	keyText(config?: WithoutFakerConfig<MockKeyTextModelConfig>) {
		return keyText({ ...config, faker: this.faker });
	}

	link<AllowTargetBlank extends boolean = boolean>(
		config?: WithoutFakerConfig<MockLinkModelConfig<AllowTargetBlank>>,
	) {
		return link({ ...config, faker: this.faker });
	}

	linkToMedia(config?: WithoutFakerConfig<MockLinkToMediaModelConfig>) {
		return linkToMedia({ ...config, faker: this.faker });
	}

	number(config?: WithoutFakerConfig<MockNumberModelConfig>) {
		return number({ ...config, faker: this.faker });
	}

	richText<WithMultipleBlocks extends boolean = boolean>(
		config?: WithoutFakerConfig<MockRichTextModelConfig<WithMultipleBlocks>>,
	) {
		return richText({ ...config, faker: this.faker });
	}

	select<Option extends string, DefaultOption extends Option>(
		config?: WithoutFakerConfig<MockSelectModelConfig<Option, DefaultOption>>,
	) {
		return select({ ...config, faker: this.faker });
	}

	sharedSlice<Variation extends prismicT.SharedSliceModelVariation>(
		config?: WithoutFakerConfig<MockSharedSliceModelConfig<Variation>>,
	) {
		return sharedSlice({ ...config, faker: this.faker });
	}

	sharedSliceChoice() {
		return sharedSliceChoice();
	}

	sharedSliceVariation<
		ID extends string,
		PrimaryFields extends GroupFieldModelMap,
		ItemsFields extends GroupFieldModelMap,
	>(
		config?: WithoutFakerConfig<
			MockSharedSliceVariationModelConfig<ID, PrimaryFields, ItemsFields>
		>,
	) {
		return sharedSliceVariation({ ...config, faker: this.faker });
	}

	slice<
		NonRepeatFields extends GroupFieldModelMap,
		RepeatFields extends GroupFieldModelMap,
	>(
		config?: WithoutFakerConfig<
			MockSliceModelConfig<NonRepeatFields, RepeatFields>
		>,
	) {
		return slice({ ...config, faker: this.faker });
	}

	sliceZone<
		Slices extends Record<
			string,
			prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
		>,
	>(config?: WithoutFakerConfig<MockSliceZoneModelConfig<Slices>>) {
		return sliceZone({ ...config, faker: this.faker });
	}

	timestamp(config?: WithoutFakerConfig<MockTimestampModelConfig>) {
		return timestamp({ ...config, faker: this.faker });
	}

	title(config?: WithoutFakerConfig<MockTitleModelConfig>) {
		return title({ ...config, faker: this.faker });
	}

	uid(config?: WithoutFakerConfig<MockUIDModelConfig>) {
		return uid({ ...config, faker: this.faker });
	}
}
