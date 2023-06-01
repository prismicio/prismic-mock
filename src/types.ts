import * as prismic from "@prismicio/client";
import { Faker } from "./lib/createFaker";

import * as value from "./value";

export type IterableElement<TargetIterable> = TargetIterable extends Iterable<
	infer ElementType
>
	? ElementType
	: TargetIterable extends AsyncIterable<infer ElementType>
	? ElementType
	: never;

export type ValueOf<
	ObjectType,
	ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };
type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
	ObjectType,
	Exclude<keyof ObjectType, KeysType>
>;
export type SetRequired<BaseType, Keys extends keyof BaseType> = Simplify<
	// Pick just the keys that are optional from the base type.
	Except<BaseType, Keys> &
		// Pick the keys that should be required from the base type and make them required.
		Required<Pick<BaseType, Keys>>
>;

export type Seed = string | number;

export type WithoutFakerConfig<T> = {
	[P in keyof T as P extends "seed" | "faker" ? never : P]: T[P];
};

export interface MockImageData {
	url: string;
	width: number;
	height: number;
}

export type MockEmbedData = prismic.AnyOEmbed &
	prismic.OEmbedExtra & {
		embed_url: string;
		html: string;
	};

export type MockRestApiConfig =
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  };

export type MockModelConfig =
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  };

// TODO: Add to @prismicio/types
export type PrismicModel =
	| prismic.CustomTypeModel
	| prismic.CustomTypeModelField
	| prismic.CustomTypeModelSlice
	| prismic.SharedSliceModel
	| prismic.SharedSliceModelVariation;

export type GroupFieldModelMap = Record<
	string,
	prismic.CustomTypeModelFieldForGroup
>;

export type MockValueConfig<Model extends PrismicModel = PrismicModel> = {
	model?: Model;
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

export type MockValueStateConfig<
	State extends prismic.FieldState = prismic.FieldState,
> = {
	state?: State;
};

export type MockValueConfigForModel<
	Model extends PrismicModel,
	State extends prismic.FieldState = prismic.FieldState,
> = Model extends prismic.CustomTypeModelBooleanField
	? value.MockBooleanValueConfig<Model>
	: Model extends prismic.CustomTypeModelColorField
	? value.MockColorValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelContentRelationshipField
	? value.MockContentRelationshipValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelDateField
	? value.MockDateValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelEmbedField
	? value.MockEmbedValueConfig<Model, prismic.AnyOEmbed, State>
	: Model extends prismic.CustomTypeModelGeoPointField
	? value.MockGeoPointValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelImageField
	? value.MockImageValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelKeyTextField
	? value.MockKeyTextValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelLinkField
	? value.MockLinkValueConfig<
			(typeof prismic.LinkType)[keyof typeof prismic.LinkType],
			Model,
			State
	  >
	: Model extends prismic.CustomTypeModelLinkToMediaField
	? value.MockLinkToMediaValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelNumberField
	? value.MockNumberValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelRichTextField
	? value.MockRichTextValueConfig
	: Model extends prismic.CustomTypeModelSelectField
	? value.MockSelectValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelTimestampField
	? value.MockTimestampValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelTitleField
	? value.MockTitleValueConfig<Model, State>
	: Model extends prismic.CustomTypeModelUIDField
	? value.MockUIDValueConfig<Model>
	: never;

type CustomTypeModelStructuredTextField =
	| prismic.CustomTypeModelRichTextField
	| prismic.CustomTypeModelTitleField;

export type MockRichTextValueConfig<
	Model extends CustomTypeModelStructuredTextField = CustomTypeModelStructuredTextField,
> = {
	model?: Model;
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

export type ModelValueMap<
	T extends Record<string, prismic.CustomTypeModelField>,
> = {
	[P in keyof T]: ModelValue<T[P]>;
};

export type ModelValue<
	T extends PrismicModel,
	State extends prismic.FieldState = prismic.FieldState,
> = T extends prismic.CustomTypeModel
	? CustomTypeModelValue<T>
	: T extends prismic.CustomTypeModelUIDField
	? prismic.PrismicDocument["uid"]
	: T extends prismic.CustomTypeModelFieldForGroup
	? CustomTypeModelFieldForGroupValue<T, State>
	: T extends prismic.CustomTypeModelGroupField
	? CustomTypeModelGroupFieldValue<T, State>
	: T extends prismic.CustomTypeModelSliceZoneField
	? prismic.SliceZone<
			ValueOf<{
				[P in keyof NonNullable<T["config"]>["choices"] as P extends string
					? P
					: never]: NonNullable<
					T["config"]
				>["choices"][P] extends prismic.CustomTypeModelSlice
					? CustomTypeModelSliceValue<
							NonNullable<T["config"]>["choices"][P],
							P extends string ? P : string
					  >
					: NonNullable<
							T["config"]
					  >["choices"][P] extends prismic.CustomTypeModelSharedSlice
					? prismic.SharedSlice<P extends string ? P : string>
					: never;
			}>,
			State
	  >
	: T extends prismic.CustomTypeModelSlice
	? CustomTypeModelSliceValue<T>
	: T extends prismic.CustomTypeModelSharedSlice
	? // TODO: Allow providing a union of of Shared Slices
	  prismic.SharedSlice
	: T extends prismic.SharedSliceModel
	? SharedSliceModelValue<T>
	: T extends prismic.SharedSliceModelVariation
	? SharedSliceModelVariationValue<T>
	: never;

type CustomTypeModelValue<T extends prismic.CustomTypeModel> =
	prismic.PrismicDocument<
		ModelValueMap<{
			[P in keyof ValueOf<T["json"]> as ValueOf<
				T["json"]
			>[P]["type"] extends typeof prismic.CustomTypeModelFieldType.UID
				? never
				: P]: ValueOf<T["json"]>[P];
		}>
	>;

type CustomTypeModelFieldForGroupValue<
	T extends prismic.CustomTypeModelFieldForGroup,
	State extends prismic.FieldState = prismic.FieldState,
> = T extends prismic.CustomTypeModelBooleanField
	? prismic.BooleanField
	: T extends prismic.CustomTypeModelColorField
	? prismic.ColorField<State>
	: T extends prismic.CustomTypeModelRichTextField
	? prismic.RichTextField<State>
	: T extends prismic.CustomTypeModelTitleField
	? prismic.TitleField<State>
	: T extends prismic.CustomTypeModelImageField<infer TThumbnailNames>
	? prismic.ImageField<TThumbnailNames, State>
	: T extends prismic.CustomTypeModelLinkField
	? prismic.LinkField<string, string, never, State>
	: T extends prismic.CustomTypeModelLinkToMediaField
	? prismic.LinkToMediaField<State>
	: T extends prismic.CustomTypeModelContentRelationshipField
	? prismic.ContentRelationshipField<string, string, never, State>
	: T extends prismic.CustomTypeModelDateField
	? prismic.DateField<State>
	: T extends prismic.CustomTypeModelTimestampField
	? prismic.TimestampField<State>
	: T extends prismic.CustomTypeModelNumberField
	? prismic.NumberField<State>
	: T extends prismic.CustomTypeModelKeyTextField
	? prismic.KeyTextField<State>
	: T extends prismic.CustomTypeModelSelectField
	? prismic.SelectField<string, State>
	: T extends prismic.CustomTypeModelEmbedField
	? prismic.EmbedField<prismic.AnyOEmbed & prismic.OEmbedExtra, State>
	: T extends prismic.CustomTypeModelGeoPointField
	? prismic.GeoPointField<State>
	: T extends prismic.CustomTypeModelIntegrationField
	? prismic.IntegrationField<Record<string, unknown>, State>
	: never;

type CustomTypeModelGroupFieldValue<
	T extends prismic.CustomTypeModelGroupField,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.GroupField<
	ModelValueMap<NonNullable<NonNullable<T["config"]>["fields"]>>,
	State
>;

type CustomTypeModelSliceValue<
	T extends prismic.CustomTypeModelSlice,
	SliceType = string,
> = prismic.Slice<
	SliceType,
	ModelValueMap<NonNullable<T["non-repeat"]>>,
	ModelValueMap<NonNullable<T["repeat"]>>
>;

type SharedSliceModelValue<T extends prismic.SharedSliceModel> =
	prismic.SharedSlice<
		T["id"],
		SharedSliceModelVariationValue<
			IterableElement<NonNullable<T["variations"]>>
		>
	>;

type SharedSliceModelVariationValue<
	T extends prismic.SharedSliceModelVariation,
> = prismic.SharedSlice<
	string,
	prismic.SharedSliceVariation<
		T["id"],
		ModelValueMap<NonNullable<T["primary"]>>,
		ModelValueMap<NonNullable<T["items"]>>
	>
>;
