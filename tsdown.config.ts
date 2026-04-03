import { defineConfig } from "tsdown"

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		"api/index": "./src/api/index.ts",
		"model/index": "./src/model/index.ts",
		"value/index": "./src/value/index.ts",
	},
	format: ["esm", "cjs"],
	platform: "neutral",
	unbundle: true,
	sourcemap: true,
})
