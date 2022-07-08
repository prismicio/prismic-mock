import * as prismicT from "@prismicio/types";

import { MockModelConfig } from "../types";

export type MockSliceZoneModelConfig<
	Slices extends Record<
		string,
		prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
	> = Record<
		string,
		prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
	>,
> = {
	choices?: Slices;
} & MockModelConfig;

export const sliceZone = <
	Slices extends Record<
		string,
		prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
	>,
>(
	config: MockSliceZoneModelConfig<Slices>,
): prismicT.CustomTypeModelSliceZoneField<Slices> => {
	const labels = {} as NonNullable<
		NonNullable<
			prismicT.CustomTypeModelSliceZoneField<Slices>["config"]
		>["labels"]
	>;

	for (const choiceId in config.choices) {
		const choice = config.choices[choiceId];

		if (choice.type === prismicT.CustomTypeModelSliceType.Slice) {
			labels[choiceId as unknown as keyof typeof labels] = [];
		}
	}

	return {
		type: prismicT.CustomTypeModelFieldType.Slices,
		fieldset: "Slice zone",
		config: {
			labels,
			choices: config.choices || ({} as Slices),
		},
	};
};
