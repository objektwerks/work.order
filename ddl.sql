create database if not exists `work_order_db`;

create table if not exists user (
  name varchart not null,
  role varchar not null,
  email_address varchar not null,
  street_address varchar not null
);
create index if not exists user_name_idx ON user(name);
create index if not exists user_email_address_idx ON user(email_address);

create table if not exists work_order (
  homeowner_name varchar not null,
  homeowner_email_address varchar not null,
  lawncare_provider_name varchar not null,
  lawncare_provider_email_address varchar not null,
  opened datetime not null,
  issue varchar not null,
  resolution varchar not null,
  closed datetime not null
);
create index if not exists work_order_homeowner_name_idx ON work_order(homeowner_name);
create index if not exists work_order_homeowner_email_address_idx ON work_order(homeowner_email_address);
create index if not exists work_order_opened_idx ON work_order(homeowner_opened);