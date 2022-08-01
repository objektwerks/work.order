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
2. **homeowner** — can add, edit, save and select work orders
3. **lawncare provider** — can select, view and close work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register user** — [ admin ] ( register, edit, save )
2. **login user** — [ admin, homeowner, lawncare provider ] ( login )
3. **list users** — [ admin ] ( select to view )
4. **filter users by role** — [ admin ] ( select to view )
5. **add and edit user** — [ admin ] ( add, edit, save )
6. **list work orders by user** — [ admin, homeowner, lawncare provider ] ( select to view )
7. **filter work orders by not closed** — [ admin, homeowner, lawncare provider ] ( select to view )
8. **add and edit work order** — [ homeowner ] ( add, edit, save )
9. **close work order** - [ lawncare provider ] ( close )

Forms
-----
1. **register** — name, role, email address, street address
2. **login**— name, email address
3. **user** - name, role, email address, street address
4. **work order** — number, homeowner name and email address, lawncare provider name and email address, opened, issue, resolution, closed

Routes
------
1. get  - /
2. post - /register
3. post - /login
4. get  - /users
5. get  - /users/:name
6. post - /users/add
7. post - /users/update
8. get  - /workorders
9. get  - /workorders/:number
10. post - /workorders/add
11. post - /workorders/update
12. post - /workorders/close

Database
--------
1. **work_order_db**

Tables
------
1. **user** — name: text, role: text, email address: text, street address: text, registered: datetime
2. **work_order** — number: integer, homeowner name: text, homeowner email address: test, lawncare provider name: text, lawncare provider email address: text, opened: datetime, issue: text, resolution: text, closed: datetime
>See **ddl.sql** directory.

Mysql
-----
>First option:
1. mysql -u root -p < ddl.sql
>Second option:
1. mysql -u root -p
2. \. ddl.sql