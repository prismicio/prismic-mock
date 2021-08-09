import * as prismicT from "@prismicio/types";

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

export type MockModelConfig = {
	seed?: number;
};

// TODO: Add to @prismicio/types
type PrismicModel =
	| prismicT.CustomTypeModel
	| prismicT.CustomTypeModelField
	| prismicT.SharedSliceModel;

export type MockValueConfig<Model extends PrismicModel = PrismicModel> = {
	seed?: number;
	model?: Model;
};

type CustomTypeModelStructuredTextField =
	| prismicT.CustomTypeModelRichTextField
	| prismicT.CustomTypeModelTitleField;

export type MockRichTextValueConfig<
	Model extends CustomTypeModelStructuredTextField = CustomTypeModelStructuredTextField,
> = {
	seed?: number;
	model?: Model;
};

export type CustomTypeModelFieldValueMap<
	T extends Record<string, prismicT.CustomTypeModelField>,
> = {
	[P in keyof T]: CustomTypeModelFieldValue<T[P]>;
};

// TODO: Add to @prismicio/types
export type CustomTypeModelFieldValue<T extends prismicT.CustomTypeModelField> =
	T extends prismicT.CustomTypeModelBooleanField
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
		: T extends prismicT.CustomTypeModelGroupField
		? prismicT.GroupField
		: T extends prismicT.CustomTypeModelIntegrationField
		? prismicT.IntegrationField
		: T extends prismicT.CustomTypeModelSliceZoneField
		? prismicT.SliceZone
		: T extends prismicT.CustomTypeModelSlice
		? prismicT.Slice
		: T extends prismicT.CustomTypeModelSharedSlice
		? prismicT.SharedSlice
		: never;
