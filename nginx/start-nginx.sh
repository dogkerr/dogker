#!/bin/sh

# substitute environment variables in the template
envsubst '$$MONITOR_SERVICE_URL $$GRAFANA_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g 'daemon off;'
