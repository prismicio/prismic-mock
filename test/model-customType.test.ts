import test from "ava";
import * as prismicT from "@prismicio/types";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Custom Type field model",
	executeTwiceMacro,
	model.customType,
	[
		{
			id: "systems",
			label: "Systems",
			status: true,
			repeatable: false,
			json: {
				ullam: {
					voluptatibus_veniam: {
						type: "Link",
						config: {
							label: "Convergence",
							placeholder: "Autem consequuntur nostrum",
							select: "document",
							customtypes: undefined,
							tags: undefined,
						},
					},
					repellat_modi_saepe: {
						type: "Date",
						config: { label: "Mindshare", placeholder: "Voluptatem ab minus" },
					},
				},
			},
		},
		{
			id: "e_markets",
			label: "E Markets",
			status: false,
			repeatable: true,
			json: {
				tempora_quasi_ab: {
					omnis: { type: "Boolean", config: { label: "Blockchains" } },
					in: {
						type: "Link",
						config: {
							label: "Niches",
							placeholder: "Amet ex consequuntur",
							select: "document",
							customtypes: undefined,
							tags: undefined,
						},
					},
					et_corporis: {
						type: "StructuredText",
						config: {
							label: "Deliverables",
							placeholder: "Sint consectetur aut",
							allowTargetBlank: undefined,
							multi:
								"o-list-item,em,heading3,list-item,image,hyperlink,embed,heading1,heading2",
						},
					},
				},
				voluptatem_ut: {
					et_odio_sunt: { type: "Boolean", config: { label: "Web Services" } },
					distinctio_earum: {
						type: "Embed",
						config: {
							label: "Communities",
							placeholder: "Qui beatae temporibus",
						},
					},
					possimus_ex: {
						type: "Text",
						config: { label: "Platforms", placeholder: "Ut quidem nihil" },
					},
				},
				optio: {
					dicta_nisi: {
						type: "Color",
						config: {
							label: "Schemas",
							placeholder: "Maxime accusamus suscipit",
						},
					},
					veritatis: {
						type: "Link",
						config: {
							label: "Blockchains",
							placeholder: "Fuga amet qui",
							select: null,
							allowTargetBlank: true,
						},
					},
					delectus_nobis_exercitationem: {
						type: "Number",
						config: { label: "Experiences", placeholder: "Nostrum non et" },
					},
					aperiam: {
						type: "Select",
						config: {
							label: "Web Readiness",
							placeholder: "Consequatur inventore fuga",
							options: ["Harness", "Visualize", "Enable", "Morph", "Syndicate"],
							default_value: undefined,
						},
					},
				},
			},
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.customType({ seed: 1 }),
	[
		{
			id: "blockchains",
			label: "Blockchains",
			status: false,
			repeatable: false,
			json: {
				quisquam_recusandae_alias: {
					nostrum_veniam: { type: "Boolean", config: { label: "Systems" } },
					ducimus_molestiae_inventore: {
						type: "Embed",
						config: { label: "Portals", placeholder: "Iure hic dignissimos" },
					},
					omnis_deleniti: {
						type: "Text",
						config: { label: "E Commerce", placeholder: "Ab quas sint" },
					},
					quos_et: {
						type: "Number",
						config: { label: "Platforms", placeholder: "Eaque soluta qui" },
					},
					ratione_animi: {
						type: "Timestamp",
						config: {
							label: "E Commerce",
							placeholder: "Tenetur similique saepe",
						},
					},
				},
				corporis: {
					minima_qui: {
						type: "Link",
						config: {
							label: "Initiatives",
							placeholder: "Quibusdam sed qui",
							select: "document",
							customtypes: undefined,
							tags: undefined,
						},
					},
					itaque_aspernatur_voluptatem: {
						type: "Text",
						config: {
							label: "Supply Chains",
							placeholder: "Rerum deserunt officiis",
						},
					},
					velit_molestiae_voluptas: {
						type: "Link",
						config: {
							label: "Bandwidth",
							placeholder: "Harum a voluptatem",
							select: null,
							allowTargetBlank: undefined,
						},
					},
					voluptas_non_et: {
						type: "Link",
						config: {
							label: "Networks",
							placeholder: "Rerum et voluptatum",
							select: "media",
						},
					},
					amet_veniam_assumenda: {
						type: "Select",
						config: {
							label: "Methodologies",
							placeholder: "Ipsum eos est",
							options: ["Streamline", "Integrate"],
							default_value: undefined,
						},
					},
					ut: {
						type: "StructuredText",
						config: {
							label: "E Business",
							placeholder: "Et at velit",
							single: "heading2,heading6",
							allowTargetBlank: true,
						},
					},
				},
			},
		},
		{
			id: "action_items",
			label: "Action Items",
			status: true,
			repeatable: false,
			json: {
				amet_iure: {
					temporibus_sapiente_occaecati: {
						type: "Boolean",
						config: { label: "Bandwidth" },
					},
					commodi_temporibus: {
						type: "Image",
						config: {
							label: "Channels",
							constraint: { width: null, height: null },
							thumbnails: [],
						},
					},
					qui_esse_fuga: {
						type: "Link",
						config: {
							label: "Eyeballs",
							placeholder: "Et qui hic",
							select: null,
							allowTargetBlank: undefined,
						},
					},
				},
			},
		},
	],
);

test("can be configured to with a specific number of tabs", (t) => {
	const actual = model.customType({ tabsCount: 10 });

	t.is(Object.keys(actual.json).length, 10);
});

test("can be configured to include a UID field in the first tab", (t) => {
	const actual = model.customType({ withUID: true, tabsCount: 2 });

	const tabIds = Object.keys(actual.json);

	t.true(
		Object.values(actual.json[tabIds[0]]).some(
			(fieldModel) => fieldModel.type === "UID",
		),
	);

	t.false(
		Object.values(actual.json[tabIds[1]]).some(
			(fieldModel) => fieldModel.type === "UID",
		),
	);
});

test("does not include Slice Zones by default", (t) => {
	const actual = model.customType();

	t.plan(Object.keys(actual.json).length);

	Object.values(actual.json).forEach((tabModel) => {
		t.false(
			Object.values(tabModel).some(
				(fieldModel) => fieldModel.type === "Slices",
			),
		);
	});
});

test("can be configured to include a Slice Zone in each tab", (t) => {
	const actual = model.customType({ withSliceZones: true });

	t.plan(Object.keys(actual.json).length);

	Object.values(actual.json).forEach((tabModel) => {
		t.is(
			Object.values(tabModel).filter(
				(fieldModel) => fieldModel.type === "Slices",
			).length,
			1,
		);
	});
});

test("can be configured to include a Slice Zone with Shared Slices in each tab", (t) => {
	const actual = model.customType({
		withSliceZones: true,
		withSharedSlices: true,
	});

	t.plan(Object.keys(actual.json).length * 2);

	Object.values(actual.json).forEach((tabModel) => {
		t.is(
			Object.values(tabModel).filter(
				(fieldModel) => fieldModel.type === "Slices",
			).length,
			1,
		);

		const sliceZoneModel = Object.values(tabModel).find(
			(fieldModel): fieldModel is prismicT.CustomTypeModelSliceZoneField =>
				fieldModel.type === "Slices",
		);

		if (sliceZoneModel) {
			t.true(
				Object.values(sliceZoneModel.config.choices).every(
					(choiceModel) => choiceModel.type === "SharedSlice",
				),
			);
		} else {
			t.fail("Tab did not include a Slice Zone");
		}
	});
});
