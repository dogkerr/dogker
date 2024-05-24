docker exec -it dkron sh /curl/curl.sh
curl localhost:9911/v1/jobs -XPOST -d @dkron/scheduled_metrics_jobs_host.json
curl localhost:9911/v1/jobs -XPOST -d @dkron/scheduled_terminated_container_jobs_host.json




