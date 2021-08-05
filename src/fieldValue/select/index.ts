import * as prismicT from "@prismicio/types";
import * as faker from "faker";

type SelectArgs<Options extends string> = {
	defaultValue?: Options;
	options?: Options[];
};

export const select = <Options extends string>(
	args: SelectArgs<Options> = {},
): prismicT.SelectField => {
	if (faker.datatype.boolean()) {
		return args.defaultValue ?? null;
	}

	return faker.random.arrayElement(args.options || []) ?? null;
};
