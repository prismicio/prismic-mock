import * as prismicT from "@prismicio/types";

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

export type Seed = string | number | number[];

export interface MockImageData {
	url: string;
	width: number;
	height: number;
}

export interface MockEmbedData {
	url: string;
	embed_url: string;
	html: string;
	thumbnail_url: string | null;
	thumbnail_height: number | null;
	thumbnail_width: number | null;
}

export type MockRestApiConfig = {
	seed?: Seed;
};

export type MockModelConfig = {
	seed?: Seed;
};

// TODO: Add to @prismicio/types
export type PrismicModel =
	| prismicT.CustomTypeModel
	| prismicT.CustomTypeModelField
	| prismicT.CustomTypeModelSlice
	| prismicT.SharedSliceModel
	| prismicT.SharedSliceModelVariation;

export type MockValueConfig<Model extends PrismicModel = PrismicModel> = {
	seed?: Seed;
	model?: Model;
};

export type IsEmptyMockValueConfig<IsEmpty extends boolean = boolean> = {
	isEmpty?: IsEmpty;
};

export type MockValueConfigForModel<Model extends PrismicModel> =
	Model extends prismicT.CustomTypeModelBooleanField
		? value.MockBooleanValueConfig
		: Model extends prismicT.CustomTypeModelColorField
		? value.MockColorValueConfig
		: Model extends prismicT.CustomTypeModelContentRelationshipField
		? value.MockContentRelationshipValueConfig
		: Model extends prismicT.CustomTypeModelDateField
		? value.MockDateValueConfig
		: Model extends prismicT.CustomTypeModelEmbedField
		? value.MockEmbedValueConfig
		: Model extends prismicT.CustomTypeModelGeoPointField
		? value.MockGeoPointValueConfig
		: Model extends prismicT.CustomTypeModelImageField
		? value.MockImageValueConfig
		: Model extends prismicT.CustomTypeModelKeyTextField
		? value.MockKeyTextValueConfig
		: Model extends prismicT.CustomTypeModelLinkField
		? value.MockLinkValueConfig
		: Model extends prismicT.CustomTypeModelLinkToMediaField
		? value.MockLinkToMediaValueConfig
		: Model extends prismicT.CustomTypeModelNumberField
		? value.MockNumberValueConfig
		: Model extends prismicT.CustomTypeModelRichTextField
		? value.MockRichTextValueConfig
		: Model extends prismicT.CustomTypeModelSelectField
		? value.MockSelectValueConfig
		: Model extends prismicT.CustomTypeModelTimestampField
		? value.MockTimestampValueConfig
		: Model extends prismicT.CustomTypeModelTitleField
		? value.MockTitleValueConfig
		: Model extends prismicT.CustomTypeModelUIDField
		? value.MockUIDValueConfig
		: never;

type CustomTypeModelStructuredTextField =
	| prismicT.CustomTypeModelRichTextField
	| prismicT.CustomTypeModelTitleField;

export type MockRichTextValueConfig<
	Model extends CustomTypeModelStructuredTextField = CustomTypeModelStructuredTextField,
> = {
	seed?: Seed;
	model?: Model;
};

export type ModelValueMap<
	T extends Record<string, prismicT.CustomTypeModelField>,
> = {
	[P in keyof T]: ModelValue<T[P]>;
};

export type ModelValue<T extends PrismicModel> =
	T extends prismicT.CustomTypeModel
		? CustomTypeModelValue<T>
		: T extends prismicT.CustomTypeModelUIDField
		? prismicT.PrismicDocument["uid"]
		: T extends prismicT.CustomTypeModelFieldForGroup
		? CustomTypeModelFieldForGroupValue<T>
		: T extends prismicT.CustomTypeModelGroupField
		? CustomTypeModelGroupFieldValue<T>
		: T extends prismicT.CustomTypeModelSliceZoneField
		? prismicT.SliceZone
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
	prismicT.PrismicDocument<ModelValueMap<ValueOf<T["json"]>>>;

type CustomTypeModelFieldForGroupValue<
	T extends prismicT.CustomTypeModelFieldForGroup,
> = T extends prismicT.CustomTypeModelBooleanField
	? prismicT.BooleanField
	: T extends prismicT.CustomTypeModelColorField
	? prismicT.ColorField
	: T extends prismicT.CustomTypeModelTitleField
	? prismicT.TitleField
	: T extends prismicT.CustomTypeModelRichTextField
	? prismicT.RichTextField
	: T extends prismicT.CustomTypeModelImageField
	? prismicT.ImageField
	: T extends prismicT.CustomTypeModelLinkField
	? prismicT.LinkField
	: T extends prismicT.CustomTypeModelLinkToMediaField
	? prismicT.LinkToMediaField
	: T extends prismicT.CustomTypeModelContentRelationshipField
	? prismicT.RelationField
	: T extends prismicT.CustomTypeModelDateField
	? prismicT.DateField
	: T extends prismicT.CustomTypeModelTimestampField
	? prismicT.TimestampField
	: T extends prismicT.CustomTypeModelNumberField
	? prismicT.NumberField
	: T extends prismicT.CustomTypeModelKeyTextField
	? prismicT.KeyTextField
	: T extends prismicT.CustomTypeModelSelectField
	? prismicT.SelectField
	: T extends prismicT.CustomTypeModelEmbedField
	? prismicT.EmbedField
	: T extends prismicT.CustomTypeModelGeoPointField
	? prismicT.GeoPointField
	: T extends prismicT.CustomTypeModelIntegrationFieldsField
	? prismicT.IntegrationFields
	: never;

type CustomTypeModelGroupFieldValue<
	T extends prismicT.CustomTypeModelGroupField,
> = prismicT.GroupField<ModelValueMap<T["config"]["fields"]>>;

type CustomTypeModelSliceValue<T extends prismicT.CustomTypeModelSlice> =
	prismicT.Slice<
		string,
		ModelValueMap<T["non-repeat"]>,
		ModelValueMap<T["repeat"]>
	>;

type SharedSliceModelValue<T extends prismicT.SharedSliceModel> =
	prismicT.SharedSlice<
		T["id"],
		SharedSliceModelVariationValue<IterableElement<T["variations"]>>
	>;

type SharedSliceModelVariationValue<
	T extends prismicT.SharedSliceModelVariation,
> = prismicT.SharedSlice<
	string,
	prismicT.SharedSliceVariation<
		T["id"],
		ModelValueMap<T["primary"]>,
		ModelValueMap<T["items"]>
	>
>;
