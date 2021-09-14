import * as prismicT from "@prismicio/types";

type BuildEmbedFieldConfig<Document extends prismicT.PrismicDocument> = {
	document: Document;
};

export const buildAlternativeLanguage = <
	Document extends prismicT.PrismicDocument,
>(
	config: BuildEmbedFieldConfig<Document>,
): prismicT.AlternateLanguage<Document["type"], Document["lang"]> => {
	return {
		id: config.document.id,
		type: config.document.type,
		lang: config.document.lang,
		uid: config.document.uid || undefined,
	};
};
