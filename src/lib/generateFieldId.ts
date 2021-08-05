import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

export const generateFieldId = (): string => {
	return changeCase.snakeCase(
		faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
	);
};
