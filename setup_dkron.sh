docker exec -it dkron sh /curl/curl.sh
curl localhost:9911/v1/jobs -XPOST -d @scheduled_metrics_jobs.json
