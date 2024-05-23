CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE container_status AS ENUM ('RUN', 'STOP');

CREATE TYPE service_status AS ENUM('CREATED', 'RUN', 'STOPPED', 'TERMINATED');





CREATE TABLE containers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    user_id UUID NOT NULL,
    image VARCHAR(255) NOT NULL,
    status service_status NOT NULL,
    name VARCHAR(255) NOT NULL,
    container_port int NOT NULL,
    public_port int,
    terminated_time timestamp with time zone ,
    created_time timestamp with time zone  DEFAULT NOW() NOT NULL,
    service_id VARCHAR(255) NOT NULL
);




CREATE TABLE container_lifecycles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID,
    start_time TIMESTAMP with time zone NOT NULL,
    stop_time TIMESTAMP with time zone,
    status container_status NOT NULL,
    replica INT NOT NULL
);

CREATE TABLE container_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID NOT NULL,
    cpus FLOAT NOT NULL,
    memory FLOAT NOT NULL,
    network_ingress FlOAT NOT NULL,
    network_egress FLOAT NOT NULL,
    created_time timestamp with time zone  DEFAULT NOW() NOT NULL
);





CREATE TABLE processed_terminated_container (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID NOT NULL,
    down_time  timestamp with time zone  DEFAULT NOW() NOT NULL
);


CREATE TABLE processed_autoscaling_container (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID NOT NULL ,
    action_time timestamp with time zone  DEFAULT NOW() NOT NULL
);



ALTER TABLE container_lifecycles ADD  CONSTRAINT fk_lifecycles_containers
    FOREIGN KEY (container_id)
    REFERENCES containers (id);

ALTER TABLE containers ADD CONSTRAINT fk_containers_users
    FOREIGN KEY (user_id) 
    REFERENCES users(id);

ALTER TABLE container_metrics ADD CONSTRAINT fk_container_metrics 
    FOREIGN KEY (container_id)
    REFERENCES containers(id);


ALTER TABLE processed_terminated_container ADD CONSTRAINT fk_processed_terminated_container
    FOREIGN KEY (container_id)
    REFERENCES containers(id);


ALTER TABLE processed_autoscaling_container ADD CONSTRAINT fk_processed_autoscaling_container
    FOREIGN KEY (container_id)
    REFERENCES containers(id);


-- INSERT INTO users( username, email, fullname, password) 
--     VALUES ('asda', 'sadasd@gmail.com', "lalala", 'asdad');

/*
9630bd22-deb5-4540-888d-475c4da371f5

INSERT INTO containers(user_id, image_url, status, name, container_port, public_port) 
    VALUES('<user_id_di_tabel_user>', 'prome', 'RUN', 'prome1', 9090, 9090 );

INSERT INTO containers(user_id, image_url, status, name, container_port, public_port) 
    VALUES('<user_id_di_tabel_user>', 'prome2', 'RUN', 'prome2', 9091, 9091 );




SELECT * FROM containers;

aecebc83-f910-4394-9298-ac0e04a1ccc7

// container 1
INSERT INTO container_lifecycles(container_id, start_time, stop_time, replica, status)
    VALUES('<container_id_di_tabel_container>', NOW(), NOW(), 3, 'RUN');


INSERT INTO container_lifecycles(container_id, start_time, stop_time, replica, status)
    VALUES('<container_id_di_tabel_container>', NOW(), NOW(), 3, 'STOPPED');

INSERT INTO container_lifecycles(container_id, start_time, stop_time, replica, status)
    VALUES('<container_id_di_tabel_container>', NOW(), NOW(), 3, 'RUN');


// ctr2
INSERT INTO container_lifecycles(container_id, start_time, stop_time, replica, status)
    VALUES('<container_id_di_tabel_container>', NOW(), NOW(), 3, 'RUN');


SELECT c.id, c.user_id, c.image_url, c.status, c.name, c.container_port, c.public_port, c.created_time,
			cl.id as lifecycleId, cl.start_time as lifecycleStartTime, cl.stop_time as lifecycleStopTime, 
			cl.replica as lifecycleReplica, cl.status FROM containers c  LEFT JOIN container_lifecycles cl ON cl.container_id=c.id
			WHERE c.user_id='<user_id_di_tabel_user>';


SELECT * FROM containers c 
 LEFT JOIN container_lifecycles cl ON cl.container_id=c.id
 WHERE c.user_id='<user_id_di_tabel_user>';
*/



