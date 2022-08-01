drop database if exists `work_order_db`;

create database `work_order_db`;

use `work_order_db`

create table `homeowner` (
  `id` int not null auto_increment,
  `name` varchar(128) not null,
  `email_address` varchar(128) not null unique,
  `street_address` varchar(128) not null unique,
  `registered` datetime not null,
  `is_admin` boolean not null default false,
  primary key (`id`)
);
create trigger homeowner_registered_trigger BEFORE INSERT ON `homeowner` FOR EACH ROW SET NEW.registered = IFNULL(NEW.registered, NOW());
create index homeowner_name_idx ON `homeowner`(`name`);
create index homeowner_email_address_idx ON `homeowner`(`email_address`);

create table `service_provider` (
  `id` int not null auto_increment,
  `name` varchar(128) not null,
  `email_address` varchar(128) not null unique,
  `registered` datetime not null,
  primary key (`id`)
);
create trigger service_provider_registered_trigger BEFORE INSERT ON `service_provider` FOR EACH ROW SET NEW.registered = IFNULL(NEW.registered, NOW());
create index service_provider_name_idx ON `service_provider`(`name`);
create index service_provider_email_address_idx ON `service_provider`(`email_address`);

create table `work_order` (
  `number` int not null auto_increment,
  `homeowner_id` int not null,
  `service_provider_id` int not null,
  `opened` datetime not null,
  `closed` datetime null,
  `issue` text(1028) not null,
  `resolution` text(1028) null,
  primary key (`number`),
  constraint homeowner_id_fk foreign key (`homeowner_id`) REFERENCES `homeowner`(`id`),
  constraint service_provider_id_fk foreign key (`service_provider_id`) REFERENCES `service_provider`(`id`)
);
create trigger work_order_opened_trigger BEFORE INSERT ON `work_order` FOR EACH ROW SET NEW.opened = IFNULL(NEW.opened, NOW());