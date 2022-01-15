FROM node:16

EXPOSE 8123

WORKDIR /home/node/
RUN apt-get update && apt-get install wget tar python3-pip -y

RUN wget https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-armhf-static.tar.xz
RUN tar xfv $(ls | grep ffmpeg) -C /tmp
RUN cp /tmp/"$(ls /tmp | grep ffmpeg)"/ffmpeg /usr/local/bin
RUN rm $(ls | grep ffmpeg)

RUN pip3 install spotdl

RUN npm init -y
RUN npm install discord.js@13.5.1 @discordjs/voice
RUN npm install ffmpeg fluent-ffmpeg @discordjs/opus sodium

COPY index.js ./
COPY commands/ ./commands/

RUN mkdir /music

CMD ["node","/home/node/index.js"]
