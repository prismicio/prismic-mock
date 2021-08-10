import * as prismicT from "@prismicio/types";

import { ModelValue } from "./types";
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
): ModelValue<T> => {
	switch (fieldConfig.type) {
		case prismicT.CustomTypeModelFieldType.Boolean: {
			return boolean() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Color: {
			return color() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Date: {
			return date() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Embed: {
			return embed() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.GeoPoint: {
			return geoPoint() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Group: {
			return group() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Image: {
			return image() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Link: {
			return link() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Number: {
			return number() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Select: {
			return select() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.StructuredText: {
			if ("single" in fieldConfig.config) {
				return title() as ModelValue<T>;
			} else {
				return richText() as ModelValue<T>;
			}
		}

		case prismicT.CustomTypeModelFieldType.Text: {
			return text() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.Timestamp: {
			return timestamp() as ModelValue<T>;
		}

		case prismicT.CustomTypeModelFieldType.UID: {
			return uid() as ModelValue<T>;
		}
	}
};
