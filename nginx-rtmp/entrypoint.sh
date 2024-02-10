#!/bin/bash

envsubst < /tmp/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"
