FROM tiangolo/nginx-rtmp

RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /mnt/hls/main /mnt/hls/test

COPY nginx.conf /etc/nginx/nginx.conf
COPY stat.xsl /usr/local/nginx/html/stat.xsl
