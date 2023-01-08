const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

		let url = interaction.options.getString("url")

		const result = await client.player.search(url, {
			requestedBy: interaction.user,
			searchEngine: QueryType.YOUTUBE_VIDEO
		})
		const song = queue.current 

		await interaction.editReply({
			embeds: [new EmbedBuilder()
			.setThumbnail(song.thumbnail)
			.setDescription(`Youre listening to [${song.title}](${song.url})\n\n`+ bar)
			],
			
		})
	},

}


