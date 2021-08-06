import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Slice field model", executeTwiceMacro, model.slice, [
	{
		type: "Slice",
		icon: "synergies",
		display: "list",
		fieldset: "Ullam Voluptate Inventore",
		description:
			"Atque voluptatibus veniam excepturi autem consequuntur nostrum repellat minus.",
		repeat: { saepe: { type: "Boolean", config: { label: "Mindshare" } } },
		"non-repeat": {
			tempora_quasi_ab: {
				type: "Date",
				config: { label: "Users", placeholder: "Fugit omnis asperiores" },
			},
			in: { type: "GeoPoint", config: { label: "Niches" } },
		},
	},
	{
		type: "Slice",
		icon: "models",
		display: "list",
		fieldset: "Repudiandae Laboriosam Et",
		description: "Animi beatae architecto consequatur aut.",
		repeat: {
			sint_consectetur_aut: {
				type: "GeoPoint",
				config: { label: "Solutions" },
			},
			tenetur_et_odio: {
				type: "StructuredText",
				config: {
					label: "Markets",
					placeholder: "Temporibus culpa error",
					allowTargetBlank: true,
					single:
						"embed,preformatted,o-list-item,image,em,heading6,heading4,heading2,hyperlink",
				},
			},
			ratione_ut: {
				type: "Timestamp",
				config: { label: "Systems", placeholder: "Nihil neque molestias" },
			},
		},
		"non-repeat": {
			dicta_nisi: {
				type: "Text",
				config: { label: "Schemas", placeholder: "Maxime accusamus suscipit" },
			},
			veritatis: {
				type: "StructuredText",
				config: {
					label: "Web Services",
					placeholder: "Delectus nobis exercitationem",
					single: "heading3,heading6,heading2,heading5,heading1,heading4",
					allowTargetBlank: true,
				},
			},
		},
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.slice({ seed: 1 }),
	[
		{
			type: "Slice",
			icon: "technologies",
			display: "grid",
			fieldset: "Quisquam Recusandae Alias",
			description: "Corporis repellat ratione ut.",
			repeat: {
				nulla_quam: {
					type: "Text",
					config: { label: "E Services", placeholder: "Nobis cupiditate sed" },
				},
				accusantium: {
					type: "Link",
					config: {
						label: "Architectures",
						placeholder: "Libero repudiandae esse",
						select: "media",
					},
				},
				omnis: {
					type: "StructuredText",
					config: {
						label: "Models",
						placeholder: "Occaecati debitis et",
						single: "heading3,heading1,heading4,heading6,heading5",
						allowTargetBlank: true,
					},
				},
			},
			"non-repeat": {
				eum: { type: "Boolean", config: { label: "Web Readiness" } },
				aspernatur_deserunt_quam: {
					type: "Embed",
					config: { label: "Infomediaries", placeholder: "A velit provident" },
				},
				velit_sit_aperiam: {
					type: "StructuredText",
					config: {
						label: "Functionalities",
						placeholder: "Explicabo exercitationem ut",
						allowTargetBlank: undefined,
						single:
							"preformatted,heading6,heading1,heading2,paragraph,list-item,heading3,heading4,image,strong,embed,em",
					},
				},
			},
		},
		{
			type: "Slice",
			icon: "synergies",
			display: "list",
			fieldset: "Soluta Sint Non",
			description: "Ut ullam quos qui illo error sunt laborum ratione a.",
			repeat: {
				quos_esse_ut: {
					type: "Text",
					config: { label: "Paradigms", placeholder: "Voluptas sed quae" },
				},
				doloremque_officia_aut: {
					type: "StructuredText",
					config: {
						label: "Deliverables",
						placeholder: "Quidem est consequuntur",
						allowTargetBlank: true,
						multi:
							"image,o-list-item,heading5,paragraph,heading1,preformatted,list-item,heading4,hyperlink,em,embed,heading6,heading2,strong",
					},
				},
			},
			"non-repeat": {
				ut_voluptas: { type: "Boolean", config: { label: "Solutions" } },
				molestiae_aut_delectus: {
					type: "Link",
					config: {
						label: "Synergies",
						placeholder: "Nam et dolorum",
						select: "document",
					},
				},
				veritatis_qui_ex: { type: "GeoPoint", config: { label: "E Markets" } },
				vel_labore: {
					type: "Image",
					config: {
						label: "Functionalities",
						constraint: { width: null, height: null },
						thumbnails: [
							{ name: "Users", width: 1361, height: 952 },
							{ name: "Synergies", width: 1659, height: 1426 },
							{ name: "Platforms", width: 990, height: 1368 },
						],
					},
				},
				ex_rem_voluptates: {
					type: "Link",
					config: {
						label: "Users",
						placeholder: "Fuga totam perferendis",
						select: "media",
					},
				},
				eligendi_omnis_repellat: {
					type: "StructuredText",
					config: {
						label: "Deliverables",
						placeholder: "Recusandae consectetur optio",
						allowTargetBlank: undefined,
						single: "paragraph,heading3",
					},
				},
				facere_quia: {
					type: "StructuredText",
					config: {
						label: "Niches",
						placeholder: "Accusantium odit doloremque",
						single: "heading2,heading5,heading6,heading3,heading4,heading1",
						allowTargetBlank: true,
					},
				},
			},
		},
	],
);

test(
	"can be configured with specific repeat and non-repeat field configuration",
	executeTwiceMacro,
	() =>
		model.slice({
			repeatFieldConfig: {
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
			nonRepeatFieldConfig: {
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
			description: "Aperiam molestiae nisi nobis.",
			display: "list",
			fieldset: "Et Commodi Aut",
			icon: "e_tailers",
			"non-repeat": {
				consequatur: {
					config: {
						label: "Paradigms",
					},
					type: "Boolean",
				},
			},
			repeat: {
				ad: {
					config: {
						label: "Relationships",
					},
					type: "Boolean",
				},
			},
			type: "Slice",
		},
		{
			description: "Repellat ex nostrum veniam fuga nam eaque.",
			display: "list",
			fieldset: "Nam Deserunt Aliquam",
			icon: "systems",
			"non-repeat": {
				inventore_ea_iure: {
					config: {
						label: "Web Services",
					},
					type: "Boolean",
				},
			},
			repeat: {
				non_et: {
					config: {
						label: "Vortals",
					},
					type: "Boolean",
				},
			},
			type: "Slice",
		},
	],
);
