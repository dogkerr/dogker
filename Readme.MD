### Cara jalanin dogker microservices

### Notes

```
1. sebelum start microservicesnya pastiin semua swarm service user udah dihapus dan hapus image lintangbirdas/monitor-service:v1.1 & lintangbirdas/container-service:v2, terus pull 2 image itu lagi biar up to date sama image di dockerhub
2. pas microservicesnya jalan, hapus swarm service user harus lewat endpoint api container-service jgn lewat cli (kalo lewat cli ada bug/errornya)
3. kalau mau stop microsevicesnya pakai command 'docker compose down -v'
4. pastiin email buat register pake email asli gmail , biar mailing service jalan..
5. kalau mau pake fitur filter log :
ubah  const userOneUrls = getUrl("8505");
    const userTwoUrls = getUrl("8535");
jadi port public container/swarm service yang kalian buat....
- k6 run generate_log_golang.js
6. pastikan conatainer yang akan anda buat, target portnya sesuai dengan port aplikasi yang berjalan di container (kalau image lintangbirdas/go_log:v1 portnya 8231)
```

##### setup docker

```
1.sudo nano /etc/docker/daemon.json (linux) atau ~/.docker/daemon.json kalo di macos
isi filenya:

{
   "metrics-addr": "0.0.0.0:9323",
   "experimental": true

}do
2. docker plugin install grafana/loki-docker-driver:2.9.4 --alias loki --grant-all-permissions
3. sudo systemctl restart docker
4. firewall allow port 9323/tcp
5. systemctl restart docker
6. docker swarm init


```

```
1.allow firewall port https://docs.docker.com/engine/swarm/swarm-tutorial/
2. docker compose  -f stack-dogker_benar.yaml up -d

3.  buka grafana , tambah datasource prometheus (urlnya http://prometheus:9090). dan tambahin datasource loki (urlnya http://loki:3100)
4. buat service account & access tokennya, copy token ke environements service compose monitor-service di stack-dogker-benar.yaml
5. docker compose  -f stack-dogker_benar.yaml up -d , lagi
```

##### Insert Data

```
 tunggu sekitar 40-60 detik ,sampe auth service buat tabel user di postgres
1. docker compose  -f stack-dogker_benar.yaml up -d ,lagi
2. make migrate-up

3. import postman collectionnya , terus jalanin request ke beberapa endpointnya

```

###### rabbitmq

8. bikin queue & binding queuee

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
sh ./setup_dkron.sh
```

#### Setup minIO buat upload src_code & dockerfile , lalu build image & create container based on uploaded dockerfile (buat endpoint create container from source code tarfile & dockerfile)

```
1. buka 103.175.219.0:9001
2. login pake username=lintang, password=lintang123
3. buka menu access key tambahin accesskey sama secret key
4. copy accesskey dan secret key ke  env containerservice
5. docker exec -i -t container-service  sh
5b. apk add nano
6. nano .env  (isi ACC_KEY_MINIO & SECRET_KEY_MINIO)
6b. nano environemnt di stack-dogker_benar.yaml  (isi ACC_KEY_MINIO & SECRET_KEY_MINIO)
7. buat bucket , tipe nya public , bucket name: dogker-bucket
8. docker compose  -f stack-dogker_benar.yaml up -d

contoh:

# MINIO
BASE_URL_MINIO=minio:9000
ACC_KEY_MINIO=kPZujhycCvJM1kU084pt
SECRET_KEY_MINIO=4NsypaiGTynxdrb8i5iuxAfmJw3sJxChls8CxEAq


```

### loki logs

```
5. kalau mau pake fitur filter log :
ubah  const userOneUrls = getUrl("8505");
    const userTwoUrls = getUrl("8535");
jadi port public container/swarm service yang kalian buat....
- k6 run generate_log_golang.js
```

#### Consume Rabbitmq

```
consume rabbitmq message dg cara jalanin repo example_rabbitmq
```

### Graceful delete all compose container

```

docker compose  -f stack-dogker_benar.yaml down -v
docker service ls
docker service rm <semua_swarm_service_user>
```

#### cara test alerting prometheus ketika container user mati

```
1. buat container/swarm service (cuma 1 aja replicanya) lewat endpoint create container di postman
2. copy id dari cotnainer swarm service dg cara:   docker ps -a -f "name=<bagian_dari_nama_swarm_service>"
3. stop container yg abis dibuat: docker stop <id_container>
```

#### cara deploy pake swarm stack

```
 1. docker stack deploy -c stack-dogker_benar_swarm.yaml stack_dogker2 --detach=true
 2. make migrate-up
 3.   buka grafana , tambah datasource prometheus (urlnya http://prometheus:9090). dan tambahin datasource loki (urlnya http://loki:3100)
 4. buat service account & access tokennya, copy token ke environements service compose monitor-service
 5.  docker stack deploy -c stack-dogker_benar_swarm.yaml stack_dogker2 --detach=true
 6.  sh ./setup_dkron_swarm.sh
 7. import postman collectionnya , terus jalanin request ke beberapa endpointnya
 8. bikin queue  & binding queuee

nama queue=monitor-billing, type: Quorum
queue binding utk monitor-billing:
exchangeName: monitor-billing
routingkey: monitor.billing.all_users
nama queue: monitor-billing



```

#### Troubleshooting

1. kalau container-service & monitor service mati, tinggal ' docker compose -f stack-dogker_benar.yaml up -d' berkali kali aja sampai running karena emang startup golang lebih cepet dari postgres jadi golangnya belum sempet connect sama postgres
2. jangan join docker swarm as manager node bikin error nanti kalo salah satu manager node mati
