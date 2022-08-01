Work Order
----------
Work order web app and nodejs server.

Install
-------
1. npm install
>See **package.json** for installable dependencies.

Dev
---
1. npm run dev

Nodejs Host
-----------
>Using [NodeChef](https://www.nodechef.com/nodejs-hosting).

Development
-----------
>The following technologies will be used:
1. Javascript
2. Html, Css
3. MySql, Sql
4. Nodejs
>See **package.json** for more details.

Roles
-----
>A role can invoke a set of actions.
1. **admin** — can invoke all actions; a homeowner can be an admin!
2. **homeowner** — can add, select and edit work orders
3. **service provider** — can select and edit work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register user** — [ admin ] ( register, edit )
2. **login user** — [ admin, homeowner, service provider ] ( login )
3. **list users** — [ admin ] ( view )
4. **filter users by role** — [ admin ] ( view )
5. **add and edit user** — [ admin ] ( add, edit )
6. **list work orders by user** — [ admin, homeowner, service provider ] ( view )
7. **filter work orders by not closed** — [ admin, homeowner, service provider ] ( view )
8. **add and edit work order** — [ homeowner, service provider ] ( add, edit )

Forms
-----
1. **register** — role, name, email address, street address
2. **login**— email address, pin
3. **user** - id, role, name, email address, street address, registered
4. **work order** — number, homeowner id, service provider id, issue, resolution, opened, closed

Routes
------
1. get  - /
2. post - /register
3. post - /login
4. get  - /users
5. get  - /users/:email_address
6. post - /users/save
7. get  - /workorders/:homeowner_id
8. get  - /workorders/:serviceprovider_id
9. post - /workorders/save

Database
--------
1. **work_order_db**

Tables
------
1. **user**
2. **work_order**
>See **ddl.sql** for details.

Mysql
-----
>First option:
1. mysql -uroot -p < ddl.sql
>Second option:
1. mysql -uroot -p
2. \. ddl.sql

Date Time
---------
>Use ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ