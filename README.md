Work Order
----------
Work order web app.

Install
-------
1. npm install
>See **package.json** for installable dependencies.

Dev
---
1. npm run dev

Build
-----
1. TODO
>See **build** directory.

Web Hosting
-----------
>Require standard web site management tools and mysql database support. Options:
1. https://www.codeinwp.com/blog/best-nodejs-hosting/

Development
-----------
>The following technologies will be used to build this web site:
1. Javascript
2. Html, Css
3. Sql
4. Nodejs ( express, mysql )
5. MySql Database

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
6. **list work orders** — [ homeowner, lawncare provider ] ( select to view )
7. **filter work orders by closed is null | homeowner | lawncare provider** — [ homeowner, lawncare provider ] ( select to view )
8. **add and edit work order** — [ homeowner ] ( add, edit, save ) [ lawncare provider ] ( close )

Forms
-----
1. **register** — name, role, email address, street address
2. **login**— name, email address
3. **user** - name, role, email address, street address
4. **work order** — number, homeowner name and email address, lawncare provider name and email address, opened, issue, resolution, closed

Routes
------
1. /
2. /register
3. /login
4. /users
5. /users/name
6. /workorders
7. /workorder/number

Database
--------
1. **work_order_db**

Tables
------
1. **user** — name: text, role: text, email address: text, street address: text
2. **work_order** — number: integer, homeowner name: text, homeowner email address: test, lawncare provider name: text, lawncare provider email address: text, opened: datetime, issue: text, resolution: text, closed: datetime
>See **ddl.sql** directory.

Mysql
-----
>First option:
1. mysql -u root -p < ddl.sql
>Second option:
1. mysql -u root -p
2. \. ddl.sql