FROM alpine:3.15

ENV DOWNLOAD_PATH=/data/
ENV PLAYLIST="https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=42c628ba425149d4"
ENV OUTPUT_FORMAT='mp3'

RUN mkdir /data/

RUN apk update && apk add ffmpeg \
						  py3-pip \
						  gcc \
						  g++ \
						  python3 \
						  py3-setuptools \
						  python3-dev

RUN pip3 install spotdl

RUN echo "spotdl --output-format \${OUTPUT_FORMAT} --output \${DOWNLOAD_PATH} \${PLAYLIST}" > /run.sh

CMD ["sh", "/run.sh"]
