--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: superschool; Type: SCHEMA; Schema: -; Owner: superschool
--

CREATE SCHEMA superschool;


ALTER SCHEMA superschool OWNER TO superschool;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.category (
    categoryid bigint NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(20) NOT NULL,
    parentid bigint,
    english character varying(50)
);


ALTER TABLE superschool.category OWNER TO superschool;

--
-- Name: category_categoryid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.category_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.category_categoryid_seq OWNER TO superschool;

--
-- Name: category_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.category_categoryid_seq OWNED BY superschool.category.categoryid;


--
-- Name: course; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.course (
    courseid bigint NOT NULL,
    title character varying(255) NOT NULL,
    "imagePath" character varying(255),
    description character varying(255),
    "detailDescription" character varying(255),
    views bigint DEFAULT '0'::bigint NOT NULL,
    createddate timestamp with time zone NOT NULL,
    updateddate timestamp with time zone,
    price numeric(1000,2) NOT NULL,
    categoryid bigint,
    teacherid bigint NOT NULL,
    status character varying(10) DEFAULT 'INCOMPLETE'::character varying NOT NULL
);


ALTER TABLE superschool.course OWNER TO superschool;

--
-- Name: COLUMN course.status; Type: COMMENT; Schema: superschool; Owner: superschool
--

COMMENT ON COLUMN superschool.course.status IS 'Trạng thái của khóa học';


--
-- Name: course_courseid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.course_courseid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.course_courseid_seq OWNER TO superschool;

--
-- Name: course_courseid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.course_courseid_seq OWNED BY superschool.course.courseid;


--
-- Name: coursevideo; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.coursevideo (
    coursevideoid bigint NOT NULL,
    courseid bigint NOT NULL,
    videopath character varying(255) NOT NULL,
    orderno integer NOT NULL,
    preview boolean DEFAULT false NOT NULL
);


ALTER TABLE superschool.coursevideo OWNER TO superschool;

--
-- Name: COLUMN coursevideo.preview; Type: COMMENT; Schema: superschool; Owner: superschool
--

COMMENT ON COLUMN superschool.coursevideo.preview IS 'Có cho xem trước không';


--
-- Name: coursevideo_coursevideoid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.coursevideo_coursevideoid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.coursevideo_coursevideoid_seq OWNER TO superschool;

--
-- Name: coursevideo_coursevideoid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.coursevideo_coursevideoid_seq OWNED BY superschool.coursevideo.coursevideoid;


--
-- Name: knex_migrations; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE superschool.knex_migrations OWNER TO superschool;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.knex_migrations_id_seq OWNER TO superschool;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.knex_migrations_id_seq OWNED BY superschool.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE superschool.knex_migrations_lock OWNER TO superschool;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.knex_migrations_lock_index_seq OWNER TO superschool;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.knex_migrations_lock_index_seq OWNED BY superschool.knex_migrations_lock.index;


--
-- Name: otp; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.otp (
    visitor_email character varying(100) NOT NULL,
    generated_otp character varying(4) NOT NULL
);


ALTER TABLE superschool.otp OWNER TO superschool;

--
-- Name: promotion; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.promotion (
    promotionid bigint NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(20) NOT NULL,
    value numeric(1000,2) NOT NULL,
    createddate timestamp with time zone NOT NULL,
    courseid bigint NOT NULL
);


ALTER TABLE superschool.promotion OWNER TO superschool;

--
-- Name: promotion_promotionid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.promotion_promotionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.promotion_promotionid_seq OWNER TO superschool;

--
-- Name: promotion_promotionid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.promotion_promotionid_seq OWNED BY superschool.promotion.promotionid;


--
-- Name: review; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.review (
    reviewid bigint NOT NULL,
    comment character varying(255) NOT NULL,
    rating integer NOT NULL,
    courseid bigint NOT NULL,
    createddate timestamp with time zone NOT NULL,
    updateddate timestamp with time zone
);


ALTER TABLE superschool.review OWNER TO superschool;

--
-- Name: review_reviewid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.review_reviewid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.review_reviewid_seq OWNER TO superschool;

--
-- Name: review_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.review_reviewid_seq OWNED BY superschool.review.reviewid;


--
-- Name: student_course; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.student_course (
    studentcourseid bigint NOT NULL,
    studentid bigint NOT NULL,
    courseid bigint NOT NULL,
    createddate timestamp with time zone NOT NULL
);


ALTER TABLE superschool.student_course OWNER TO superschool;

--
-- Name: student_course_studentcourseid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.student_course_studentcourseid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.student_course_studentcourseid_seq OWNER TO superschool;

--
-- Name: student_course_studentcourseid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.student_course_studentcourseid_seq OWNED BY superschool.student_course.studentcourseid;


--
-- Name: user; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool."user" (
    userid bigint NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    fullname character varying(50) NOT NULL,
    email character varying(50),
    refresh_token character varying(255) NOT NULL,
    usergroupid bigint NOT NULL,
    picture character varying(255) DEFAULT 'NULL'::character varying
);


ALTER TABLE superschool."user" OWNER TO superschool;

--
-- Name: COLUMN "user".picture; Type: COMMENT; Schema: superschool; Owner: superschool
--

COMMENT ON COLUMN superschool."user".picture IS 'NULL';


--
-- Name: user_userid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.user_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.user_userid_seq OWNER TO superschool;

--
-- Name: user_userid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.user_userid_seq OWNED BY superschool."user".userid;


--
-- Name: usergroup; Type: TABLE; Schema: superschool; Owner: superschool
--

CREATE TABLE superschool.usergroup (
    usergroupid bigint NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(20) NOT NULL,
    description text
);


ALTER TABLE superschool.usergroup OWNER TO superschool;

--
-- Name: usergroup_usergroupid_seq; Type: SEQUENCE; Schema: superschool; Owner: superschool
--

CREATE SEQUENCE superschool.usergroup_usergroupid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE superschool.usergroup_usergroupid_seq OWNER TO superschool;

--
-- Name: usergroup_usergroupid_seq; Type: SEQUENCE OWNED BY; Schema: superschool; Owner: superschool
--

ALTER SEQUENCE superschool.usergroup_usergroupid_seq OWNED BY superschool.usergroup.usergroupid;


--
-- Name: category categoryid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.category ALTER COLUMN categoryid SET DEFAULT nextval('superschool.category_categoryid_seq'::regclass);


--
-- Name: course courseid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.course ALTER COLUMN courseid SET DEFAULT nextval('superschool.course_courseid_seq'::regclass);


--
-- Name: coursevideo coursevideoid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.coursevideo ALTER COLUMN coursevideoid SET DEFAULT nextval('superschool.coursevideo_coursevideoid_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.knex_migrations ALTER COLUMN id SET DEFAULT nextval('superschool.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('superschool.knex_migrations_lock_index_seq'::regclass);


--
-- Name: promotion promotionid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.promotion ALTER COLUMN promotionid SET DEFAULT nextval('superschool.promotion_promotionid_seq'::regclass);


--
-- Name: review reviewid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.review ALTER COLUMN reviewid SET DEFAULT nextval('superschool.review_reviewid_seq'::regclass);


--
-- Name: student_course studentcourseid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.student_course ALTER COLUMN studentcourseid SET DEFAULT nextval('superschool.student_course_studentcourseid_seq'::regclass);


--
-- Name: user userid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool."user" ALTER COLUMN userid SET DEFAULT nextval('superschool.user_userid_seq'::regclass);


--
-- Name: usergroup usergroupid; Type: DEFAULT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.usergroup ALTER COLUMN usergroupid SET DEFAULT nextval('superschool.usergroup_usergroupid_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.category (categoryid, name, code, parentid, english) FROM stdin;
4	Lập trình	C01	\N	Programming
5	Lập trình Python	C01.1	4	Python Basic
6	Lập trình Java	C01.2	4	Java Basic
9	Lập trình C++	C01.3	4	C++ Basic
12	Microsoft Office	C0.2	\N	Microsoft Office
13	Microsoft Office Word	C02.1	12	Microsoft Office Word
14	Microsoft Office Excel	C02.2	12	Microsoft Office Excel
15	Microsoft Office PowerPoint	C02.3	12	Microsoft Office PowerPoint
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.course (courseid, title, "imagePath", description, "detailDescription", views, createddate, updateddate, price, categoryid, teacherid, status) FROM stdin;
3	Lập trình Java căn bản	\N			0	2021-01-09 09:22:06.842+00	\N	0.00	6	4	INCOMPLETE
\.


--
-- Data for Name: coursevideo; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.coursevideo (coursevideoid, courseid, videopath, orderno, preview) FROM stdin;
9	3	1610184170600_file.txt	1	f
10	3	1610184170600_file1.txt	2	f
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.knex_migrations (id, name, batch, migration_time) FROM stdin;
13	20201230205945_create_tables.js	1	2021-01-08 14:41:58.067+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: otp; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.otp (visitor_email, generated_otp) FROM stdin;
phanthanhvi97@gmail.com	6893
phanthanhvi96@gmail.com	1803
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.promotion (promotionid, name, code, value, createddate, courseid) FROM stdin;
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.review (reviewid, comment, rating, courseid, createddate, updateddate) FROM stdin;
\.


--
-- Data for Name: student_course; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.student_course (studentcourseid, studentid, courseid, createddate) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool."user" (userid, username, password, fullname, email, refresh_token, usergroupid, picture) FROM stdin;
4	buixuanbach	$2b$10$uLi16YAhIY4LhJ7BY5YhdeJawZ5sEvn4qhrQlc4NIkNsH0ca/clMy	Bùi Xuân Bách	\N	YJ6o0TpVFEEfbMXUSSyQJazu6z0yIm11OWDhA1bJBrYpXFbkEhBVfuSrGeYtqMqHD28VXUYFYdOjjxKTamL5eLgOqknSimVdCIOmDO55oDJzUHeTk3n9IT5O5FSop82hz1bELmgWs40Mo789D1PFAH235k0Bgm8ijOXtP6XMLRpeKtD7jmxzdcj6Izrf84bQUZ7mNZzxDgGTumhhgk8vnSnYx0WMGNMzOIjW4BUiqnYpzTAtdvHj4AN1Ul1ZXnq	3	NULL
1	admin	$2b$10$kDHQZF9mPqpWCR5fXvLDjuiiHq2FBuHOS/.py.jGMdScK9YM6hByW	Admin	admin@gmail.com	BbCnpQ7MYE5ig4a3gN7wyfJEnzEgNB6TaEAlbIgzvhESwS8XTeVxqEasJ4mG83E0sDU6FiUNlIkCSlzWEmKq65DFOjSyflsIVF27BPIGkhckAKaWWhTDvvvSWG1ApMOK5Ss0c6rJHdgMHyfjfjSWW4RliUK1DYOoaFiqA5ee5fTrekFGzqR37nFBWEpFEVfWdrFPppt6b0p2kjSS2xz4Lp0CNJ4JQEhZ9fZRsVoQqPCsSwWiNb3YZIG5qA09X7s	1	NULL
34	phanthanhvi97@gmail.com		Ken Kul	phanthanhvi97@gmail.com	1iPxQXsxePHTEwJ2Kd3CflnfAzK9JZBzXrVUwXA61GOsKxsS1jVCeP03ey4AkOEXxdOI6hLeEzITwOpujcTplevPyCCyPkk62mxXow6C1jbaec0wFPYbQiCAqp6TTO7H1IBnNmq0rzFi1FKCG5bXigiut5vLEEkjI4J5VaAf4hTrRA3HSg6gJNOMdej7baEEyIpbKLTeItGUG1pM1cGbbeQiwMVxwFVkCTVhBgByItfKlRwDu81GOxr41zgdV8i	2	https://lh4.googleusercontent.com/-gA4fqaSRVt4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclynWBqi8XBA2teqM1NR8mvahgbCw/s96-c/photo.jpg
\.


--
-- Data for Name: usergroup; Type: TABLE DATA; Schema: superschool; Owner: superschool
--

COPY superschool.usergroup (usergroupid, code, name, description) FROM stdin;
1	ADMIN	Administrators	\N
2	STUDENT	Student	\N
3	TEACHER	Teacher	\N
\.


--
-- Name: category_categoryid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.category_categoryid_seq', 15, true);


--
-- Name: course_courseid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.course_courseid_seq', 3, true);


--
-- Name: coursevideo_coursevideoid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.coursevideo_coursevideoid_seq', 10, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.knex_migrations_id_seq', 13, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.knex_migrations_lock_index_seq', 1, true);


--
-- Name: promotion_promotionid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.promotion_promotionid_seq', 1, false);


--
-- Name: review_reviewid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.review_reviewid_seq', 1, false);


--
-- Name: student_course_studentcourseid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.student_course_studentcourseid_seq', 1, false);


--
-- Name: user_userid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.user_userid_seq', 34, true);


--
-- Name: usergroup_usergroupid_seq; Type: SEQUENCE SET; Schema: superschool; Owner: superschool
--

SELECT pg_catalog.setval('superschool.usergroup_usergroupid_seq', 3, true);


--
-- Name: category category_code_unique; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.category
    ADD CONSTRAINT category_code_unique UNIQUE (code);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (categoryid);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (courseid);


--
-- Name: coursevideo coursevideo_orderno_courseid_key; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.coursevideo
    ADD CONSTRAINT coursevideo_orderno_courseid_key UNIQUE (orderno, courseid);


--
-- Name: coursevideo coursevideo_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.coursevideo
    ADD CONSTRAINT coursevideo_pkey PRIMARY KEY (coursevideoid);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: otp otp_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.otp
    ADD CONSTRAINT otp_pkey PRIMARY KEY (visitor_email);


--
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (promotionid);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);


--
-- Name: student_course student_course_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.student_course
    ADD CONSTRAINT student_course_pkey PRIMARY KEY (studentcourseid);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (userid);


--
-- Name: user user_username_unique; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool."user"
    ADD CONSTRAINT user_username_unique UNIQUE (username);


--
-- Name: usergroup usergroup_code_unique; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.usergroup
    ADD CONSTRAINT usergroup_code_unique UNIQUE (code);


--
-- Name: usergroup usergroup_pkey; Type: CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.usergroup
    ADD CONSTRAINT usergroup_pkey PRIMARY KEY (usergroupid);


--
-- Name: category category_parentid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.category
    ADD CONSTRAINT category_parentid_foreign FOREIGN KEY (parentid) REFERENCES superschool.category(categoryid);


--
-- Name: course course_categoryid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.course
    ADD CONSTRAINT course_categoryid_foreign FOREIGN KEY (categoryid) REFERENCES superschool.category(categoryid);


--
-- Name: course course_teacherid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.course
    ADD CONSTRAINT course_teacherid_foreign FOREIGN KEY (teacherid) REFERENCES superschool."user"(userid);


--
-- Name: coursevideo coursevideo_courseid_fkey; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.coursevideo
    ADD CONSTRAINT coursevideo_courseid_fkey FOREIGN KEY (courseid) REFERENCES superschool.course(courseid);


--
-- Name: promotion promotion_course_fk; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.promotion
    ADD CONSTRAINT promotion_course_fk FOREIGN KEY (courseid) REFERENCES superschool.course(courseid);


--
-- Name: review review_courseid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.review
    ADD CONSTRAINT review_courseid_foreign FOREIGN KEY (courseid) REFERENCES superschool.course(courseid);


--
-- Name: student_course student_course_courseid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.student_course
    ADD CONSTRAINT student_course_courseid_foreign FOREIGN KEY (courseid) REFERENCES superschool.course(courseid);


--
-- Name: student_course student_course_studentid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool.student_course
    ADD CONSTRAINT student_course_studentid_foreign FOREIGN KEY (studentid) REFERENCES superschool."user"(userid);


--
-- Name: user user_usergroupid_foreign; Type: FK CONSTRAINT; Schema: superschool; Owner: superschool
--

ALTER TABLE ONLY superschool."user"
    ADD CONSTRAINT user_usergroupid_foreign FOREIGN KEY (usergroupid) REFERENCES superschool.usergroup(usergroupid);


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO superschool;


--
-- PostgreSQL database dump complete
--

