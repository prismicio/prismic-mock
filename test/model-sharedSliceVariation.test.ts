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
						customtypes: undefined,
						tags: undefined,
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
	"supports custom seed for primary field",
	executeTwiceMacro,
	() =>
		model.sharedSliceVariation({
			seed: 1,
			primaryFieldConfig: {
				seed: 2,
			},
		}),
	[
		{
			id: "partnerships",
			name: "Partnerships",
			description: "Molestias dolore aut.",
			docURL: "https://edwina.name",
			version: "38fd413",
			primary: {
				rerum_iusto: {
					type: "Date",
					config: {
						label: "Supply Chains",
						placeholder: "Quam voluptatem sit",
					},
				},
				nobis_dolores: {
					type: "StructuredText",
					config: {
						label: "Mindshare",
						placeholder: "Repellendus quaerat at",
						single: "heading1,heading3,heading4",
						allowTargetBlank: true,
					},
				},
			},
			items: {
				natus_consequatur: {
					type: "Embed",
					config: { label: "Synergies", placeholder: "Vel et nostrum" },
				},
				iure_molestiae: {
					type: "Text",
					config: { label: "Metrics", placeholder: "Facere placeat molestiae" },
				},
			},
		},
		{
			id: "web_services",
			name: "Web Services",
			description: "Sint odit dolor.",
			docURL: "http://lewis.net",
			version: "08a0214",
			primary: {
				beatae: {
					type: "Link",
					config: {
						label: "Methodologies",
						placeholder: "Quas exercitationem et",
						select: "document",
						customtypes: undefined,
						tags: undefined,
					},
				},
			},
			items: {
				similique_ad: { type: "Boolean", config: { label: "Eyeballs" } },
				quis_ut: {
					type: "Text",
					config: { label: "Paradigms", placeholder: "Nulla quod labore" },
				},
				saepe_nesciunt_omnis: {
					type: "Select",
					config: {
						label: "Markets",
						placeholder: "Eaque corrupti vel",
						options: ["Reintermediate"],
						default_value: undefined,
					},
				},
				blanditiis_voluptatem: {
					type: "StructuredText",
					config: {
						label: "Niches",
						placeholder: "Molestias omnis numquam",
						single: "heading5,heading3,heading1,heading6",
						allowTargetBlank: true,
					},
				},
			},
		},
	],
);

test(
	"supports custom seed for items field",
	executeTwiceMacro,
	() =>
		model.sharedSliceVariation({
			seed: 1,
			itemsFieldConfig: {
				seed: 2,
			},
		}),
	[
		{
			id: "experiences",
			name: "Experiences",
			description: "Laudantium voluptatem magni et voluptas quis non et.",
			docURL: "http://cornell.com",
			version: "c21541c",
			primary: {
				in_cupiditate: {
					type: "Link",
					config: {
						label: "Applications",
						placeholder: "Molestiae fuga voluptatem",
						select: "document",
						customtypes: undefined,
						tags: undefined,
					},
				},
				voluptates_dolorem_recusandae: {
					type: "Link",
					config: {
						label: "Infomediaries",
						placeholder: "Perferendis molestiae ut",
						select: null,
						allowTargetBlank: true,
					},
				},
				in_hic_molestiae: {
					type: "Number",
					config: {
						label: "Interfaces",
						placeholder: "Sed repudiandae consequatur",
					},
				},
				exercitationem_corrupti: {
					type: "Select",
					config: {
						label: "Web Readiness",
						placeholder: "Unde qui molestiae",
						options: ["Maximize"],
						default_value: undefined,
					},
				},
				consequatur_qui_est: {
					type: "Timestamp",
					config: { label: "Methodologies", placeholder: "Aperiam quia ex" },
				},
			},
			items: {
				in: { type: "Boolean", config: { label: "Action Items" } },
				nam_iure: {
					type: "Link",
					config: {
						label: "E Commerce",
						placeholder: "Autem doloribus culpa",
						select: "media",
					},
				},
				molestias_et_eius: {
					type: "StructuredText",
					config: {
						label: "Networks",
						placeholder: "Iusto ex omnis",
						single: "heading3,heading1,heading4,heading5,heading2,heading6",
						allowTargetBlank: undefined,
					},
				},
			},
		},
		{
			id: "markets",
			name: "Markets",
			description: "Eligendi quas perferendis voluptatem.",
			docURL: "http://unique.org",
			version: "d507215",
			primary: {
				sed_nisi_veniam: {
					type: "Link",
					config: {
						label: "Web Services",
						placeholder: "Ex culpa eveniet",
						select: "document",
						customtypes: undefined,
						tags: undefined,
					},
				},
				nulla: {
					type: "Date",
					config: {
						label: "Web Readiness",
						placeholder: "Et delectus praesentium",
					},
				},
				quis_consequuntur: {
					type: "Text",
					config: { label: "Convergence", placeholder: "Hic animi ipsam" },
				},
				eius_et: {
					type: "Link",
					config: {
						label: "Roi",
						placeholder: "Consequatur et ipsam",
						select: "media",
					},
				},
				in_perspiciatis_sit: {
					type: "StructuredText",
					config: {
						label: "Paradigms",
						placeholder: "Perferendis quam ab",
						allowTargetBlank: true,
						single: "preformatted,strong,o-list-item",
					},
				},
				alias_accusamus: {
					type: "Timestamp",
					config: {
						label: "Methodologies",
						placeholder: "Repellendus autem aliquam",
					},
				},
				id: {
					type: "StructuredText",
					config: {
						label: "Eyeballs",
						placeholder: "In esse et",
						single: "heading5",
						allowTargetBlank: undefined,
					},
				},
			},
			items: {
				perspiciatis_vel_vitae: {
					type: "Link",
					config: {
						label: "Web Services",
						placeholder: "Consequatur qui pariatur",
						select: "document",
						customtypes: undefined,
						tags: undefined,
					},
				},
				earum_ut_quas: {
					type: "StructuredText",
					config: {
						label: "Experiences",
						placeholder: "Voluptatibus quo odio",
						allowTargetBlank: true,
						single:
							"paragraph,heading5,o-list-item,heading4,preformatted,heading3,embed,heading2,heading6,image,em,strong,list-item",
					},
				},
				omnis: {
					type: "Timestamp",
					config: { label: "Roi", placeholder: "Sunt iure qui" },
				},
				id_consequatur_vel: {
					type: "StructuredText",
					config: {
						label: "Portals",
						placeholder: "Qui debitis accusantium",
						single: "heading3,heading6,heading4,heading2,heading1",
						allowTargetBlank: undefined,
					},
				},
			},
		},
	],
);

test("can be configured with specific repeat and non-repeat field configuration", (t) => {
	const actual = model.sharedSliceVariation({
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
	});

	const itemsFieldIds = Object.keys(actual.items);
	const primaryFieldIds = Object.keys(actual.primary);

	t.is(itemsFieldIds.length, 1);
	t.is(actual.items[itemsFieldIds[0]].type, "Boolean");

	t.is(primaryFieldIds.length, 1);
	t.is(actual.primary[primaryFieldIds[0]].type, "Boolean");
});
