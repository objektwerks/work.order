Work Order
----------
Work order web site design.

Roles
-----
>Roles are assigned to a user. Each role can invoke a set of actions.
1. **admin** — can invoke all actions
2. **homeowner** — can add, edit, save and select work orders
3. **lawncare provider** — can select, view and close work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register form** — [ admin ] ( register, edit, save )
2. **login form** — [ homeowner, lawncare provider ] ( login )
3. **work order list** — [ homeowner, lawncare provider ] ( select to view )
4. **work order form** — [ homeowner ] ( add, edit, save ) [ lawncare provider ] ( close )
5. **role list** — [ admin ] ( select to view )
6. **role form** — [ admin ] ( add, edit, save )
7. **user list** — [ admin ] ( select to view )
8. **user form** — [ admin ] ( add, edit, save )

Forms
-----
>Provide for user input and submittal to a server.
1. **register** — email address, street address
2. **login**— email address
3. **work order** — homeowner **, lawncare provider **, opened, issue, resolution, closed
4. **role** - name
5. **user** - email address, street address

** Can include or link to email address and street address.

Server
------
>A server, via the http protocol, receives requests from a client and returns responses.
1. /register
2. /login
3. /workorders
4. /workorder/id
5. /roles
6. /roles/id
7. /users
8. /users/id

Tables
------
>Provide for the storage and retrieval of data.
1. **role** — name: varchar
2. **user** — email address: varchar, street address: varchar
3. **users-roles** — join table
3. **work-order** — homeowner: user, lawncare provider: user, opened: datetime, issue: varchar, resolution: varchar, closed: datetime

Web Host
--------
>Require standard web site management tools and mysql or postgresql database support.

Development
-----------
>The following technologies will be used to build this web site:
1. Javascript
2. Html, Css
3. Sql