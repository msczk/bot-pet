const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;
const { pet_api_url } = require('../../config/config.json');
const { codeBlock } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mypets')
		.setDescription('Used to consult the list of your animals'),
	async execute(interaction) 
	{
		axios.get(pet_api_url+'discord-users/animals/'+interaction.user.id)
		  .then(function (response) {
            let response_messages = [];

            response.data.data.forEach((element) => response_messages.push(formatPetMessage(element)));

			interaction.reply(codeBlock(response_messages.join('\n\n')));
		  })
		  .catch(function (error) {
			interaction.reply(error.response.data.error);
		  });
	},
};

function formatPetMessage(pet)
{
    let hunger = amusement = sleep = '❌';

    if(pet.hunger > 0)
    {
        hunger = '';
        for (let index = 0; index < pet.hunger; index++) {
            hunger += '🍗'
        }
    }

    if(pet.amusement > 0)
    {
        amusement = '';
        for (let index = 0; index < pet.amusement; index++) {
            amusement += '🎮'
        }
    }

    if(pet.sleep > 0)
    {
        sleep = '';
        for (let index = 0; index < pet.sleep; index++) {
            sleep += '🛌'
        }
    }

    return pet.name+' (id: '+pet.slug+')'+'\n'+'Hunger : '+hunger+'\n'+'Amusement : '+amusement+'\n'+'Sleep : '+sleep;
}