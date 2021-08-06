import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";
import { executeOnceMacro } from "./__testutils__/executeOnceMacro";

test(
	"creates a mock Slice Zone field model",
	executeTwiceMacro,
	model.sliceZone,
	[
		{
			type: "Slices",
			fieldset: "Slice zone",
			config: {
				labels: {
					ullam: [{ name: "E Commerce", display: "list" }],
					maxime_sint_consectetur: [
						{ name: "Experiences", display: "list" },
						{ name: "Synergies", display: "grid" },
					],
				},
				choices: {
					ullam: {
						type: "Slice",
						icon: "technologies",
						display: "list",
						fieldset: "Illum Atque Voluptatibus",
						description: "Excepturi autem consequuntur nostrum repellat.",
						repeat: {
							saepe: {
								type: "Color",
								config: {
									label: "Mindshare",
									placeholder: "Voluptatem ab minus",
								},
							},
						},
						"non-repeat": {
							tempora_quasi_ab: {
								type: "Color",
								config: {
									label: "Users",
									placeholder: "Fugit omnis asperiores",
								},
							},
							in: {
								type: "Date",
								config: {
									label: "Niches",
									placeholder: "Amet ex consequuntur",
								},
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
					maxime_sint_consectetur: {
						type: "Slice",
						icon: "methodologies",
						display: "list",
						fieldset: "Excepturi Praesentium Blanditiis",
						description: "Voluptatem ut doloribus tenetur et odio.",
						repeat: {
							nemo: {
								type: "Color",
								config: {
									label: "Convergence",
									placeholder: "Et ex distinctio",
								},
							},
							qui: {
								type: "Link",
								config: {
									label: "Markets",
									placeholder: "Temporibus culpa error",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							possimus_ex: {
								type: "Date",
								config: { label: "Platforms", placeholder: "Ut quidem nihil" },
							},
							dicta_nisi: {
								type: "StructuredText",
								config: {
									label: "Interfaces",
									placeholder: "Consequatur doloremque minus",
									single: "heading1,heading4,heading2,heading6,heading5",
									allowTargetBlank: true,
								},
							},
						},
						"non-repeat": {
							amet_qui: {
								type: "Link",
								config: {
									label: "Interfaces",
									placeholder: "Dicta officiis tenetur",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							exercitationem_molestiae_nostrum: {
								type: "Date",
								config: { label: "Eyeballs", placeholder: "Et commodi aut" },
							},
							nobis_qui: {
								type: "Image",
								config: {
									label: "Relationships",
									constraint: { width: null, height: null },
									thumbnails: [
										{ name: "Web Readiness", width: 1711, height: 588 },
									],
								},
							},
							nostrum_veniam: {
								type: "Timestamp",
								config: {
									label: "Systems",
									placeholder: "Nam eaque perspiciatis",
								},
							},
							ducimus_molestiae_inventore: {
								type: "StructuredText",
								config: {
									label: "Relationships",
									placeholder: "Nesciunt tenetur harum",
									single: "heading2,heading5,heading3",
									allowTargetBlank: true,
								},
							},
						},
					},
				},
			},
		},
		{
			type: "Slices",
			fieldset: "Slice zone",
			config: {
				labels: {
					et_sequi: [{ name: "Bandwidth", display: "grid" }],
					quia: [{ name: "Web Services", display: "list" }],
					molestias: [],
				},
				choices: {
					et_sequi: {
						type: "Slice",
						icon: "web_readiness",
						display: "grid",
						fieldset: "Qui Voluptatem Unde",
						description:
							"Est ratione animi et tenetur similique saepe deleniti harum.",
						repeat: {
							minima_qui: {
								type: "Color",
								config: {
									label: "Initiatives",
									placeholder: "Quibusdam sed qui",
								},
							},
							itaque_aspernatur_voluptatem: {
								type: "Image",
								config: {
									label: "Systems",
									constraint: { width: null, height: null },
									thumbnails: [
										{ name: "E Markets", width: 1808, height: 1667 },
									],
								},
							},
							molestiae_voluptas: {
								type: "Text",
								config: {
									label: "Bandwidth",
									placeholder: "Harum a voluptatem",
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
						"non-repeat": {
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
					quia: {
						type: "Slice",
						icon: "mindshare",
						display: "grid",
						fieldset: "Modi Ut Voluptas",
						description: "Veniam iusto explicabo.",
						repeat: {
							aut: {
								type: "StructuredText",
								config: {
									label: "E Tailers",
									placeholder: "Velit dolor praesentium",
									allowTargetBlank: undefined,
									multi:
										"embed,heading5,o-list-item,hyperlink,heading6,em,heading1,heading4,image,list-item",
								},
							},
							assumenda: { type: "GeoPoint", config: { label: "Models" } },
							aliquid_maxime: {
								type: "Text",
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
									select: null,
									allowTargetBlank: undefined,
								},
							},
							reiciendis_incidunt: {
								type: "Link",
								config: {
									label: "E Services",
									placeholder: "Ut dolorum eveniet",
									select: "media",
								},
							},
						},
						"non-repeat": {
							excepturi_ut_debitis: {
								type: "Date",
								config: {
									label: "Networks",
									placeholder: "Aperiam soluta animi",
								},
							},
							alias_mollitia_iure: {
								type: "Text",
								config: { label: "Markets", placeholder: "Quia alias quaerat" },
							},
							dolor_ratione_a: {
								type: "Link",
								config: {
									label: "Synergies",
									placeholder: "Nobis laboriosam illum",
									select: "media",
								},
							},
						},
					},
					molestias: {
						type: "Slice",
						icon: "channels",
						display: "list",
						fieldset: "Qui Dicta Accusantium",
						description: "Aut et deleniti earum omnis.",
						repeat: {
							vero_quae_minus: {
								type: "Color",
								config: {
									label: "Web Services",
									placeholder: "Cupiditate vel laboriosam",
								},
							},
							necessitatibus_vero: {
								type: "Date",
								config: {
									label: "Web Readiness",
									placeholder: "Error repellendus nihil",
								},
							},
							debitis_quo_iure: {
								type: "GeoPoint",
								config: { label: "Paradigms" },
							},
							ab: {
								type: "Text",
								config: { label: "Vortals", placeholder: "Ut officia a" },
							},
							in_sapiente: {
								type: "Number",
								config: {
									label: "Eyeballs",
									placeholder: "Tenetur repellendus quo",
								},
							},
						},
						"non-repeat": {
							iure_quam: { type: "Boolean", config: { label: "Metrics" } },
							natus: {
								type: "Color",
								config: {
									label: "Partnerships",
									placeholder: "Tenetur accusantium distinctio",
								},
							},
							quis_dolores: {
								type: "Link",
								config: {
									label: "Initiatives",
									placeholder: "Blanditiis totam provident",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							ad_sed_dicta: {
								type: "Link",
								config: {
									label: "Networks",
									placeholder: "Odio iure reiciendis",
									select: null,
									allowTargetBlank: true,
								},
							},
							omnis: {
								type: "Link",
								config: {
									label: "Platforms",
									placeholder: "At rerum voluptas",
									select: "media",
								},
							},
							fuga_vitae: {
								type: "Timestamp",
								config: { label: "Eyeballs", placeholder: "Atque ut id" },
							},
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
	() => model.sliceZone({ seed: 1 }),
	[
		{
			type: "Slices",
			fieldset: "Slice zone",
			config: {
				labels: {
					quisquam_recusandae_alias: [],
					officia_quaerat_cumque: [{ name: "Web Services", display: "grid" }],
					doloremque: [
						{ name: "Action Items", display: "list" },
						{ name: "Supply Chains", display: "list" },
						{ name: "Partnerships", display: "list" },
					],
					eum_saepe_nesciunt: [
						{ name: "Infrastructures", display: "grid" },
						{ name: "Networks", display: "grid" },
					],
				},
				choices: {
					quisquam_recusandae_alias: {
						type: "Slice",
						icon: "infrastructures",
						display: "list",
						fieldset: "Repellat Ratione Ut",
						description: "Qui amet iure.",
						repeat: {
							nulla_quam: {
								type: "Date",
								config: {
									label: "E Services",
									placeholder: "Nobis cupiditate sed",
								},
							},
							accusantium: {
								type: "GeoPoint",
								config: { label: "Architectures" },
							},
							blanditiis_natus: {
								type: "Text",
								config: { label: "Content", placeholder: "Eos itaque velit" },
							},
							porro_ut_et: {
								type: "Link",
								config: {
									label: "E Services",
									placeholder: "Explicabo eligendi occaecati",
									select: null,
									allowTargetBlank: true,
								},
							},
							eum_dicta_eum: {
								type: "Link",
								config: {
									label: "Web Readiness",
									placeholder: "Enim ipsum inventore",
									select: "media",
								},
							},
							aspernatur_deserunt_quam: {
								type: "Number",
								config: {
									label: "Infomediaries",
									placeholder: "A velit provident",
								},
							},
						},
						"non-repeat": {
							velit_sit_aperiam: {
								type: "Link",
								config: {
									label: "Deliverables",
									placeholder: "Fuga doloribus distinctio",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							aut: {
								type: "Text",
								config: {
									label: "Markets",
									placeholder: "Ducimus totam voluptates",
								},
							},
							sed: {
								type: "Number",
								config: {
									label: "Infrastructures",
									placeholder: "Cupiditate sit vitae",
								},
							},
							voluptates: {
								type: "Select",
								config: {
									label: "E Markets",
									placeholder: "Illo error sunt",
									options: ["Empower", "Target"],
									default_value: undefined,
								},
							},
						},
					},
					officia_quaerat_cumque: {
						type: "Slice",
						icon: "communities",
						display: "list",
						fieldset: "Provident Esse Hic",
						description: "Quos esse ut ab voluptas sed quae nam.",
						repeat: {
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
								config: {
									label: "Initiatives",
									placeholder: "Et molestiae ea",
								},
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
						"non-repeat": {
							ex_rem_voluptates: {
								type: "Date",
								config: {
									label: "Users",
									placeholder: "Fuga totam perferendis",
								},
							},
							eligendi_omnis_repellat: {
								type: "GeoPoint",
								config: { label: "Markets" },
							},
							optio: {
								type: "Number",
								config: {
									label: "Vortals",
									placeholder: "Et incidunt possimus",
								},
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
					doloremque: {
						type: "Slice",
						icon: "convergence",
						display: "list",
						fieldset: "Aut Eos Quis",
						description: "Incidunt omnis delectus voluptas minima quia ut.",
						repeat: {
							natus_consequatur: {
								type: "Embed",
								config: { label: "Synergies", placeholder: "Vel et nostrum" },
							},
							iure_molestiae: {
								type: "Text",
								config: {
									label: "Metrics",
									placeholder: "Facere placeat molestiae",
								},
							},
						},
						"non-repeat": {
							sint: { type: "Boolean", config: { label: "Partnerships" } },
							et: {
								type: "Color",
								config: { label: "Mindshare", placeholder: "Aperiam natus et" },
							},
							similique_ad: {
								type: "Image",
								config: {
									label: "Markets",
									constraint: { width: null, height: null },
									thumbnails: [],
								},
							},
							quis_ut: {
								type: "Select",
								config: {
									label: "Deliverables",
									placeholder: "Labore ullam quos",
									options: ["Generate"],
									default_value: undefined,
								},
							},
						},
					},
					eum_saepe_nesciunt: {
						type: "Slice",
						icon: "users",
						display: "list",
						fieldset: "Et Quasi Eaque",
						description: "Vel id omnis similique blanditiis voluptatem.",
						repeat: {
							culpa: {
								type: "Color",
								config: {
									label: "Platforms",
									placeholder: "Vel molestias omnis",
								},
							},
							laudantium_voluptatem_magni: {
								type: "Embed",
								config: {
									label: "Paradigms",
									placeholder: "Voluptas quis non",
								},
							},
							et: {
								type: "Link",
								config: {
									label: "Portals",
									placeholder: "Quaerat explicabo aut",
									select: "media",
								},
							},
							in_cupiditate: {
								type: "Select",
								config: {
									label: "Mindshare",
									placeholder: "Id cupiditate est",
									options: [
										"Cultivate",
										"Benchmark",
										"Incentivize",
										"Monetize",
										"Streamline",
									],
									default_value: undefined,
								},
							},
							recusandae: {
								type: "StructuredText",
								config: {
									label: "Users",
									placeholder: "Hic in hic",
									single: "heading2,heading5,heading6,heading3,heading1",
									allowTargetBlank: true,
								},
							},
						},
						"non-repeat": {
							rerum: {
								type: "Link",
								config: {
									label: "Experiences",
									placeholder: "Reprehenderit exercitationem corrupti",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							sint_consequatur_qui: {
								type: "Link",
								config: {
									label: "E Commerce",
									placeholder: "Sapiente aperiam quia",
									select: null,
									allowTargetBlank: undefined,
								},
							},
						},
					},
				},
			},
		},
		{
			type: "Slices",
			fieldset: "Slice zone",
			config: {
				labels: {
					earum: [
						{ name: "Networks", display: "grid" },
						{ name: "Supply Chains", display: "grid" },
						{ name: "Supply Chains", display: "list" },
					],
					magni: [
						{ name: "Content", display: "grid" },
						{ name: "E Markets", display: "list" },
						{ name: "Blockchains", display: "list" },
					],
					quas: [],
				},
				choices: {
					earum: {
						type: "Slice",
						icon: "action_items",
						display: "grid",
						fieldset: "Eveniet Debitis Et",
						description:
							"Voluptatem et delectus praesentium et unde ut quibusdam in.",
						repeat: {
							ipsam_perferendis: {
								type: "Date",
								config: {
									label: "Web Services",
									placeholder: "Deserunt eius et",
								},
							},
							ipsam_ut_saepe: {
								type: "GeoPoint",
								config: { label: "Networks" },
							},
							laborum_quae: {
								type: "Number",
								config: {
									label: "Paradigms",
									placeholder: "Perferendis quam ab",
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
						"non-repeat": {
							vero: {
								type: "Embed",
								config: {
									label: "Web Readiness",
									placeholder: "Possimus temporibus optio",
								},
							},
							consequatur_quia_voluptatem: {
								type: "GeoPoint",
								config: { label: "Infomediaries" },
							},
						},
					},
					magni: {
						type: "Slice",
						icon: "e_commerce",
						display: "grid",
						fieldset: "Et Dolorem Aut",
						description: "Cum nobis velit ad molestiae aut.",
						repeat: {
							aut: {
								type: "Link",
								config: {
									label: "Web Services",
									placeholder: "Et dolor nam",
									select: "document",
									customtypes: undefined,
									tags: undefined,
								},
							},
							non_eos: {
								type: "Link",
								config: {
									label: "Networks",
									placeholder: "Amet sunt vitae",
									select: null,
									allowTargetBlank: true,
								},
							},
							similique: {
								type: "Select",
								config: {
									label: "Networks",
									placeholder: "Nisi quidem et",
									options: ["Brand"],
									default_value: undefined,
								},
							},
							nihil_beatae: {
								type: "Timestamp",
								config: {
									label: "Communities",
									placeholder: "Voluptatibus quae sit",
								},
							},
						},
						"non-repeat": {
							officiis_architecto_est: {
								type: "Boolean",
								config: { label: "Bandwidth" },
							},
							voluptatum_tempora: {
								type: "Image",
								config: {
									label: "E Markets",
									constraint: { width: null, height: null },
									thumbnails: [
										{ name: "Applications", width: 968, height: 709 },
										{ name: "Experiences", width: 1310, height: 1865 },
										{ name: "Supply Chains", width: 885, height: 828 },
									],
								},
							},
						},
					},
					quas: {
						type: "Slice",
						icon: "roi",
						display: "grid",
						fieldset: "At Illo Esse",
						description: "Et id ut voluptatem.",
						repeat: {
							temporibus_voluptatum: {
								type: "Color",
								config: {
									label: "Eyeballs",
									placeholder: "Sequi velit dolorum",
								},
							},
							ratione_modi_ab: {
								type: "Link",
								config: {
									label: "Relationships",
									placeholder: "Eveniet repellendus porro",
									select: null,
									allowTargetBlank: undefined,
								},
							},
							nulla: {
								type: "Select",
								config: {
									label: "Metrics",
									placeholder: "Fuga hic velit",
									options: ["Deliver", "Implement"],
									default_value: undefined,
								},
							},
							at_quia: {
								type: "Timestamp",
								config: { label: "Partnerships", placeholder: "Quae et est" },
							},
						},
						"non-repeat": {
							voluptate_et: { type: "Boolean", config: { label: "Models" } },
							minus_corporis_quaerat: {
								type: "Date",
								config: {
									label: "E Services",
									placeholder: "Quaerat tempora harum",
								},
							},
							excepturi_ducimus_et: {
								type: "Image",
								config: {
									label: "Paradigms",
									constraint: { width: null, height: null },
									thumbnails: [
										{ name: "Blockchains", width: 1169, height: 950 },
										{ name: "Methodologies", width: 714, height: 1039 },
										{
											name: "Functionalities",
											width: 1331,
											height: 1312,
										},
									],
								},
							},
							quidem_sed_asperiores: {
								type: "Link",
								config: {
									label: "Blockchains",
									placeholder: "Perspiciatis distinctio non",
									select: null,
									allowTargetBlank: true,
								},
							},
							provident: {
								type: "Select",
								config: {
									label: "Deliverables",
									placeholder: "Sint doloremque ipsam",
									options: ["Incubate"],
									default_value: undefined,
								},
							},
						},
					},
				},
			},
		},
	],
);

test("can be configured with a specific number of choices", (t) => {
	const actual = model.sliceZone({ choicesCount: 10 });

	t.is(Object.keys(actual.config.choices).length, 10);
});

test(
	"can be configured to use Shared Slices",
	executeOnceMacro,
	() => model.sliceZone({ withSharedSlices: true }),
	[
		{
			type: "Slices",
			fieldset: "Slice zone",
			config: {
				labels: {},
				choices: {
					maxime_quia: { type: "SharedSlice" },
					ut_repudiandae: { type: "SharedSlice" },
					eos: { type: "SharedSlice" },
					quam: { type: "SharedSlice" },
					incidunt_ut_velit: { type: "SharedSlice" },
				},
			},
		},
	],
);
