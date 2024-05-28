docker exec -it dkron sh /curl/curl.sh
curl  -XPOST localhost:9911/v1/jobs -d @scheduled_metrics_jobs.json




