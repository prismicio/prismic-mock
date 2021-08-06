import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice model",
	executeTwiceMacro,
	model.sharedSlice,
	[
		{
			type: "SharedSlice",
			id: "infrastructures",
			name: "Infrastructures",
			description:
				"Maxime sint consectetur aut minima excepturi praesentium blanditiis reprehenderit.",
			variations: [
				{
					id: "e_tailers",
					name: "E Tailers",
					description: "Inventore illum atque voluptatibus veniam excepturi.",
					docURL: "https://brady.biz",
					version: "fbf3eb4",
					primary: {},
					items: {
						tempora_quasi_ab: {
							type: "Color",
							config: { label: "Users", placeholder: "Fugit omnis asperiores" },
						},
						in: {
							type: "Date",
							config: { label: "Niches", placeholder: "Amet ex consequuntur" },
						},
						et_corporis: {
							type: "Select",
							config: {
								label: "Partnerships",
								placeholder: "Dicta et voluptatem",
								options: ["Optimize", "Optimize", "Implement"],
								default_value: undefined,
							},
						},
					},
				},
			],
		},
		{
			type: "SharedSlice",
			id: "functionalities",
			name: "Functionalities",
			description: "Non et ducimus molestiae inventore ea iure.",
			variations: [
				{
					id: "blockchains",
					name: "Blockchains",
					description:
						"Et odio sunt earum aspernatur nemo corrupti et ex distinctio.",
					docURL: "https://dedrick.info",
					version: "1c99f5c",
					primary: {},
					items: {
						dicta_nisi: { type: "Boolean", config: { label: "Schemas" } },
						et_ipsa: {
							type: "Link",
							config: {
								label: "Interfaces",
								placeholder: "Consequatur doloremque minus",
								select: "document",
							},
						},
						veritatis: {
							type: "Date",
							config: { label: "Blockchains", placeholder: "Fuga amet qui" },
						},
						delectus_nobis_exercitationem: {
							type: "Image",
							config: {
								label: "E Tailers",
								constraint: { width: null, height: null },
								thumbnails: [
									{ name: "Eyeballs", width: 1479, height: 1045 },
									{ name: "E Business", width: 871, height: 553 },
									{ name: "Experiences", width: 1017, height: 1527 },
								],
							},
						},
						fuga: {
							type: "StructuredText",
							config: {
								label: "Convergence",
								placeholder: "Repellat ex nostrum",
								allowTargetBlank: undefined,
								single: "strong,em",
							},
						},
					},
				},
			],
		},
	],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.sharedSlice({ seed: 1 }),
	[
		{
			type: "SharedSlice",
			id: "blockchains",
			name: "Blockchains",
			description: "Doloremque molestias dolore.",
			variations: [
				{
					id: "mindshare",
					name: "Mindshare",
					description:
						"Alias consequuntur corporis repellat ratione ut sunt qui amet iure.",
					docURL: "http://marcellus.info",
					version: "e8d65a8",
					primary: {
						accusantium: {
							type: "Link",
							config: {
								label: "Architectures",
								placeholder: "Libero repudiandae esse",
								select: "document",
							},
						},
						omnis: {
							type: "Text",
							config: { label: "Networks", placeholder: "Porro ut et" },
						},
						saepe_eum_dicta: {
							type: "Select",
							config: {
								label: "Infomediaries",
								placeholder: "Aspernatur deserunt quam",
								options: [
									"Integrate",
									"Morph",
									"Leverage",
									"Streamline",
									"Transition",
								],
								default_value: undefined,
							},
						},
						provident_velit: {
							type: "StructuredText",
							config: {
								label: "Applications",
								placeholder: "Velit sit aperiam",
								single: "heading5,heading3,heading1,heading6,heading2",
								allowTargetBlank: true,
							},
						},
					},
					items: {
						placeat_ullam: {
							type: "Color",
							config: {
								label: "Solutions",
								placeholder: "Ducimus temporibus modi",
							},
						},
						exercitationem: {
							type: "Image",
							config: {
								label: "Solutions",
								constraint: { width: null, height: null },
								thumbnails: [
									{ name: "Infrastructures", width: 695, height: 1287 },
									{ name: "Synergies", width: 625, height: 1518 },
									{ name: "Experiences", width: 817, height: 1866 },
								],
							},
						},
					},
				},
				{
					id: "platforms",
					name: "Platforms",
					description:
						"Officia quaerat cumque incidunt aut provident esse hic eligendi quos.",
					docURL: "http://kamron.com",
					version: "c80a28c",
					primary: {
						officia: { type: "Boolean", config: { label: "E Business" } },
						eos_ducimus: {
							type: "Color",
							config: {
								label: "Platforms",
								placeholder: "Saepe consequatur vel",
							},
						},
						ut_sunt: {
							type: "Image",
							config: {
								label: "Systems",
								constraint: { width: null, height: null },
								thumbnails: [
									{ name: "Mindshare", width: 689, height: 1825 },
									{ name: "Models", width: 1436, height: 1472 },
									{ name: "Deliverables", width: 1031, height: 1023 },
								],
							},
						},
						ex: {
							type: "Text",
							config: {
								label: "Functionalities",
								placeholder: "Facere molestiae aut",
							},
						},
						nam: {
							type: "Link",
							config: {
								label: "Convergence",
								placeholder: "Dolorum architecto fugit",
								select: null,
								allowTargetBlank: true,
							},
						},
						qui: {
							type: "Link",
							config: {
								label: "Action Items",
								placeholder: "Culpa earum voluptate",
								select: "media",
							},
						},
						est_sunt_corporis: {
							type: "Select",
							config: {
								label: "E Commerce",
								placeholder: "Sequi voluptas culpa",
								options: ["Drive"],
								default_value: undefined,
							},
						},
					},
					items: {
						ex_rem_voluptates: { type: "Boolean", config: { label: "Users" } },
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
		},
		{
			type: "SharedSlice",
			id: "metrics",
			name: "Metrics",
			description:
				"Libero laudantium voluptatem magni et voluptas quis non et architecto.",
			variations: [
				{
					id: "solutions",
					name: "Solutions",
					description: "Incidunt omnis delectus voluptas minima quia ut.",
					docURL: "http://audra.name",
					version: "9f6850d",
					primary: {
						ut: { type: "Boolean", config: { label: "Mindshare" } },
						iure_molestiae: {
							type: "Color",
							config: {
								label: "Metrics",
								placeholder: "Facere placeat molestiae",
							},
						},
						sint: {
							type: "Link",
							config: {
								label: "Partnerships",
								placeholder: "Dolor tempora et",
								select: "media",
							},
						},
					},
					items: {
						similique_ad: {
							type: "Date",
							config: {
								label: "Eyeballs",
								placeholder: "Architecto magnam voluptatem",
							},
						},
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
		},
	],
);

test(
	"can be configured with a specific number of variations",
	executeTwiceMacro,
	() => model.sharedSlice({ variationsCount: 1 }),
	[
		{
			type: "SharedSlice",
			id: "web_services",
			name: "Web Services",
			description: "Quia est est.",
			variations: [
				{
					id: "content",
					name: "Content",
					description: "Nesciunt tenetur harum omnis deleniti animi ab.",
					docURL: "https://telly.com",
					version: "0c57e20",
					primary: {
						ratione_animi: {
							type: "Embed",
							config: {
								label: "E Commerce",
								placeholder: "Tenetur similique saepe",
							},
						},
						minima_qui: {
							type: "Link",
							config: {
								label: "Initiatives",
								placeholder: "Quibusdam sed qui",
								select: null,
								allowTargetBlank: undefined,
							},
						},
						itaque_aspernatur_voluptatem: {
							type: "Select",
							config: {
								label: "Schemas",
								placeholder: "Hic velit molestiae",
								options: ["Expedite", "Engage", "Transition"],
								default_value: undefined,
							},
						},
						harum_a: {
							type: "Timestamp",
							config: { label: "Roi", placeholder: "Quae aut est" },
						},
					},
					items: {
						rerum_et_voluptatum: {
							type: "Color",
							config: { label: "Architectures", placeholder: "Et aut qui" },
						},
						inventore: {
							type: "Embed",
							config: { label: "Paradigms", placeholder: "Ut ipsum eos" },
						},
						voluptates: { type: "GeoPoint", config: { label: "Paradigms" } },
						rerum: {
							type: "Link",
							config: {
								label: "Communities",
								placeholder: "At velit ut",
								select: null,
								allowTargetBlank: true,
							},
						},
						sapiente_occaecati_est: {
							type: "Link",
							config: {
								label: "Roi",
								placeholder: "Provident corporis libero",
								select: "media",
							},
						},
						commodi_temporibus: {
							type: "StructuredText",
							config: {
								label: "Niches",
								placeholder: "Esse fuga sed",
								allowTargetBlank: undefined,
								multi: "em,preformatted,heading3",
							},
						},
						qui: {
							type: "Timestamp",
							config: {
								label: "E Services",
								placeholder: "Voluptatem qui voluptatem",
							},
						},
					},
				},
			],
		},
		{
			type: "SharedSlice",
			id: "communities",
			name: "Communities",
			description: "Numquam molestias consectetur sit.",
			variations: [
				{
					id: "architectures",
					name: "Architectures",
					description:
						"Ipsa veniam iusto explicabo dolores qui facere consequatur aut.",
					docURL: "http://ken.name",
					version: "eaad4cb",
					primary: {
						aliquid_maxime: {
							type: "Color",
							config: {
								label: "Blockchains",
								placeholder: "Soluta molestias quasi",
							},
						},
						et_perspiciatis: {
							type: "Link",
							config: {
								label: "Initiatives",
								placeholder: "Delectus nam a",
								select: "document",
							},
						},
						reiciendis_incidunt: {
							type: "Embed",
							config: {
								label: "E Services",
								placeholder: "Ut dolorum eveniet",
							},
						},
						aut: {
							type: "Image",
							config: {
								label: "Models",
								constraint: { width: null, height: null },
								thumbnails: [
									{ name: "E Business", width: 902, height: 613 },
									{ name: "Functionalities", width: 1323, height: 1425 },
								],
							},
						},
						velit: {
							type: "Number",
							config: {
								label: "Initiatives",
								placeholder: "Praesentium ullam molestias",
							},
						},
					},
					items: {
						excepturi_ut_debitis: {
							type: "Color",
							config: {
								label: "Networks",
								placeholder: "Aperiam soluta animi",
							},
						},
						alias_mollitia_iure: {
							type: "GeoPoint",
							config: { label: "Markets" },
						},
						dolor_ratione_a: {
							type: "Number",
							config: {
								label: "Synergies",
								placeholder: "Nobis laboriosam illum",
							},
						},
					},
				},
			],
		},
	],
);

test(
	"can be configured with specific primary and items field configuration",
	executeTwiceMacro,
	() =>
		model.sharedSlice({
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
			type: "SharedSlice",
			id: "markets",
			name: "Markets",
			description:
				"Repellendus quo et eaque omnis voluptatem facere in iure quam.",
			variations: [
				{
					id: "web_readiness",
					name: "Web Readiness",
					description: "Aut et deleniti earum omnis.",
					docURL: "http://whitney.org",
					version: "d0bf8d5",
					primary: {
						et: { type: "Boolean", config: { label: "Supply Chains" } },
					},
					items: {
						vero_eaque_error: { type: "Boolean", config: { label: "Schemas" } },
					},
				},
				{
					id: "models",
					name: "Models",
					description: "Assumenda impedit debitis quo.",
					docURL: "http://amie.biz",
					version: "e10789f",
					primary: { sequi: { type: "Boolean", config: { label: "Users" } } },
					items: {
						in_sapiente: { type: "Boolean", config: { label: "Eyeballs" } },
					},
				},
			],
		},
		{
			type: "SharedSlice",
			id: "applications",
			name: "Applications",
			description:
				"Voluptatibus accusantium non beatae excepturi sapiente eveniet ut dolorum nesciunt.",
			variations: [
				{
					id: "synergies",
					name: "Synergies",
					description:
						"Aspernatur tenetur accusantium distinctio delectus suscipit quis.",
					docURL: "http://cassandre.info",
					version: "7834025",
					primary: {
						impedit_ad_sed: { type: "Boolean", config: { label: "Markets" } },
					},
					items: {
						odio_iure_reiciendis: {
							type: "Boolean",
							config: { label: "Methodologies" },
						},
					},
				},
				{
					id: "functionalities",
					name: "Functionalities",
					description: "Omnis ratione at rerum.",
					docURL: "https://mckenna.com",
					version: "be5a137",
					primary: {
						id_et_quos: { type: "Boolean", config: { label: "Bandwidth" } },
					},
					items: {
						rem_hic_quia: {
							type: "Boolean",
							config: { label: "Partnerships" },
						},
					},
				},
				{
					id: "e_services",
					name: "E Services",
					description: "Eum quisquam architecto laborum fugiat tempora.",
					docURL: "http://reanna.biz",
					version: "03cd183",
					primary: {
						ab_veniam_sit: {
							type: "Boolean",
							config: { label: "Relationships" },
						},
					},
					items: {
						labore_vitae: { type: "Boolean", config: { label: "Metrics" } },
					},
				},
			],
		},
	],
);
