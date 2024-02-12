FROM tiangolo/nginx-rtmp

RUN apt-get update && apt-get install -y \
    ffmpeg \
    gettext \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /mnt/hls/main /mnt/hls/test

COPY nginx.conf.template /tmp/
COPY stat.xsl /usr/local/nginx/html/
COPY entrypoint.sh .

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
