import * as prismicT from "@prismicio/types";

type BuildEmbedFieldConfig = {
	document: prismicT.PrismicDocument;
};

export const buildContentRelationshipField = (
	config: BuildEmbedFieldConfig,
): prismicT.FilledLinkToDocumentField => {
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
