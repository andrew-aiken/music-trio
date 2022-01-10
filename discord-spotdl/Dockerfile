FROM node:16

EXPOSE 8123

WORKDIR /home/node/
RUN apt-get update && apt-get install -y ffmpeg

RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

RUN npm init -y
RUN npm install discord.js@13.5.1 @discordjs/voice
RUN npm install ffmpeg fluent-ffmpeg @discordjs/opus sodium

COPY . .

CMD ["node","/home/node/index.js"]
