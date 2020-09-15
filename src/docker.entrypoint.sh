#!/usr/bin/env sh
set -eu

envsubst < /usr/share/nginx/html/assets/template.config.json > /usr/share/nginx/html/assets/config.json

exec "$@"
