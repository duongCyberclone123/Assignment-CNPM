create table users(
	uid				nvarchar(100)		primary key,
	username		nvarchar(100)		unique,
    password		nvarchar(100)		not null
);