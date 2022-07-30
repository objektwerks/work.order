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
>A server, via the http protocol, receives requests from a client and returns responses on the follow routes:
1. /
2. /register
3. /login
4. /workorders
5. /workorder/id
6. /roles
7. /roles/id
8. /users
9. /users/id

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