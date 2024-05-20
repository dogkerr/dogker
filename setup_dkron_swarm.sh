docker exec -it $(docker ps -q -f name=stack_dogker2_dkron) sh /curl/curl.sh
curl localhost:9911/v1/jobs -XPOST -d @scheduled_metrics_jobs.json
