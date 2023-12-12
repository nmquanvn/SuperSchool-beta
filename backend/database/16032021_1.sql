-- create table to save favorite course of student
create table favoritecourse (
	favoritecourseid bigserial NOT NULL,
	studentid bigint not null,
	courseid bigint not null,
	CONSTRAINT favoritecourse_pkey PRIMARY KEY (favoritecourseid),
	CONSTRAINT favoritecourse_studentid_foreign FOREIGN KEY (studentid) REFERENCES "user"(userid),
	CONSTRAINT favoritecourse_courseid_foreign FOREIGN KEY (courseid) REFERENCES course(courseid)
);

alter table student_course add column status varchar(20) not null default 'OPEN';

alter table review add column userid bigint not null references "user"(userid);

alter table review alter column rating type float;

alter table course add column disabled boolean not null default false;

alter table course drop column disabled;

alter table course add column publish boolean not null default true;

alter table coursevideo add column title text;

alter table coursevideo add column description text;