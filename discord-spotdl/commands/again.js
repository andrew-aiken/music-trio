const DiscordVoice = require('@discordjs/voice');
const { exec } = require('child_process');
const { syncBuiltinESMExports } = require('module');
module.exports = {
	name: 'again',
	description: 'again',
	aliases: ['foo', 'bar'],
    guildOnly: true,
	args: false,
	usage: '<sound url>',
	execute(message, args) {
		
		reactionVar = message.react('✅');

		const channel = message.member.voice.channel;

		const connection = DiscordVoice.joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		const player = DiscordVoice.createAudioPlayer();
		const resource = DiscordVoice.createAudioResource('/music/song.mp3', { inputType: DiscordVoice.StreamType.OggOpus, inlineVolume: true });

		resource.volume.setVolume(0.5);
		player.play(resource);
		connection.subscribe(player);

		async function sleep() {
			await new Promise(resolve => setTimeout(resolve, 360000));
			connection.destroy();
		}
		sleep();
	}
};
