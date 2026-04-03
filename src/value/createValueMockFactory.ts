import type * as prismic from "@prismicio/client"

import { createFaker, type Faker } from "../lib/createFaker"
import type { ModelValue, Seed, WithoutFakerConfig } from "../types"
import { boolean, type MockBooleanValueConfig } from "./boolean"
import { color, type MockColorValue, type MockColorValueConfig } from "./color"
import {
	contentRelationship,
	type MockContentRelationshipValue,
	type MockContentRelationshipValueConfig,
} from "./contentRelationship"
import { customType, type MockCustomTypeValueConfig } from "./customType"
import { date, type MockDateValue, type MockDateValueConfig } from "./date"
import { document, type MockDocumentValueConfig } from "./document"
import { embed, type MockEmbedValue, type MockEmbedValueConfig } from "./embed"
import { geoPoint, type MockGeoPointValue, type MockGeoPointValueConfig } from "./geoPoint"
import { group, type MockGroupValueConfig } from "./group"
import { image, type MockImageValue, type MockImageValueConfig } from "./image"
import {
	integration,
	type MockIntegrationFieldValue,
	type MockIntegrationFieldValueConfig,
} from "./integration"
import { keyText, type MockKeyTextValue, type MockKeyTextValueConfig } from "./keyText"
import { link, type MockLinkValue, type MockLinkValueConfig } from "./link"
import {
	linkToMedia,
	type MockLinkToMediaValue,
	type MockLinkToMediaValueConfig,
} from "./linkToMedia"
import { number, type MockNumberValue, type MockNumberValueConfig } from "./number"
import { richText, type MockRichTextValue, type MockRichTextValueConfig } from "./richText"
import { select, type MockSelectValue, type MockSelectValueConfig } from "./select"
import { sharedSlice, type MockSharedSliceValueConfig } from "./sharedSlice"
import {
	sharedSliceVariation,
	type MockSharedSliceVariationValueConfig,
} from "./sharedSliceVariation"
import { slice, type MockSliceValueConfig } from "./slice"
import { sliceZone, type MockSliceZoneValueConfig } from "./sliceZone"
import { table, type MockTableValue, type MockTableValueConfig } from "./table"
import { timestamp, type MockTimestampValue, type MockTimestampValueConfig } from "./timestamp"
import { title, type MockTitleValue, type MockTitleValueConfig } from "./title"
import { uid, type MockUIDValueConfig } from "./uid"

export const createValueMockFactory = (
	...args: ConstructorParameters<typeof ValueMockFactory>
): ValueMockFactory => {
	return new ValueMockFactory(...args)
}

type ValueMockFactoryConfig =
	| {
			seed: Seed
	  }
	| {
			faker: Faker
	  }

export class ValueMockFactory {
	private faker: Faker

	constructor(config: ValueMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed)
	}

	get seed(): Seed {
		return this.faker.seed
	}

	boolean<Model extends prismic.CustomTypeModelBooleanField>(
		config?: WithoutFakerConfig<MockBooleanValueConfig<Model>>,
	): prismic.BooleanField {
		return boolean({ ...config, faker: this.faker })
	}

	color<
		Model extends prismic.CustomTypeModelColorField = prismic.CustomTypeModelColorField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockColorValueConfig<Model, State>>): MockColorValue<State> {
		return color({ ...config, faker: this.faker })
	}

	contentRelationship<
		Model extends prismic.CustomTypeModelContentRelationshipField =
			prismic.CustomTypeModelContentRelationshipField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockContentRelationshipValueConfig<Model, State>>,
	): MockContentRelationshipValue<Model, State> {
		return contentRelationship({ ...config, faker: this.faker })
	}

	customType<Model extends prismic.CustomTypeModel = prismic.CustomTypeModel>(
		config?: WithoutFakerConfig<MockCustomTypeValueConfig<Model>>,
	): ModelValue<Model> {
		return customType({ ...config, faker: this.faker })
	}

	date<
		Model extends prismic.CustomTypeModelDateField = prismic.CustomTypeModelDateField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockDateValueConfig<Model, State>>): MockDateValue<State> {
		return date({ ...config, faker: this.faker })
	}

	document<Model extends prismic.CustomTypeModel = prismic.CustomTypeModel>(
		config?: WithoutFakerConfig<MockDocumentValueConfig<Model>>,
	): ModelValue<Model> {
		return document({ ...config, faker: this.faker })
	}

	embed<
		Model extends prismic.CustomTypeModelEmbedField = prismic.CustomTypeModelEmbedField,
		Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockEmbedValueConfig<Model, Data, State>>,
	): MockEmbedValue<Data, State> {
		return embed({ ...config, faker: this.faker })
	}

	geoPoint<
		Model extends prismic.CustomTypeModelGeoPointField = prismic.CustomTypeModelGeoPointField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGeoPointValueConfig<Model, State>>): MockGeoPointValue<State> {
		return geoPoint({ ...config, faker: this.faker })
	}

	group<
		Model extends prismic.CustomTypeModelGroupField = prismic.CustomTypeModelGroupField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGroupValueConfig<Model, State>>): ModelValue<Model, State> {
		return group({ ...config, faker: this.faker })
	}

	image<
		Model extends prismic.CustomTypeModelImageField = prismic.CustomTypeModelImageField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockImageValueConfig<Model, State>>): MockImageValue<Model, State> {
		return image({ ...config, faker: this.faker })
	}

	integration<
		Model extends prismic.CustomTypeModelIntegrationField = prismic.CustomTypeModelIntegrationField,
		Data extends Record<string, unknown> = Record<string, unknown>,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockIntegrationFieldValueConfig<Model, Data, State>>,
	): MockIntegrationFieldValue<Data, State> {
		return integration({ ...config, faker: this.faker })
	}

	keyText<
		Model extends prismic.CustomTypeModelKeyTextField = prismic.CustomTypeModelKeyTextField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockKeyTextValueConfig<Model, State>>): MockKeyTextValue<State> {
		return keyText({ ...config, faker: this.faker })
	}

	link<
		LinkType extends (typeof prismic.LinkType)[keyof typeof prismic.LinkType] =
			(typeof prismic.LinkType)[keyof typeof prismic.LinkType],
		Model extends prismic.CustomTypeModelLinkField = prismic.CustomTypeModelLinkField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockLinkValueConfig<LinkType, Model, State>>,
	): MockLinkValue<LinkType, State> {
		return link({ ...config, faker: this.faker })
	}

	linkToMedia<
		Model extends prismic.CustomTypeModelLinkToMediaField = prismic.CustomTypeModelLinkToMediaField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockLinkToMediaValueConfig<Model, State>>,
	): MockLinkToMediaValue<State> {
		return linkToMedia({ ...config, faker: this.faker })
	}

	number<
		Model extends prismic.CustomTypeModelNumberField = prismic.CustomTypeModelNumberField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockNumberValueConfig<Model, State>>): MockNumberValue<State> {
		return number({ ...config, faker: this.faker })
	}

	richText<
		Model extends prismic.CustomTypeModelRichTextField = prismic.CustomTypeModelRichTextField,
	>(config?: WithoutFakerConfig<MockRichTextValueConfig<Model>>): MockRichTextValue {
		return richText({ ...config, faker: this.faker })
	}

	select<
		Model extends prismic.CustomTypeModelSelectField = prismic.CustomTypeModelSelectField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockSelectValueConfig<Model, State>>,
	): MockSelectValue<Model, State> {
		return select({ ...config, faker: this.faker })
	}

	sharedSlice<Model extends prismic.SharedSliceModel = prismic.SharedSliceModel>(
		config?: WithoutFakerConfig<MockSharedSliceValueConfig<Model>>,
	): ModelValue<Model> {
		return sharedSlice({ ...config, faker: this.faker })
	}

	sharedSliceVariation<
		Model extends prismic.SharedSliceModelVariation = prismic.SharedSliceModelVariation,
	>(config?: WithoutFakerConfig<MockSharedSliceVariationValueConfig<Model>>): ModelValue<Model> {
		return sharedSliceVariation({ ...config, faker: this.faker })
	}

	slice<Model extends prismic.CustomTypeModelSlice = prismic.CustomTypeModelSlice>(
		config?: WithoutFakerConfig<MockSliceValueConfig<Model>>,
	): ModelValue<Model> {
		return slice({ ...config, faker: this.faker })
	}

	sliceZone<
		Model extends prismic.CustomTypeModelSliceZoneField = prismic.CustomTypeModelSliceZoneField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockSliceZoneValueConfig<Model, State>>): ModelValue<Model, State> {
		return sliceZone({ ...config, faker: this.faker })
	}

	table<Model extends prismic.CustomTypeModelTableField = prismic.CustomTypeModelTableField>(
		config?: WithoutFakerConfig<MockTableValueConfig<Model>>,
	): MockTableValue {
		return table({ ...config, faker: this.faker })
	}

	timestamp<
		Model extends prismic.CustomTypeModelTimestampField = prismic.CustomTypeModelTimestampField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<MockTimestampValueConfig<Model, State>>,
	): MockTimestampValue<State> {
		return timestamp({ ...config, faker: this.faker })
	}

	title<
		Model extends prismic.CustomTypeModelTitleField = prismic.CustomTypeModelTitleField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockTitleValueConfig<Model, State>>): MockTitleValue<State> {
		return title({ ...config, faker: this.faker })
	}

	uid<Model extends prismic.CustomTypeModelUIDField = prismic.CustomTypeModelUIDField>(
		config?: WithoutFakerConfig<MockUIDValueConfig<Model>>,
	): NonNullable<prismic.PrismicDocument["uid"]> {
		return uid({ ...config, faker: this.faker })
	}
}
