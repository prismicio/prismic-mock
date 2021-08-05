import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const geoPoint = (): prismicT.CustomTypeModelGeoPointField => {
	return {
		type: prismicT.CustomTypeModelFieldType.GeoPoint,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
		},
	};
};
