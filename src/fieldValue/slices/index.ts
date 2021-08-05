import * as prismicT from "@prismicio/types";
// import * as faker from 'faker/locale/en_US'

// import { mockForFieldConfigMap } from "../mockForFieldConfigMap";

type SliceZoneArgs = {
	sliceCount?: number;
	fieldConfig: prismicT.CustomTypeModelSliceZoneField;
	sharedSliceModels: prismicT.SharedSliceModel[];
};

// TODO: Write this.

export const sliceZone = (_args: SliceZoneArgs): prismicT.SliceZone => {
	// const sliceCount = faker.datatype.number(4);

	return [];

	// return Array(sliceCount)
	// 	.fill(undefined)
	// 	.map(() => {
	// 		const choiceId = faker.random.arrayElement(
	// 			Object.keys(args.fieldConfig?.config.choices),
	// 		);

	// 		const choiceConfig
	// 	});
};
