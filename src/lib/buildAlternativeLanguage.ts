import * as prismic from "@prismicio/client";

type BuildEmbedFieldConfig<Document extends prismic.PrismicDocument> = {
	document: Document;
};

export const buildAlternativeLanguage = <
	Document extends prismic.PrismicDocument,
>(
	config: BuildEmbedFieldConfig<Document>,
): prismic.AlternateLanguage<Document["type"], Document["lang"]> => {
	return {
		id: config.document.id,
		type: config.document.type,
		lang: config.document.lang,
		uid: config.document.uid || undefined,
	};
};
