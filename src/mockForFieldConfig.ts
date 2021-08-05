import * as prismicT from "@prismicio/types";

import { CustomTypeModelFieldValue } from "./types";
import { boolean } from "./boolean";
import { color } from "./color";
import { geoPoint } from "./geoPoint";
import { date } from "./date";
import { timestamp } from "./timestamp";
import { uid } from "./uid";
import { title } from "./title";
import { text } from "./text";
import { select } from "./select";
import { richText } from "./richText";
import { number } from "./number";
import { link } from "./link";
import { image } from "./image";
import { group } from "./group";
import { embed } from "./embed";

export const mockForFieldConfig = <T extends prismicT.CustomTypeModelField>(
	fieldConfig: T,
): CustomTypeModelFieldValue<T> => {
	switch (fieldConfig.type) {
		case prismicT.CustomTypeModelFieldType.Boolean: {
			return boolean() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Color: {
			return color() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Date: {
			return date() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Embed: {
			return embed() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.GeoPoint: {
			return geoPoint() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Group: {
			return group() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Image: {
			return image() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Link: {
			return link() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Number: {
			return number() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Select: {
			return select() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.StructuredText: {
			if ("single" in fieldConfig.config) {
				return title() as CustomTypeModelFieldValue<T>;
			} else {
				return richText() as CustomTypeModelFieldValue<T>;
			}
		}

		case prismicT.CustomTypeModelFieldType.Text: {
			return text() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Timestamp: {
			return timestamp() as CustomTypeModelFieldValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.UID: {
			return uid() as CustomTypeModelFieldValue<T>;
		}
	}
};
