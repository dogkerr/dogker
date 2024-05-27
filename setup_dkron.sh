docker exec -it dkron sh /curl/curl.sh
curl  -XPOST localhost:9911/v1/jobs -d @scheduled_metrics_jobs.json
curl -XPOST localhost:9911/v1/jobs  -d @scheduled_terminated_container_jobs.json

curl -XPOST localhost:9911/v1/jobs  -d @scheduled_fix_stop_status_container.json



