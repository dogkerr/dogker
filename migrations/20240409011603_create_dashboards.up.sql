CREATE TYPE dashboard_type AS ENUM('log', 'monitor');

CREATE TABLE dashboards (
    id  UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    uid VARCHAR(255) NOT NULL,
    owner UUID NOT NULL,
    db_type dashboard_type NOT NULL
);

ALTER TABLE dashboards ADD CONSTRAINT fk_dashboards_users
    FOREIGN KEY (owner)
    REFERENCES users(id);

    
