import * as prismicT from "@prismicio/types";

export type CustomTypeModelFieldValueMap<
	T extends Record<string, prismicT.CustomTypeModelField>,
> = {
	[P in keyof T]: CustomTypeModelFieldValue<T[P]>;
};

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
