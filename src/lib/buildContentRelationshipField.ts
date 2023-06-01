import * as prismic from "@prismicio/client";

type BuildEmbedFieldConfig<Document extends prismic.PrismicDocument> = {
	document: Document;
};

export const buildContentRelationshipField = <
	Document extends prismic.PrismicDocument,
>(
	config: BuildEmbedFieldConfig<Document>,
): prismic.ContentRelationshipField<
	Document["type"],
	Document["lang"],
	never,
	"filled"
> => {
	return {
		link_type: prismic.LinkType.Document,
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
