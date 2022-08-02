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
1. **admin** — can invoke all actions
2. **homeowner** — can add, select and edit work orders
3. **service provider** — can select and edit work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register user** — [ homeowner, service provider ] ( register, edit )
2. **login user** — [ homeowner, service provider ] ( login )
3. **list work orders by user** — [ homeowner, service provider ] ( view )
4. **add and edit work order** — [ homeowner, service provider ] ( add, edit )
5. **edit user** — [ homeowner, service provider ] ( add, edit )

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
4. get  - /workorders/:id
5. post - /workorders/save
6. post - /users/save

Sequences
---------
1. client --- register --> server --- user --> client
2. client --- login --> server --- user, work orders --> client
3. client --- work order --> server --- 200 | 400 --> client
4. client --- list --> server --- work orders --> client
5. client --- user --> server --- 200 | 400 --> client

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