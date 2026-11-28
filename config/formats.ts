// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: import('../sim/dex-formats').FormatList = [

	// Añil
	///////////////////////////////////////////////////////////////////

	{
		section: "Polla gorda",
	},
	{
		name: "Torneo",
		section: "Polla gorda",
		mod: 'gen9',
		ruleset: ['Team Preview', 'Terastal Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Adjust Level Down = 50', 'Force Open Team Sheets'],
		onValidateTeam(team) {
			// Esto aprueba el equipo entero ignorando legalidad, movimientos, habilidades u objetos
			return [];
		},
	},
	{
		name: "Torneo dobles",
		section: "Polla gorda",
		mod: 'gen9',
        gameType: 'doubles',
		ruleset: ['Team Preview', 'Terastal Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Adjust Level Down = 50', 'Picked Team Size = 4', 'VGC Timer', 'Force Open Team Sheets'],
		onValidateTeam(team) {
			const restrictedTags = new Set([
				'Restricted Legendary',
				'Sub-Legendary',
				'Mythical',
				'Paradox',
			]);
			const pseudoLegendaries = new Set([
				'dragonite', 'tyranitar', 'salamence', 'metagross', 'garchomp',
				'hydreigon', 'goodra', 'kommoo', 'dragapult', 'baxcalibur', 'archaludon',
			]);

			let count = 0;
			const flagged: string[] = [];

			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const baseSpecies = this.dex.species.get(species.baseSpecies);

				const hasLegendaryTag =
					species.tags.some(tag => restrictedTags.has(tag)) ||
					baseSpecies.tags.some(tag => restrictedTags.has(tag));

				const isPseudo =
					pseudoLegendaries.has(species.id) ||
					pseudoLegendaries.has(baseSpecies.id);

				if (hasLegendaryTag || isPseudo) {
					count++;
					flagged.push(species.name);
				}
			}

			if (count > 3) {
				return [
					`Solo puedes llevar 3 legendarios o pseudos en el equipo..`,
					`(Ahora mismo llevas ${count}: ${flagged.join(', ')})`,
				];
			}
		},
	},
];
