create database if not exists work_order_db;

use work_order_db

create table if not exists user (
  name varchart not null,
  role varchar not null,
  email_address varchar not null,
  street_address varchar not null
  primary key (name, email_address)
);

create table if not exists work_order (
  number bigint auto_increment primary key,
  homeowner_name varchar not null,
  homeowner_email_address varchar not null,
  lawncare_provider_name varchar not null,
  lawncare_provider_email_address varchar not null,
  opened datetime not null,
  issue varchar not null,
  resolution varchar not null,
  closed datetime null
  constraint homeowner_name_fk foreign key (homeowner_name) references user(name)
  constraint homeowner_email_adddress_fk foreign key (homeowner_email_address) references user(email_address)
  constraint lawncare_provider_name_fk foreign key (lawncare_provider_name) references user(name)
  constraint lawncare_provider_name_fk foreign key (lawncare_provider_email_address) references user(email_address)
);
create index if not exists work_order_homeowner_name_idx ON work_order(homeowner_name);
create index if not exists work_order_homeowner_email_address_idx ON work_order(homeowner_email_address);
create index if not exists work_order_opened_idx ON work_order(homeowner_opened);