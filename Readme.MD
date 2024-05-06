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
2. docker compose  -f stack-dogker_benar.yaml up -d

3.  buka grafana , tambah datasource prometheus (urlnya http://prometheus:9090).
4. buat service account & access tokennya, copy token ke .env monitor-service
5. docker compose  -f stack-dogker_benar.yaml up -d , lagi
```

##### Insert Data
```
1. make migrate-up

2. import postman collectionnya , terus jalanin request ke beberapa endpointnya

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

#### Consume Rabbitmq
````
consume rabbitmq message dg cara jalanin repo example_rabbitmq
````

