FROM tiangolo/nginx-rtmp

RUN apt-get update && apt-get install -y \
    python3-requests \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
