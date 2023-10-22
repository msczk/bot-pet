const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Used to test if the commands are working'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};