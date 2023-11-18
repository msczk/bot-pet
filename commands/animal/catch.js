const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
const { pet_api_url } = require('../../config/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('catch')
		.setDescription('Used to catch a random animal'),
	async execute(interaction) 
	{
		axios.post(pet_api_url+'game/catch/random', {
			id_discord: interaction.user.id,
		  })
		  .then(function (response) {
			// console.log(response.data.data.name)
			 interaction.reply(`You caught a ${response.data.data.name}!`);
		  })
		  .catch(function (error) {
			interaction.reply(error.response.data.error);
		  });
	},
};