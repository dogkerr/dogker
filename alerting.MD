1. container down
```

## ini buat dapetin container user yg down/stop lebih dari 10 detik , harusnya buat emailing, harus dicheck lagi stop nya itu karena distop user atau emang memory usage container nya melebihi limit. Caranya tinggal check tabel container lifecycle, get last row by startTime, kalo memang last row ctrlifecycle itu statusnya stop berarti emang di stop user & gak perlu kirim email , kalau status ctrlifecyclenya gak stop berarti gak distop user & perlu kirim email.


count(time()  - container_last_seen{ container_label_com_docker_compose_service=~".+"} > 10) by (container_label_com_docker_swarm_service_id, container_label_com_docker_swarm_service_name,  container_label_user_id)


```
2. cpu usage dari container > 70% buat autoscaling atau memory usage > 70%
```


```
