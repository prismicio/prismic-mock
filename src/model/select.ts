import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

type SelectArgs<Option extends string> = {
	options?: Option[];
	withDefaultValue?: boolean;
};

export const select = <Option extends string>(
	args: SelectArgs<Option> = {},
): prismicT.CustomTypeModelSelectField<Option> => {
	const options =
		args.options ||
		(Array(faker.datatype.number({ min: 1, max: 5 }))
			.fill(undefined)
			.map(() => changeCase.capitalCase(faker.company.bsBuzz())) as Option[]);

	return {
		type: prismicT.CustomTypeModelFieldType.Select,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			options,
			default_value: args.withDefaultValue
				? faker.random.arrayElement(options)
				: undefined,
		},
	};
};
