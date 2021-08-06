import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice variation field model",
	executeTwiceMacro,
	model.sharedSliceVariation,
	[
		{
			id: "synergies",
			name: "Synergies",
			description: "Ullam voluptate inventore.",
			docURL: "https://jaylin.org",
			version: "48c14fb",
			primary: {
				saepe: {
					type: "Boolean",
					config: {
						label: "Mindshare",
					},
				},
			},
			items: {
				tempora_quasi_ab: {
					type: "Date",
					config: {
						label: "Users",
						placeholder: "Fugit omnis asperiores",
					},
				},
				in: {
					type: "GeoPoint",
					config: {
						label: "Niches",
					},
				},
			},
		},
		{
			id: "models",
			name: "Models",
			description: "Repudiandae laboriosam et corporis animi.",
			docURL: "http://ardella.com",
			version: "111402c",
			primary: {
				aut: {
					type: "Color",
					config: {
						label: "Solutions",
						placeholder: "Excepturi praesentium blanditiis",
					},
				},
				tenetur_et_odio: {
					type: "Embed",
					config: { label: "Interfaces", placeholder: "Earum aspernatur nemo" },
				},
				distinctio_earum: {
					type: "Image",
					config: {
						label: "Vortals",
						constraint: { width: null, height: null },
						thumbnails: [],
					},
				},
				error_maiores: {
					type: "Link",
					config: {
						label: "Portals",
						placeholder: "Possimus ex ratione",
						select: null,
						allowTargetBlank: true,
					},
				},
			},
			items: {
				dicta_nisi: {
					type: "Image",
					config: {
						label: "Deliverables",
						constraint: { width: null, height: null },
						thumbnails: [
							{ name: "E Business", width: 1002, height: 1148 },
							{ name: "Web Readiness", width: 1364, height: 1054 },
							{ name: "Web Readiness", width: 1600, height: 1711 },
						],
					},
				},
				amet_qui: {
					type: "Link",
					config: {
						label: "Interfaces",
						placeholder: "Dicta officiis tenetur",
						select: "media",
					},
				},
				exercitationem_molestiae_nostrum: {
					type: "Number",
					config: { label: "Eyeballs", placeholder: "Et commodi aut" },
				},
				nobis_qui: {
					type: "Timestamp",
					config: {
						label: "Solutions",
						placeholder: "Excepturi eaque consequatur",
					},
				},
			},
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.sharedSliceVariation({ seed: 1 }),
	[
		{
			id: "technologies",
			name: "Technologies",
			description:
				"Quisquam recusandae alias consequuntur corporis repellat ratione ut sunt qui.",
			docURL: "http://gideon.info",
			version: "a6e8d65",
			primary: {
				accusantium: {
					type: "Embed",
					config: {
						label: "Architectures",
						placeholder: "Libero repudiandae esse",
					},
				},
				omnis: {
					type: "Link",
					config: {
						label: "Networks",
						placeholder: "Porro ut et",
						select: "media",
					},
				},
				saepe_eum_dicta: {
					type: "StructuredText",
					config: {
						label: "Infomediaries",
						placeholder: "Aspernatur deserunt quam",
						single: "heading5,heading4,heading6,heading2,heading1",
						allowTargetBlank: true,
					},
				},
			},
			items: {
				provident_velit: { type: "Boolean", config: { label: "Models" } },
				velit_sit_aperiam: {
					type: "GeoPoint",
					config: { label: "Deliverables" },
				},
				placeat_ullam: {
					type: "Text",
					config: {
						label: "Solutions",
						placeholder: "Ducimus temporibus modi",
					},
				},
				exercitationem: {
					type: "Select",
					config: {
						label: "Markets",
						placeholder: "Soluta sint non",
						options: ["Empower", "Embrace", "Embrace", "Synthesize", "Utilize"],
						default_value: undefined,
					},
				},
				ullam: {
					type: "Timestamp",
					config: { label: "Convergence", placeholder: "Qui illo error" },
				},
			},
		},
		{
			id: "e_commerce",
			name: "E Commerce",
			description: "A officia quaerat cumque.",
			docURL: "http://bartholome.name",
			version: "6fb7680",
			primary: {
				quae_nam: { type: "Boolean", config: { label: "Platforms" } },
				doloremque_officia_aut: {
					type: "Link",
					config: {
						label: "Functionalities",
						placeholder: "Ut eos ducimus",
						select: "document",
					},
				},
				vel_in_ut: {
					type: "Embed",
					config: { label: "Initiatives", placeholder: "Et molestiae ea" },
				},
				est_consequuntur: {
					type: "Text",
					config: { label: "E Business", placeholder: "Est fuga est" },
				},
				ut_voluptas: {
					type: "Link",
					config: {
						label: "Solutions",
						placeholder: "Ex eveniet facere",
						select: null,
						allowTargetBlank: undefined,
					},
				},
				aut_nam_et: {
					type: "Link",
					config: {
						label: "E Commerce",
						placeholder: "Architecto fugit repellendus",
						select: "media",
					},
				},
				qui: {
					type: "Number",
					config: {
						label: "Action Items",
						placeholder: "Culpa earum voluptate",
					},
				},
				est_sunt_corporis: {
					type: "Timestamp",
					config: { label: "Synergies", placeholder: "Est et sequi" },
				},
			},
			items: {
				ex_rem_voluptates: {
					type: "Date",
					config: { label: "Users", placeholder: "Fuga totam perferendis" },
				},
				eligendi_omnis_repellat: {
					type: "GeoPoint",
					config: { label: "Markets" },
				},
				optio: {
					type: "Number",
					config: { label: "Vortals", placeholder: "Et incidunt possimus" },
				},
				et: {
					type: "Select",
					config: {
						label: "Relationships",
						placeholder: "Quia ipsum sit",
						options: ["Repurpose"],
						default_value: undefined,
					},
				},
			},
		},
	],
);

test(
	"can be configured with specific primary and items field configuration",
	executeTwiceMacro,
	() =>
		model.sharedSliceVariation({
			itemsFieldConfig: {
				configs: {
					boolean: { count: 1 },
					color: { count: 0 },
					contentRelationship: { count: 0 },
					date: { count: 0 },
					embed: { count: 0 },
					geoPoint: { count: 0 },
					image: { count: 0 },
					keyText: { count: 0 },
					link: { count: 0 },
					linkToMedia: { count: 0 },
					number: { count: 0 },
					richText: { count: 0 },
					select: { count: 0 },
					timestamp: { count: 0 },
					title: { count: 0 },
				},
			},
			primaryFieldConfig: {
				configs: {
					boolean: { count: 1 },
					color: { count: 0 },
					contentRelationship: { count: 0 },
					date: { count: 0 },
					embed: { count: 0 },
					geoPoint: { count: 0 },
					image: { count: 0 },
					keyText: { count: 0 },
					link: { count: 0 },
					linkToMedia: { count: 0 },
					number: { count: 0 },
					richText: { count: 0 },
					select: { count: 0 },
					timestamp: { count: 0 },
					title: { count: 0 },
				},
			},
		}),
	[
		{
			id: "systems",
			name: "Systems",
			description: "Nam deserunt aliquam.",
			docURL: "https://zelma.info",
			version: "44aa08e",
			primary: {
				ducimus_molestiae_inventore: {
					type: "Boolean",
					config: { label: "Portals" },
				},
			},
			items: {
				hic_dignissimos: {
					type: "Boolean",
					config: { label: "Relationships" },
				},
			},
		},
		{
			id: "initiatives",
			name: "Initiatives",
			description:
				"Harum omnis deleniti animi ab quas sint quasi perferendis aut.",
			docURL: "http://jennings.org",
			version: "20ab48d",
			primary: {
				ratione_animi: { type: "Boolean", config: { label: "E Commerce" } },
			},
			items: {
				similique_saepe_deleniti: {
					type: "Boolean",
					config: { label: "Systems" },
				},
			},
		},
	],
);
