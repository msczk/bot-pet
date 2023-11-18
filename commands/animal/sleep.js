const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
const { pet_api_url } = require('../../config/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleep')
		.setDescription('Used to put to sleep your animal')
		.addStringOption(option =>
			option.setName('animal')
				.setDescription('The animal you want to put to sleep')
				.setRequired(true)),
	async execute(interaction) 
	{
		let animal = interaction.options.getString('animal');
		
		axios.put(pet_api_url+'game/sleep', {
			id_discord: interaction.user.id,
			slug: animal
		  })
		  .then(function (response) {
			// console.log(response.data.data.name)
			 interaction.reply(`Your ${response.data.data.name} went to bed!`);
		  })
		  .catch(function (error) {
			interaction.reply(error.response.data.error);
		  });
	},
};