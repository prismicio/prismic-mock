import * as prismic from "@prismicio/client";

import { MockModelConfig } from "../types";

export type MockSliceZoneModelConfig<
	Slices extends Record<
		string,
		prismic.CustomTypeModelSlice | prismic.CustomTypeModelSharedSlice
	> = Record<
		string,
		prismic.CustomTypeModelSlice | prismic.CustomTypeModelSharedSlice
	>,
> = {
	choices?: Slices;
} & MockModelConfig;

export const sliceZone = <
	Slices extends Record<
		string,
		prismic.CustomTypeModelSlice | prismic.CustomTypeModelSharedSlice
	>,
>(
	config: MockSliceZoneModelConfig<Slices>,
): prismic.CustomTypeModelSliceZoneField<Slices> => {
	const labels = {} as NonNullable<
		NonNullable<
			prismic.CustomTypeModelSliceZoneField<Slices>["config"]
		>["labels"]
	>;

	for (const choiceId in config.choices) {
		const choice = config.choices[choiceId];

		if (choice.type === prismic.CustomTypeModelSliceType.Slice) {
			labels[choiceId as unknown as keyof typeof labels] = [];
		}
	}

	return {
		type: prismic.CustomTypeModelFieldType.Slices,
		fieldset: "Slice zone",
		config: {
			labels,
			choices: config.choices || ({} as Slices),
		},
	};
};
