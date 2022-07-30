Work Order
----------
Work order web app.

Install
-------
1. npm install
>See **package.json** for installable dependencies.

Dev
---
1. npx snowpack dev
>See **snowpack.config.json** and [Snowpack Config](https://www.snowpack.dev/reference/configuration) for configurable options.

Build
-----
1. npx snowpack build
>See **build** directory.

Web Hosting
-----------
>Require standard web site management tools and mysql database support.

Development
-----------
>The following technologies will be used to build this web site:
1. Javascript
2. Html, Css
3. Nodejs ( express, mysql, sql )

Roles
-----
>Each role can invoke a set of actions.
1. **admin** — can invoke all actions
2. **homeowner** — can add, edit, save and select work orders
3. **lawncare provider** — can select, view and close work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register form** — [ admin ] ( register, edit, save )
2. **login form** — [ admin, homeowner, lawncare provider ] ( login )
3. **user list** — [ admin ] ( select to view )
4. **user form** — [ admin ] ( add, edit, save )
5. **work order list** — [ homeowner, lawncare provider ] ( select to view )
6. **work order form** — [ homeowner ] ( add, edit, save ) [ lawncare provider ] ( close )

Forms
-----
>Provide for user input and submittal to a route on the server.
1. **register** — name, role, email address, street address
2. **login**— name, email address
3. **user** - name, role, email address, street address
4. **work order** — number, homeowner name and email address, lawncare provider name and email address, opened, issue, resolution, closed

Server
------
>Http url routes:
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
2. **work_order** — number: integer, homeowner: text, lawncare provider: text, opened: datetime, issue: text, resolution: text, closed: datetime