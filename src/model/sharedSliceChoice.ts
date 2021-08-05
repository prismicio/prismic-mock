import * as prismicT from "@prismicio/types";

export const sharedSliceChoice = (): prismicT.CustomTypeModelSharedSlice => {
	return {
		type: prismicT.CustomTypeModelSliceType.SharedSlice,
	};
};
