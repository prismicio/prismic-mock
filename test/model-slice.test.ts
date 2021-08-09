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
						customtypes: undefined,
						tags: undefined,
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
	"supports custom seed for repeat field",
	executeTwiceMacro,
	() =>
		model.slice({
			seed: 1,
			repeatFieldConfig: {
				seed: 2,
			},
		}),
	[
		{
			type: "Slice",
			icon: "roi",
			display: "list",
			fieldset: "Eos Quis Ut",
			description: "Omnis delectus voluptas minima.",
			repeat: {
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
			"non-repeat": {
				natus_consequatur: {
					type: "Image",
					config: {
						label: "Networks",
						constraint: { width: null, height: null },
						thumbnails: [],
					},
				},
				ut: {
					type: "Text",
					config: { label: "Mindshare", placeholder: "Aut laborum iure" },
				},
				placeat_molestiae_iste: {
					type: "Link",
					config: {
						label: "Content",
						placeholder: "Dolores commodi inventore",
						select: "media",
					},
				},
				sint: {
					type: "Select",
					config: {
						label: "Communities",
						placeholder: "Et quo aperiam",
						options: ["Drive"],
						default_value: undefined,
					},
				},
			},
		},
		{
			type: "Slice",
			icon: "synergies",
			display: "list",
			fieldset: "Quasi Exercitationem Delectus",
			description: "Similique ad sed architecto magnam.",
			repeat: {
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
			"non-repeat": {
				quis_ut: {
					type: "Embed",
					config: { label: "Paradigms", placeholder: "Nulla quod labore" },
				},
				saepe_nesciunt_omnis: {
					type: "Link",
					config: {
						label: "Synergies",
						placeholder: "Et quasi eaque",
						select: "media",
					},
				},
				omnis_similique: {
					type: "StructuredText",
					config: {
						label: "Architectures",
						placeholder: "Numquam maxime sint",
						allowTargetBlank: true,
						multi:
							"heading4,o-list-item,paragraph,heading2,image,preformatted,heading5",
					},
				},
			},
		},
	],
);

test(
	"supports custom seed for non-repeat field",
	executeTwiceMacro,
	() =>
		model.slice({
			seed: 1,
			nonRepeatFieldConfig: {
				seed: 2,
			},
		}),
	[
		{
			type: "Slice",
			icon: "paradigms",
			display: "grid",
			fieldset: "Quis Non Et",
			description: "Non explicabo facere.",
			repeat: {
				adipisci: { type: "GeoPoint", config: { label: "Experiences" } },
				fuga_voluptatem_quia: {
					type: "Link",
					config: {
						label: "Paradigms",
						placeholder: "Qui id cupiditate",
						select: "media",
					},
				},
				voluptates_dolorem_recusandae: {
					type: "Number",
					config: {
						label: "Infomediaries",
						placeholder: "Perferendis molestiae ut",
					},
				},
				in_hic_molestiae: {
					type: "Timestamp",
					config: {
						label: "Interfaces",
						placeholder: "Sed repudiandae consequatur",
					},
				},
			},
			"non-repeat": {
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
			type: "Slice",
			icon: "experiences",
			display: "list",
			fieldset: "Exercitationem Corrupti Dolorem",
			description:
				"Accusantium unde qui molestiae consequatur sint consequatur.",
			repeat: {
				quia: {
					type: "Link",
					config: {
						label: "Action Items",
						placeholder: "Consequuntur beatae dolores",
						select: "document",
						customtypes: undefined,
						tags: undefined,
					},
				},
				dolorem_suscipit_perferendis: {
					type: "Link",
					config: {
						label: "Supply Chains",
						placeholder: "Quia odit sit",
						select: null,
						allowTargetBlank: true,
					},
				},
				sed_nisi_veniam: {
					type: "Number",
					config: { label: "Web Services", placeholder: "Ex culpa eveniet" },
				},
				nulla: {
					type: "StructuredText",
					config: {
						label: "Vortals",
						placeholder: "Et unde ut",
						allowTargetBlank: true,
						multi: "embed",
					},
				},
			},
			"non-repeat": {
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
	const actual = model.slice({
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
	});

	const repeatFieldIds = Object.keys(actual.repeat);
	const nonRepeatFieldIds = Object.keys(actual["non-repeat"]);

	t.is(repeatFieldIds.length, 1);
	t.is(actual.repeat[repeatFieldIds[0]].type, "Boolean");

	t.is(nonRepeatFieldIds.length, 1);
	t.is(actual["non-repeat"][nonRepeatFieldIds[0]].type, "Boolean");
});
