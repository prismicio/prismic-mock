import * as prismic from "@prismicio/client";

import { createFaker, Faker } from "../lib/createFaker";

import { Seed, WithoutFakerConfig } from "../types";

import { boolean, MockBooleanValueConfig } from "./boolean";
import { color, MockColorValueConfig } from "./color";
import {
	contentRelationship,
	MockContentRelationshipValueConfig,
} from "./contentRelationship";
import { customType, MockCustomTypeValueConfig } from "./customType";
import { date, MockDateValueConfig } from "./date";
import { document, MockDocumentValueConfig } from "./document";
import { embed, MockEmbedValueConfig } from "./embed";
import { geoPoint, MockGeoPointValueConfig } from "./geoPoint";
import { group, MockGroupValueConfig } from "./group";
import { image, MockImageValueConfig } from "./image";
import {
	integrationFields,
	MockIntegrationFieldsValueConfig,
} from "./integrationFields";
import { keyText, MockKeyTextValueConfig } from "./keyText";
import { link, MockLinkValueConfig } from "./link";
import { linkToMedia, MockLinkToMediaValueConfig } from "./linkToMedia";
import { number, MockNumberValueConfig } from "./number";
import { richText, MockRichTextValueConfig } from "./richText";
import { select, MockSelectValueConfig } from "./select";
import { sharedSlice, MockSharedSliceValueConfig } from "./sharedSlice";
import {
	sharedSliceVariation,
	MockSharedSliceVariationValueConfig,
} from "./sharedSliceVariation";
import { slice, MockSliceValueConfig } from "./slice";
import { sliceZone, MockSliceZoneValueConfig } from "./sliceZone";
import { timestamp, MockTimestampValueConfig } from "./timestamp";
import { title, MockTitleValueConfig } from "./title";
import { uid, MockUIDValueConfig } from "./uid";

export const createValueMockFactory = (
	...args: ConstructorParameters<typeof ValueMockFactory>
): ValueMockFactory => {
	return new ValueMockFactory(...args);
};

type ValueMockFactoryConfig =
	| {
			seed: Seed;
	  }
	| {
			faker: Faker;
	  };

export class ValueMockFactory {
	private faker: Faker;

	constructor(config: ValueMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed);
	}

	get seed() {
		return this.faker.seed;
	}

	boolean<Model extends prismic.CustomTypeModelBooleanField>(
		config?: WithoutFakerConfig<MockBooleanValueConfig<Model>>,
	) {
		return boolean({ ...config, faker: this.faker });
	}

	color<
		Model extends prismic.CustomTypeModelColorField = prismic.CustomTypeModelColorField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockColorValueConfig<Model, State>>) {
		return color({ ...config, faker: this.faker });
	}

	contentRelationship<
		Model extends prismic.CustomTypeModelContentRelationshipField = prismic.CustomTypeModelContentRelationshipField,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<
			MockContentRelationshipValueConfig<Model, State>
		>,
	) {
		return contentRelationship({ ...config, faker: this.faker });
	}

	customType<Model extends prismic.CustomTypeModel = prismic.CustomTypeModel>(
		config?: WithoutFakerConfig<MockCustomTypeValueConfig<Model>>,
	) {
		return customType({ ...config, faker: this.faker });
	}

	date<
		Model extends prismic.CustomTypeModelDateField = prismic.CustomTypeModelDateField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockDateValueConfig<Model, State>>) {
		return date({ ...config, faker: this.faker });
	}

	document<Model extends prismic.CustomTypeModel = prismic.CustomTypeModel>(
		config?: WithoutFakerConfig<MockDocumentValueConfig<Model>>,
	) {
		return document({ ...config, faker: this.faker });
	}

	embed<
		Model extends prismic.CustomTypeModelEmbedField = prismic.CustomTypeModelEmbedField,
		Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockEmbedValueConfig<Model, Data, State>>) {
		return embed({ ...config, faker: this.faker });
	}

	geoPoint<
		Model extends prismic.CustomTypeModelGeoPointField = prismic.CustomTypeModelGeoPointField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGeoPointValueConfig<Model, State>>) {
		return geoPoint({ ...config, faker: this.faker });
	}

	group<
		Model extends prismic.CustomTypeModelGroupField = prismic.CustomTypeModelGroupField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGroupValueConfig<Model, State>>) {
		return group({ ...config, faker: this.faker });
	}

	image<
		Model extends prismic.CustomTypeModelImageField = prismic.CustomTypeModelImageField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockImageValueConfig<Model, State>>) {
		return image({ ...config, faker: this.faker });
	}

	integrationFields<
		Model extends prismic.CustomTypeModelIntegrationFieldsField = prismic.CustomTypeModelIntegrationFieldsField,
		Data extends Record<string, unknown> = Record<string, unknown>,
		State extends prismic.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<
			MockIntegrationFieldsValueConfig<Model, Data, State>
		>,
	) {
		return integrationFields({ ...config, faker: this.faker });
	}

	keyText<
		Model extends prismic.CustomTypeModelKeyTextField = prismic.CustomTypeModelKeyTextField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockKeyTextValueConfig<Model, State>>) {
		return keyText({ ...config, faker: this.faker });
	}

	link<
		LinkType extends (typeof prismic.LinkType)[keyof typeof prismic.LinkType] = (typeof prismic.LinkType)[keyof typeof prismic.LinkType],
		Model extends prismic.CustomTypeModelLinkField = prismic.CustomTypeModelLinkField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockLinkValueConfig<LinkType, Model, State>>) {
		return link({ ...config, faker: this.faker });
	}

	linkToMedia<
		Model extends prismic.CustomTypeModelLinkToMediaField = prismic.CustomTypeModelLinkToMediaField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockLinkToMediaValueConfig<Model, State>>) {
		return linkToMedia({ ...config, faker: this.faker });
	}

	number<
		Model extends prismic.CustomTypeModelNumberField = prismic.CustomTypeModelNumberField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockNumberValueConfig<Model, State>>) {
		return number({ ...config, faker: this.faker });
	}

	select<
		Model extends prismic.CustomTypeModelSelectField = prismic.CustomTypeModelSelectField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockSelectValueConfig<Model, State>>) {
		return select({ ...config, faker: this.faker });
	}

	sharedSlice<
		Model extends prismic.SharedSliceModel = prismic.SharedSliceModel,
	>(config?: WithoutFakerConfig<MockSharedSliceValueConfig<Model>>) {
		return sharedSlice({ ...config, faker: this.faker });
	}

	sharedSliceVariation<
		Model extends prismic.SharedSliceModelVariation = prismic.SharedSliceModelVariation,
	>(config?: WithoutFakerConfig<MockSharedSliceVariationValueConfig<Model>>) {
		return sharedSliceVariation({ ...config, faker: this.faker });
	}

	slice<
		Model extends prismic.CustomTypeModelSlice = prismic.CustomTypeModelSlice,
	>(config?: WithoutFakerConfig<MockSliceValueConfig<Model>>) {
		return slice({ ...config, faker: this.faker });
	}

	sliceZone<
		Model extends prismic.CustomTypeModelSliceZoneField = prismic.CustomTypeModelSliceZoneField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockSliceZoneValueConfig<Model, State>>) {
		return sliceZone({ ...config, faker: this.faker });
	}

	timestamp<
		Model extends prismic.CustomTypeModelTimestampField = prismic.CustomTypeModelTimestampField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockTimestampValueConfig<Model, State>>) {
		return timestamp({ ...config, faker: this.faker });
	}

	title<
		Model extends prismic.CustomTypeModelTitleField = prismic.CustomTypeModelTitleField,
		State extends prismic.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockTitleValueConfig<Model, State>>) {
		return title({ ...config, faker: this.faker });
	}

	uid<
		Model extends prismic.CustomTypeModelUIDField = prismic.CustomTypeModelUIDField,
	>(config?: WithoutFakerConfig<MockUIDValueConfig<Model>>) {
		return uid({ ...config, faker: this.faker });
	}

	richText<
		Model extends prismic.CustomTypeModelRichTextField = prismic.CustomTypeModelRichTextField,
	>(config?: WithoutFakerConfig<MockRichTextValueConfig<Model>>) {
		return richText({ ...config, faker: this.faker });
	}
}
