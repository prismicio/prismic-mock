import * as prismic from "@prismicio/client";

export const sharedSliceChoice = (): prismic.CustomTypeModelSharedSlice => {
	return {
		type: prismic.CustomTypeModelSliceType.SharedSlice,
	};
};
