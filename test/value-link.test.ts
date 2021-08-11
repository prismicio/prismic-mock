import test from "ava";
import * as prismicT from "@prismicio/types";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Link field value", executeTwiceMacro, value.link, [
	{
		link_type: "Web",
		url: "#",
		target: undefined,
	},
	{
		link_type: "Media",
		name: "buckinghamshire.wav",
		kind: "text",
		url: "#",
		size: "99873",
		height: "22156",
		width: "89441",
	},
]);

test("supports custom seed", executeTwiceMacro, () => value.link({ seed: 1 }), [
	{
		link_type: "Document",
		id: "f231626",
		uid: undefined,
		type: "infrastructures",
		tags: [],
		lang: "libero",
		url: "#",
		slug: "recusandae_ut",
		isBroken: true,
	},
	{
		link_type: "Document",
		id: "67862f3",
		uid: "et_porro",
		type: "content",
		tags: ["Accusantium", "Libero Repudiandae"],
		lang: "ut",
		url: "#",
		slug: "ipsam_explicabo_eligendi",
		isBroken: true,
	},
]);

test("supports custom model", (t) => {
	const customModelBase = model.link();
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			allowTargetBlank: true as const,
		},
	};

	const actual = value.link({
		// This specific seed ensures `target` will be "_blank".
		seed: 1,
		model: customModel,
		type: prismicT.LinkType.Web,
	});

	t.is(actual.target, "_blank");
});

test("can be configured to return an unfilled link value", (t) => {
	const actual = value.link({
		type: prismicT.LinkType.Web,
		isFilled: false,
	});

	t.false("url" in actual);
});

test("can be configured to return a value with `_blank` target", (t) => {
	const actualTrue = value.link({
		type: prismicT.LinkType.Web,
		withTargetBlank: true,
	});
	t.is(actualTrue.target, "_blank");

	const actualFalse = value.link({
		type: prismicT.LinkType.Web,
		withTargetBlank: false,
	});
	t.is(actualFalse.target, undefined);
});
