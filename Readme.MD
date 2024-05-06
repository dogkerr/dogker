### Cara testing rabbitmq

##### setup docker
```
1.sudo nano /etc/docker/daemon.json (linux) atau ~/.docker/daemon.json kalo di macos
isi filenya:

{
   "metrics-addr": "0.0.0.0:9323",
   "experimental": true,
   "log-driver": "loki",
    "log-opts": {
        "loki-url": "http://localhost:3100/loki/api/v1/push",
        "loki-batch-size": "400"
    }

}
2. docker plugin install grafana/loki-docker-driver:2.9.4 --alias loki --grant-all-permissions
3. sudo systemctl restart docker
4. firewall allow port 9323/tcp 
5. systemctl restart docker
6. docker swarm init


```


```
1. docker pull lintangbirdas/go_log:v1 
2. docker pull lintangbirdas/monitor-service:v1
3. buat folder pb
4. buat .env isinya samain .env.example
5. generate protobuf code `make proto`

```


```
1.allow firewall port https://docs.docker.com/engine/swarm/swarm-tutorial/
2. docker stack ?

3.  buka grafana , tambah datasource prometheus (urlnya http://prometheus:9090).
4. buat service account & access tokennya, copy token ke .env monitor-service
```

##### insert data ke postgres
```
1. make migrate-up

2. insert data dummy ke masing masing table (lihat di migrations/.....up.sql)

```



##### jalanin docker swarm service
```
docker service create --name  go_container_log1  --publish 8231:8231 --replicas 2 --container-label  user_id=<user_id_di_table_container> --log-driver=loki \
    --log-opt loki-url="http://localhost:3100/loki/api/v1/push" \
    --log-opt loki-retries=5 \
    --log-opt loki-batch-size=400 \
    --log-opt loki-external-labels="job=docker,container_name=go_container_log1,userId=<user_id_di_table_container>" configs-go_container_log_user1:latest 


docker service create --name  go_container_log2  --publish 8232:8232 --replicas 2 --container-label  user_id=<user_id_di_table_container> --log-driver=loki \
    --log-opt loki-url="http://localhost:3100/loki/api/v1/push" \
    --log-opt loki-retries=5 \
    --log-opt loki-batch-size=400 \
    --log-opt loki-external-labels="job=docker,container_name=go_container_log2,userId=<user_id_di_table_container>" configs-go_container_log_user2:latest 



# harus localhost:3100/loki/api/v1/push biar bisa kedetect loki (pake loki:3100 gakbisa)
```


##### insert serviceID docker swarm ke setiap row
 tambahin serviceID docker swarm ke setiap row di tabel container (harusnya container service yg namabahin)
```
buat dapetin serviceId: `docker service ls`
paling kiri id service ny.
```

###### rabbitmq
8. bikin queue  & binding queuee
```
1. nama queue=monitor-billing, type: Quorum
2. queue binding utk monitor-billing:
exchangeName: monitor-billing
routingkey: monitor.billing.all_users
nama queue: monitor-billing
```

##### cron job dkron
9. buat cron di dkron
```
curl localhost:9911/v1/jobs -XPOST -d @scheduled_metrics_jobs.json
```

