import { createFaker, Faker } from "../lib/createFaker";
import { GroupFieldModelMap, Seed } from "../types";
import { boolean } from "./boolean";
import { color } from "./color";
import { group, MockGroupModelConfig } from "./group";

export const createModelFactory = (
	...args: ConstructorParameters<typeof ModelFactory>
): ModelFactory => {
	return new ModelFactory(...args);
};

type PrismicMockConfig = {
	seed: Seed;
};

type WithoutFakerConfig<T> = Omit<T, "faker" | "seed">;
// type WithoutFakerConfig<F extends (config: MockModelConfig) => any> = (
// 	config: Omit<Parameters<F>[0], "faker" | "seed">,
// ) => ReturnType<F>;

export class ModelFactory {
	readonly seed: Seed;
	private faker: Faker;

	constructor({ seed }: PrismicMockConfig) {
		this.seed = seed;
		this.faker = createFaker(seed);
	}

	boolean() {
		return boolean({ faker: this.faker });
	}

	color() {
		return color({ faker: this.faker });
	}

	group<Fields extends GroupFieldModelMap>(
		config: WithoutFakerConfig<MockGroupModelConfig<Fields>>,
	) {
		return group({ ...config, faker: this.faker });
	}
}

const modelFactory = createModelFactory({ seed: "foo" });
modelFactory.boolean();
modelFactory.group({});
