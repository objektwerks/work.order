create table if not exists homeowner (
  email_address varchar not null,
  street_address varchar not null
);
create index if not exists user_email_address_idx ON homeowner(email_address);

create table if not exists lawncare_provider (
  email_address varchar not null
);
create index if not exists user_email_address_idx ON lawncare_provider(email_address);

create table if not exists work_order (
  homeowner varchar not null,
  lawncare_provider varchar not null,
  opened datetime not null,
  issue varchar not null,
  resolution varchar not null,
  closed datetime not null
);
create index if not exists homeowner_idx ON role(homeowner);