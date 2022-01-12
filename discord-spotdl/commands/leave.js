const DiscordVoice = require('@discordjs/voice');
module.exports = {
	name: 'leave',
	description: 'leave',
	aliases: ['quit'],
    guildOnly: true,
	args: false,
	usage: '<>',
	execute(message, args) {
		const channel = message.member.voice.channel;

		const connection = DiscordVoice.joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		connection.destroy();
	}
};
