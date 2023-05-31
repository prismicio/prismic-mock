import * as prismicT from "@prismicio/types";

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

	boolean<Model extends prismicT.CustomTypeModelBooleanField>(
		config?: WithoutFakerConfig<MockBooleanValueConfig<Model>>,
	) {
		return boolean({ ...config, faker: this.faker });
	}

	color<
		Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockColorValueConfig<Model, State>>) {
		return color({ ...config, faker: this.faker });
	}

	contentRelationship<
		Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
		State extends prismicT.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<
			MockContentRelationshipValueConfig<Model, State>
		>,
	) {
		return contentRelationship({ ...config, faker: this.faker });
	}

	customType<Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel>(
		config?: WithoutFakerConfig<MockCustomTypeValueConfig<Model>>,
	) {
		return customType({ ...config, faker: this.faker });
	}

	date<
		Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockDateValueConfig<Model, State>>) {
		return date({ ...config, faker: this.faker });
	}

	document<Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel>(
		config?: WithoutFakerConfig<MockDocumentValueConfig<Model>>,
	) {
		return document({ ...config, faker: this.faker });
	}

	embed<
		Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
		Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockEmbedValueConfig<Model, Data, State>>) {
		return embed({ ...config, faker: this.faker });
	}

	geoPoint<
		Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGeoPointValueConfig<Model, State>>) {
		return geoPoint({ ...config, faker: this.faker });
	}

	group<
		Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockGroupValueConfig<Model, State>>) {
		return group({ ...config, faker: this.faker });
	}

	image<
		Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockImageValueConfig<Model, State>>) {
		return image({ ...config, faker: this.faker });
	}

	integrationFields<
		Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
		Data extends Record<string, unknown> = Record<string, unknown>,
		State extends prismicT.FieldState = "filled",
	>(
		config?: WithoutFakerConfig<
			MockIntegrationFieldsValueConfig<Model, Data, State>
		>,
	) {
		return integrationFields({ ...config, faker: this.faker });
	}

	keyText<
		Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockKeyTextValueConfig<Model, State>>) {
		return keyText({ ...config, faker: this.faker });
	}

	link<
		LinkType extends (typeof prismicT.LinkType)[keyof typeof prismicT.LinkType] = (typeof prismicT.LinkType)[keyof typeof prismicT.LinkType],
		Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockLinkValueConfig<LinkType, Model, State>>) {
		return link({ ...config, faker: this.faker });
	}

	linkToMedia<
		Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockLinkToMediaValueConfig<Model, State>>) {
		return linkToMedia({ ...config, faker: this.faker });
	}

	number<
		Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockNumberValueConfig<Model, State>>) {
		return number({ ...config, faker: this.faker });
	}

	select<
		Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockSelectValueConfig<Model, State>>) {
		return select({ ...config, faker: this.faker });
	}

	sharedSlice<
		Model extends prismicT.SharedSliceModel = prismicT.SharedSliceModel,
	>(config?: WithoutFakerConfig<MockSharedSliceValueConfig<Model>>) {
		return sharedSlice({ ...config, faker: this.faker });
	}

	sharedSliceVariation<
		Model extends prismicT.SharedSliceModelVariation = prismicT.SharedSliceModelVariation,
	>(config?: WithoutFakerConfig<MockSharedSliceVariationValueConfig<Model>>) {
		return sharedSliceVariation({ ...config, faker: this.faker });
	}

	slice<
		Model extends prismicT.CustomTypeModelSlice = prismicT.CustomTypeModelSlice,
	>(config?: WithoutFakerConfig<MockSliceValueConfig<Model>>) {
		return slice({ ...config, faker: this.faker });
	}

	sliceZone<
		Model extends prismicT.CustomTypeModelSliceZoneField = prismicT.CustomTypeModelSliceZoneField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockSliceZoneValueConfig<Model, State>>) {
		return sliceZone({ ...config, faker: this.faker });
	}

	timestamp<
		Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockTimestampValueConfig<Model, State>>) {
		return timestamp({ ...config, faker: this.faker });
	}

	title<
		Model extends prismicT.CustomTypeModelTitleField = prismicT.CustomTypeModelTitleField,
		State extends prismicT.FieldState = "filled",
	>(config?: WithoutFakerConfig<MockTitleValueConfig<Model, State>>) {
		return title({ ...config, faker: this.faker });
	}

	uid<
		Model extends prismicT.CustomTypeModelUIDField = prismicT.CustomTypeModelUIDField,
	>(config?: WithoutFakerConfig<MockUIDValueConfig<Model>>) {
		return uid({ ...config, faker: this.faker });
	}

	richText<
		Model extends prismicT.CustomTypeModelRichTextField = prismicT.CustomTypeModelRichTextField,
	>(config?: WithoutFakerConfig<MockRichTextValueConfig<Model>>) {
		return richText({ ...config, faker: this.faker });
	}
}
