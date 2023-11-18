const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
const { pet_api_url } = require('../../config/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Used to play with your animal')
		.addStringOption(option =>
			option.setName('animal')
				.setDescription('The animal you want to play with')
				.setRequired(true)),
	async execute(interaction) 
	{
		let animal = interaction.options.getString('animal');
		
		axios.put(pet_api_url+'game/play', {
			id_discord: interaction.user.id,
			slug: animal
		  })
		  .then(function (response) {
			// console.log(response.data.data.name)
			 interaction.reply(`You played with your ${response.data.data.name}!`);
		  })
		  .catch(function (error) {
			interaction.reply(error.response.data.error);
		  });
	},
};