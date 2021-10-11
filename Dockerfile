FROM node:latest

EXPOSE 3000

WORKDIR /home/node/

RUN apt-get update && apt-get upgrade -y

RUN apt-get install wget tar python3-pip -y

# https://github.com/spotDL/spotify-downloader
RUN pip3 install spotdl

# https://johnvansickle.com/ffmpeg/
RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
RUN tar xfv $(ls | grep ffmpeg) -C /tmp
RUN cp /tmp/"$(ls /tmp | grep ffmpeg)"/ffmpeg /usr/local/bin
RUN rm $(ls | grep ffmpeg)

RUN mkdir /home/node/music/

RUN npm init -y
RUN npm install --save express body-parser ejs


COPY app.js .
COPY index.ejs .

CMD ["node", "/home/node/app.js"]
