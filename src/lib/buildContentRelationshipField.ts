import * as prismicT from "@prismicio/types";

type BuildEmbedFieldConfig<Document extends prismicT.PrismicDocument> = {
	document: Document;
};

export const buildContentRelationshipField = <
	Document extends prismicT.PrismicDocument,
>(
	config: BuildEmbedFieldConfig<Document>,
): prismicT.RelationField<
	Document["type"],
	Document["lang"],
	never,
	"filled"
> => {
	return {
		link_type: prismicT.LinkType.Document,
		id: config.document.id,
		uid: config.document.uid || undefined,
		type: config.document.type,
		tags: config.document.tags,
		lang: config.document.lang,
		url: config.document.url || undefined,
		slug: config.document.slugs[0],
		isBroken: false,
	};
};
