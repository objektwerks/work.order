create table if not exists role (
  name varchar not null
);
create index if not exists role_name_idx ON role(name);

create table if not exists user (
  email_address varchar not null,
  street_address varchar not null
);
create index if not exists user_email_address_idx ON user(email_address);

create table if not exists users_roles (
  user varchar not null,
  role varchar not null
);

create table if not exists work_order (
  homeowner varchar not null,
  lawncare_provider varchar not null,
  opened datetime not null,
  issue varchar not null,
  resolution varchar not null,
  closed datetime not null
);
create index if not exists homeowner_idx ON role(homeowner);