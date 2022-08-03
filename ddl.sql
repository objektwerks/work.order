drop database if exists `work_order_db`;

create database `work_order_db`;

use `work_order_db`

create table `user` (
  `id` int not null auto_increment,
  `role` varchar(32) not null,
  `name` varchar(128) not null,
  `email_address` varchar(128) not null unique,
  `street_address` varchar(128) not null unique,
  `registered` varchar(24) not null,
  `pin` varchar(7) not null,
  primary key (`id`)
);
create index user_name_idx ON `user`(`name`);
create index user_email_address_idx ON `user`(`email_address`);
create trigger user_registered_trigger BEFORE INSERT ON `user` FOR EACH ROW SET NEW.registered = IFNULL(NEW.registered, NOW());

create table `work_order` (
  `number` int not null auto_increment,
  `homeowner_id` int not null,
  `service_provider_id` int not null,
  `issue` varchar(512) not null,
  `image_url` varchar(255) not null default "",
  `resolution` varchar(512) not null default "",
  `opened` varchar(24) not null,
  `closed` varchar(24) not null default "",
  primary key (`number`),
  constraint homeowner_id_fk foreign key (`homeowner_id`) REFERENCES `user`(`id`),
  constraint service_provider_id_fk foreign key (`service_provider_id`) REFERENCES `user`(`id`)
);
create trigger work_order_opened_trigger BEFORE INSERT ON `work_order` FOR EACH ROW SET NEW.opened = IFNULL(NEW.opened, NOW());