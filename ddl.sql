create database if not exists `work_order_db`;

use `work_order_db`

create table if not exists `user` (
  `name` tinytext not null,
  `role` tinytext not null,
  `email_address` tinytext not null,
  `street_address` tinytext not null,
  primary key (`name`, `email_address`)
);

create table if not exists `work_order` (
  `number` bigint not null auto_increment,
  `homeowner_name` tinytext not null,
  `homeowner_email_address` tinytext not null,
  `lawncare_provider_name` tinytext not null,
  `lawncare_provider_email_address` tinytext not null,
  `opened` datetime not null,
  `issue` text(1028) not null,
  `resolution` text(1028) not null,
  `closed` datetime null,
  primary key (`number`)
  constraint homeowner_name_fk foreign key (`homeowner_name`) references user(`name`)
  constraint homeowner_email_adddress_fk foreign key (`homeowner_email_address`) references user(`email_address`)
  constraint lawncare_provider_name_fk foreign key (`lawncare_provider_name`) references user(`name`)
  constraint lawncare_provider_name_fk foreign key (`lawncare_provider_email_address`) references user(`email_address`)
);
create index if not exists work_order_homeowner_name_idx ON work_order(`homeowner_name`);
create index if not exists work_order_homeowner_email_address_idx ON work_order(`homeowner_email_address`);
create index if not exists work_order_opened_idx ON work_order(`opened`);