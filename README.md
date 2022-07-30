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

Roles
-----
>Each role can invoke a set of actions.
1. **admin** — can invoke all actions
2. **homeowner** — can add, edit, save and select work orders
3. **lawncare provider** — can select, view and close work orders

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a role and set of actions.
1. **register form** — [ admin ] ( register, edit, save )
2. **login form** — [ admin, homeowner, lawncare provider ] ( login )
3. **work order list** — [ homeowner, lawncare provider ] ( select to view )
4. **work order form** — [ homeowner ] ( add, edit, save ) [ lawncare provider ] ( close )
5. **user list** — [ admin ] ( select to view )
6. **user form** — [ admin ] ( add, edit, save )

Forms
-----
>Provide for user input and submittal to a server.
1. **register** — name, role, email address, street address
2. **login**— name, email address
3. **work order** — homeowner email address, lawncare provider email address, opened, issue, resolution, closed
4. **role** - name
5. **user** - email address, street address

Server
------
>A server, via the http protocol, receives requests from a client and returns responses on the follow routes:
1. /
2. /register
3. /login
4. /users
5. /users/id
6. /workorders
7. /workorder/id

Tables
------
>Provides for the storage and retrieval of data.
1. **homeowner** — email address: text, street address: text
2. **lawncare_provider** — email address: text
3. **work_order** — homeowner: text, lawncare provider: text, opened: datetime, issue: text, resolution: text, closed: datetime

Development
-----------
>The following technologies will be used to build this web site:
1. Javascript
2. Html, Css
3. Nodejs ( express, mysql, sql )