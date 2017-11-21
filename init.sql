
CREATE TABLE IF NOT EXISTS shopping_list (
  ID            BIGSERIAL   PRIMARY KEY,
  NAME          VARCHAR(50),
  CREATED       DATE,
  TYPE          VARCHAR(50)
);

GRANT ALL PRIVILEGES ON TABLE shopping_list TO postgres;
GRANT USAGE, SELECT ON SEQUENCE shopping_list_id_seq TO postgres;

CREATE TABLE IF NOT EXISTS item (
  ID            BIGSERIAL   PRIMARY KEY,
  NAME          VARCHAR(50),
  TYPE          VARCHAR(50)
);

GRANT ALL PRIVILEGES ON TABLE item TO postgres;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO postgres;

CREATE TABLE IF NOT EXISTS shopping_list_item (
  ID                    BIGSERIAL   PRIMARY KEY,
  NAME                  VARCHAR(100),
  URL                   VARCHAR(500),
  SHOPPING_LIST_ID      BIGINT      NOT NULL REFERENCES shopping_list (ID),
  ITEM_ID               BIGINT      NOT NULL REFERENCES item (ID)
);

GRANT ALL PRIVILEGES ON TABLE shopping_list_item TO postgres;
GRANT USAGE, SELECT ON SEQUENCE shopping_list_item_id_seq TO postgres;


INSERT INTO shopping_list (name, created, type) VALUES
    ('Ruokaostokset (testi)', '2017-11-20', 'DAILY');

INSERT INTO shopping_list (name, created, type) VALUES
    ('Huvitukset (testi)', '2017-11-20', 'RANDOM');

INSERT INTO item (name, type) VALUES
    ('Maito', 'DAIRY');

INSERT INTO item (name, type) VALUES
    ('Jugurtti', 'DAIRY');

INSERT INTO item (name, type) VALUES
    ('Appelsiini', 'FRUIT');

INSERT INTO item (name, type) VALUES
    ('MFT Linssi', 'CAMERA_EQUIPMENT');

INSERT INTO item (name, type) VALUES
    ('Muistikortti', 'CAMERA_EQUIPMENT');

INSERT INTO shopping_list_item (shopping_list_id, item_id) VALUES (1, 1);
INSERT INTO shopping_list_item (shopping_list_id, item_id) VALUES (1, 2);
INSERT INTO shopping_list_item (shopping_list_id, item_id) VALUES (1, 3);
INSERT INTO shopping_list_item (name, url, shopping_list_id, item_id) VALUES
    ('Olympus M.ZUIKO DIGITAL 25 mm f/1,8', 'https://www.verkkokauppa.com/fi/product/42838/drgvq/Olympus-M-ZUIKO-DIGITAL-25-mm-f-1-8-Micro-Four-Thirds-objekt', 2, 4);
INSERT INTO shopping_list_item (name, url, shopping_list_id, item_id) VALUES
    ('Sandisk Extreme SDXC 128 Gt ‐muistikortti', 'https://www.verkkokauppa.com/fi/product/51033/jdvhm/Sandisk-Extreme-SDXC-128-Gt-muistikortti', 2, 5);