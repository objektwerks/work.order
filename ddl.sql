create table if not exists user (
  name varchart not null,
  email_address varchar not null,
  street_address varchar not null,
  role varchar not null
);
create index if not exists user_email_address_idx ON user(email_address);

create table if not exists work_order (
  homeowner_email_address varchar not null,
  lawncare_provider_email_address varchar not null,
  opened datetime not null,
  issue varchar not null,
  resolution varchar not null,
  closed datetime not null
);
create index if not exists work_order_homeowner_idx ON work_order(homeowner);