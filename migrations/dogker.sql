CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE containerStatus AS ENUM ('RUN', 'STOPPED');

CREATE TYPE containerAction AS ENUM ('START', 'STOP');


CREATE TABLE containers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    userId UUID NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    status containerStatus NOT NULL,
    name VARCHAR(255) NOT NULL,
    container_port int NOT NULL,
    public_port int,
    created_time timestamp with time zone  DEFAULT NOW() not null
);


CREATE TABLE container_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID NOT NULL,
    timestamp TIMESTAMP with time zone DEFAULT NOW() NOT NULL,
    action containerAction NOT NULL
);


CREATE TABLE container_lifecycles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    container_id UUID,
    start_time TIMESTAMP with time zone NOT NULL,
    stop_time TIMESTAMP with time zone,
    replica INT NOT NULL
);


ALTER TABLE container_actions ADD  CONSTRAINT fk_action_containers 
    FOREIGN KEY (container_id)
    REFERENCES containers (id);

ALTER TABLE container_lifecycles ADD  CONSTRAINT fk_lifecycles_containers
    FOREIGN KEY (container_id)
    REFERENCES containers (id);




INSERT INTO containers(userId, imageUrl, status, name, container_port, public_port) 
    VALUES("18d2e020-538d-449a-8e9c-02e4e5cf41111", "prome", "RUN", "prome1", 9090, 9090 );

INSERT INTO containers(userId, imageUrl, status, name, container_port, public_port) 
    VALUES("18d2e020-538d-449a-8e9c-02e4e5cf41111", "prome", "RUN", "prome2", 9091, 9090 );

INSERT INTO containers(userId, imageUrl, status, name, container_port, public_port) 
    VALUES("18d2e020-538d-449a-8e9c-02e4e5cf41111", "prome", "RUN", "prome3", 9092, 9090 );


INSERT INTO containers(userId, imageUrl, status, name, container_port, public_port) 
    VALUES("18d2e020-538d-449a-8e9c-02e4e5cf41111", "prome", "RUN", "prome4", 9093, 9090 );




