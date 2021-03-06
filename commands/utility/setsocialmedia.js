const Discord = require('discord.js');
exports.run = (client, msg, args, lang) => {
	const validation = ['delete', 'edit', 'list'];
	const validation2 = ['youtube', 'twitch', 'instagram', 'twitter'];
	const margs = msg.content.split(' ');
	const userdb = client.userdb.get(msg.author.id);

	if (args.slice().length === 0) return msg.reply(lang.setsocialmedia_error1);

	for (let i = 0; i < margs.length; i++) {
		if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
			if (margs[1].toLowerCase() === 'edit') {
				if (args.slice(1).length === 0) return msg.reply(lang.setsocialmedia_error2);
				if (args.slice(2).length === 0) return msg.reply(lang.setsocialmedia_error3);
				for (let index = 0; index < margs.length; index++) {
					if (validation2.indexOf(margs[index].toLowerCase()) >= 0) {
						if (margs[2].toLowerCase() === 'youtube') {
							userdb.socialmedia.youtube = args.slice(2).join(' ');
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_newyoutube);
						} else if (margs[2].toLowerCase() === 'twitch') {
							userdb.socialmedia.twitch = args.slice(2).join(' ');
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_newtwitch);
						} else if (margs[2].toLowerCase() === 'instagram') {
							userdb.socialmedia.instagram = args.slice(2).join(' ');
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_newinstagram);
						} else if (margs[2].toLowerCase() === 'twitter') {
							userdb.socialmedia.twitter = args.slice(2).join(' ');
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_newtwitter);
						}
					}
				}
				return msg.reply(lang.setsocialmedia_error4);
			} else if (margs[1].toLowerCase() === 'delete') {
				if (args.slice(1).length === 0) return msg.reply(lang.setsocialmedia_error2);
				for (let index = 0; index < margs.length; index++) {
					if (validation2.indexOf(margs[index].toLowerCase()) >= 0) {
						if (margs[2].toLowerCase() === 'youtube') {
							if (userdb.socialmedia.youtube === '') return msg.reply(lang.setsocialmedia_notsetup);
							userdb.socialmedia.youtube = '';
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_deleteyoutube);
						} else if (margs[2].toLowerCase() === 'twitch') {
							if (userdb.socialmedia.twitch === '') return msg.reply(lang.setsocialmedia_notsetup);
							userdb.socialmedia.twitch = '';
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_deletetwitch);
						} else if (margs[2].toLowerCase() === 'instagram') {
							if (userdb.socialmedia.instagram === '') return msg.reply(lang.setsocialmedia_notsetup);
							userdb.socialmedia.instagram = '';
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_deleteinstagram);
						} else if (margs[2].toLowerCase() === 'twitter') {
							if (userdb.socialmedia.twitter === '') return msg.reply(lang.setsocialmedia_notsetup);
							userdb.socialmedia.twitter = '';
							client.userdb.set(msg.author.id, userdb);

							return msg.reply(lang.setsocialmedia_deletetwitter);
						}
					}
				}
				return msg.reply(lang.setsocialmedia_error4);
			} else if (margs[1].toLowerCase() === 'list') {
				const embed = new Discord.RichEmbed()
					.setTimestamp()
					.setColor(' ');

				/* eslint guard-for-in: 0 */
				for (const key in userdb.socialmedia) {
					embed.addField(lang[`setsocialmedia_${key}`], userdb.socialmedia[key] === '' ? lang.setsocialmedia_notlinked : userdb.socialmedia[key]);
				}

				return msg.channel.send({
					embed: embed
				});
			}
		}
	}
	return msg.reply(lang.setsocialmedia_error4);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	shortDescription: 'General',
	aliases: [],
	userpermissions: [],
	dashboardsettings: true
};
exports.help = {
	name: 'setsocialmedia',
	description: 'Allows you to connect a social media account to your discord account',
	usage: 'setsocialmedia {edit/delete/list} [youtube, twitch, instagram, twitter]',
	example: ['setsocialmedia edit youtube Monkeyyy11', 'setsocialmedia delete twitch', 'setsocialmedia list'],
	category: 'utility',
	botpermissions: ['SEND_MESSAGES']
};
