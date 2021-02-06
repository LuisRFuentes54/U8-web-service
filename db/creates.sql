CREATE TABLE faculty(
    f_id                SERIAL          PRIMARY KEY UNIQUE,
    f_name              VARCHAR(40)     NOT NULL,
    f_description       TEXT,
    f_status            VARCHAR(8)      NOT NULL    CHECK (f_status = 'enable' OR f_status = 'disable')  DEFAULT 'enable',
    f_created_date      TIMESTAMP       NOT NULL    DEFAULT NOW(),
    f_deleted_date      TIMESTAMP
);

CREATE TABLE school(
    sc_id                SERIAL          PRIMARY KEY UNIQUE,
    sc_name              VARCHAR(40)     NOT NULL,
    sc_description       TEXT,
    sc_status            VARCHAR(8)      NOT NULL    CHECK (sc_status = 'enable' OR sc_status = 'disable')  DEFAULT 'enable',
    sc_created_date      TIMESTAMP       NOT NULL    DEFAULT NOW(),
    sc_deleted_date      TIMESTAMP,
    sc_f_fk_id           INTEGER         NOT NULL    REFERENCES faculty(f_id)
);

CREATE TABLE section(
    se_id                SERIAL          PRIMARY KEY UNIQUE,
    se_name              VARCHAR(40)     NOT NULL,
    se_description       TEXT,
    se_status            VARCHAR(8)      NOT NULL    CHECK (se_status = 'enable' OR se_status = 'disable')  DEFAULT 'enable',
    se_created_date      TIMESTAMP       NOT NULL    DEFAULT NOW(),
    se_deleted_date      TIMESTAMP,
    se_uc                INTEGER         NOT NULL,
    se_semester          INTEGER         NOT NULL,
    se_type              VARCHAR(9)      NOT NULL    CHECK (se_type = 'mandalory' OR se_type = 'elective'),
    se_ht                NUMERIC(4,2)    NOT NULL,
    se_hp                NUMERIC(4,2)    NOT NULL,
    se_hl                NUMERIC(4,2)    NOT NULL,
    se_sc_fk_id          INTEGER         NOT NULL    REFERENCES school(sc_id)
);

CREATE TABLE person(
    p_id                SERIAL          PRIMARY KEY UNIQUE,
    p_ci                VARCHAR(10)     NOT NULL UNIQUE,
    p_first_name        VARCHAR(50)     NOT NULL,
    p_last_name         VARCHAR(50)     NOT NULL,
    p_status            VARCHAR(8)      NOT NULL    CHECK (p_status = 'enable' OR p_status = 'disable')  DEFAULT 'enable',
    p_created_date      TIMESTAMP       NOT NULL    DEFAULT NOW(),
    p_deleted_date      TIMESTAMP
);

CREATE TABLE enrollment(
    e_id                SERIAL          PRIMARY KEY UNIQUE,
    e_status            VARCHAR(8)      NOT NULL    CHECK (e_status = 'enable' OR e_status = 'disable')  DEFAULT 'enable',
    e_created_date      TIMESTAMP       NOT NULL    DEFAULT NOW(),
    e_deleted_date      TIMESTAMP,
    e_type              VARCHAR(7)      NOT NULL    CHECK (e_type = 'student' OR e_type = 'teacher'),
    e_p_fk_id           INTEGER         NOT NULL    REFERENCES person(p_id),
    e_se_fk_id          INTEGER         NOT NULL    REFERENCES section(se_id)
);