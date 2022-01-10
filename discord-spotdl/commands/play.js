const DiscordVoice = require('@discordjs/voice');
module.exports = {
	name: 'play',
	description: 'play',
	aliases: ['sound'],
    guildOnly: true,
	args: false,
	usage: '<sound url>',
	execute(message, args) {
		//console.log(message);
		//console.log(message.member);
		//console.log(message.member.voice);
		//console.log(message.member.voice.channel);
		
		const channel = message.member.voice.channel;
		const connection = DiscordVoice.joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});
		const player = DiscordVoice.createAudioPlayer();
		const resource = DiscordVoice.createAudioResource('/home/node/commands/audio.mp3', { inputType: DiscordVoice.StreamType.OggOpus, inlineVolume: true });
		resource.volume.setVolume(1);
		player.play(resource);
		connection.subscribe(player);
		
	}
};
