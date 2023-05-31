import * as prismicT from "@prismicio/types";
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

export type MockEmbedData = prismicT.AnyOEmbed &
	prismicT.OEmbedExtra & {
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
	| prismicT.CustomTypeModel
	| prismicT.CustomTypeModelField
	| prismicT.CustomTypeModelSlice
	| prismicT.SharedSliceModel
	| prismicT.SharedSliceModelVariation;

export type GroupFieldModelMap = Record<
	string,
	prismicT.CustomTypeModelFieldForGroup
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
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	state?: State;
};

export type MockValueConfigForModel<
	Model extends PrismicModel,
	State extends prismicT.FieldState = prismicT.FieldState,
> = Model extends prismicT.CustomTypeModelBooleanField
	? value.MockBooleanValueConfig<Model>
	: Model extends prismicT.CustomTypeModelColorField
	? value.MockColorValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelContentRelationshipField
	? value.MockContentRelationshipValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelDateField
	? value.MockDateValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelEmbedField
	? value.MockEmbedValueConfig<Model, prismicT.AnyOEmbed, State>
	: Model extends prismicT.CustomTypeModelGeoPointField
	? value.MockGeoPointValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelImageField
	? value.MockImageValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelKeyTextField
	? value.MockKeyTextValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelLinkField
	? value.MockLinkValueConfig<
			(typeof prismicT.LinkType)[keyof typeof prismicT.LinkType],
			Model,
			State
	  >
	: Model extends prismicT.CustomTypeModelLinkToMediaField
	? value.MockLinkToMediaValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelNumberField
	? value.MockNumberValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelRichTextField
	? value.MockRichTextValueConfig
	: Model extends prismicT.CustomTypeModelSelectField
	? value.MockSelectValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelTimestampField
	? value.MockTimestampValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelTitleField
	? value.MockTitleValueConfig<Model, State>
	: Model extends prismicT.CustomTypeModelUIDField
	? value.MockUIDValueConfig<Model>
	: never;

type CustomTypeModelStructuredTextField =
	| prismicT.CustomTypeModelRichTextField
	| prismicT.CustomTypeModelTitleField;

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
	T extends Record<string, prismicT.CustomTypeModelField>,
> = {
	[P in keyof T]: ModelValue<T[P]>;
};

export type ModelValue<
	T extends PrismicModel,
	State extends prismicT.FieldState = prismicT.FieldState,
> = T extends prismicT.CustomTypeModel
	? CustomTypeModelValue<T>
	: T extends prismicT.CustomTypeModelUIDField
	? prismicT.PrismicDocument["uid"]
	: T extends prismicT.CustomTypeModelFieldForGroup
	? CustomTypeModelFieldForGroupValue<T, State>
	: T extends prismicT.CustomTypeModelGroupField
	? CustomTypeModelGroupFieldValue<T, State>
	: T extends prismicT.CustomTypeModelSliceZoneField
	? prismicT.SliceZone<
			ValueOf<{
				[P in keyof NonNullable<T["config"]>["choices"] as P extends string
					? P
					: never]: NonNullable<
					T["config"]
				>["choices"][P] extends prismicT.CustomTypeModelSlice
					? CustomTypeModelSliceValue<
							NonNullable<T["config"]>["choices"][P],
							P extends string ? P : string
					  >
					: NonNullable<
							T["config"]
					  >["choices"][P] extends prismicT.CustomTypeModelSharedSlice
					? prismicT.SharedSlice<P extends string ? P : string>
					: never;
			}>,
			State
	  >
	: T extends prismicT.CustomTypeModelSlice
	? CustomTypeModelSliceValue<T>
	: T extends prismicT.CustomTypeModelSharedSlice
	? // TODO: Allow providing a union of of Shared Slices
	  prismicT.SharedSlice
	: T extends prismicT.SharedSliceModel
	? SharedSliceModelValue<T>
	: T extends prismicT.SharedSliceModelVariation
	? SharedSliceModelVariationValue<T>
	: never;

type CustomTypeModelValue<T extends prismicT.CustomTypeModel> =
	prismicT.PrismicDocument<
		ModelValueMap<{
			[P in keyof ValueOf<T["json"]> as ValueOf<
				T["json"]
			>[P]["type"] extends typeof prismicT.CustomTypeModelFieldType.UID
				? never
				: P]: ValueOf<T["json"]>[P];
		}>
	>;

type CustomTypeModelFieldForGroupValue<
	T extends prismicT.CustomTypeModelFieldForGroup,
	State extends prismicT.FieldState = prismicT.FieldState,
> = T extends prismicT.CustomTypeModelBooleanField
	? prismicT.BooleanField
	: T extends prismicT.CustomTypeModelColorField
	? prismicT.ColorField<State>
	: T extends prismicT.CustomTypeModelRichTextField
	? prismicT.RichTextField<State>
	: T extends prismicT.CustomTypeModelTitleField
	? prismicT.TitleField<State>
	: T extends prismicT.CustomTypeModelImageField<infer TThumbnailNames>
	? prismicT.ImageField<TThumbnailNames, State>
	: T extends prismicT.CustomTypeModelLinkField
	? prismicT.LinkField<string, string, never, State>
	: T extends prismicT.CustomTypeModelLinkToMediaField
	? prismicT.LinkToMediaField<State>
	: T extends prismicT.CustomTypeModelContentRelationshipField
	? prismicT.RelationField<string, string, never, State>
	: T extends prismicT.CustomTypeModelDateField
	? prismicT.DateField<State>
	: T extends prismicT.CustomTypeModelTimestampField
	? prismicT.TimestampField<State>
	: T extends prismicT.CustomTypeModelNumberField
	? prismicT.NumberField<State>
	: T extends prismicT.CustomTypeModelKeyTextField
	? prismicT.KeyTextField<State>
	: T extends prismicT.CustomTypeModelSelectField
	? prismicT.SelectField<string, State>
	: T extends prismicT.CustomTypeModelEmbedField
	? prismicT.EmbedField<prismicT.AnyOEmbed & prismicT.OEmbedExtra, State>
	: T extends prismicT.CustomTypeModelGeoPointField
	? prismicT.GeoPointField<State>
	: T extends prismicT.CustomTypeModelIntegrationFieldsField
	? prismicT.IntegrationFields<Record<string, unknown>, State>
	: never;

type CustomTypeModelGroupFieldValue<
	T extends prismicT.CustomTypeModelGroupField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.GroupField<
	ModelValueMap<NonNullable<NonNullable<T["config"]>["fields"]>>,
	State
>;

type CustomTypeModelSliceValue<
	T extends prismicT.CustomTypeModelSlice,
	SliceType = string,
> = prismicT.Slice<
	SliceType,
	ModelValueMap<NonNullable<T["non-repeat"]>>,
	ModelValueMap<NonNullable<T["repeat"]>>
>;

type SharedSliceModelValue<T extends prismicT.SharedSliceModel> =
	prismicT.SharedSlice<
		T["id"],
		SharedSliceModelVariationValue<
			IterableElement<NonNullable<T["variations"]>>
		>
	>;

type SharedSliceModelVariationValue<
	T extends prismicT.SharedSliceModelVariation,
> = prismicT.SharedSlice<
	string,
	prismicT.SharedSliceVariation<
		T["id"],
		ModelValueMap<NonNullable<T["primary"]>>,
		ModelValueMap<NonNullable<T["items"]>>
	>
>;
