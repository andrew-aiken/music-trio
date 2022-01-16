const DiscordVoice = require('@discordjs/voice');
const { exec } = require('child_process');
const { syncBuiltinESMExports } = require('module');
module.exports = {
	name: 'play',
	description: 'play',
	aliases: ['sound', 'song'],
    guildOnly: true,
	args: true,
	usage: '<sound url>',
	execute(message, args) {

		reactionVar = message.react('⏳');

		exec("rm -f /music/*", (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
		});

		exec(`spotdl --output /music ${args} && rm -f .spotdl-cache spotdl-temp && sleep 1 && mv /music/* /music/song.mp3`, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				reactionVar = message.react('⚠');
				//NOTE DISPLAY MSG
				return;
			}
			console.log(stdout);

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
		});

	}
};
