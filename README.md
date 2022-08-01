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
1. **register homeowner | service provider** — [ admin ] ( register, edit )
2. **login homeowner | service provider** — [ admin, homeowner, service provider ] ( login )
3. **list homeowners | service providers** — [ admin ] ( view )
4. **add and edit homeowner | service provider** — [ admin ] ( add, edit )
5. **list work orders by homeowner | service provider** — [ admin, homeowner, service provider ] ( view )
6. **filter work orders by not closed** — [ admin, homeowner, service provider ] ( view )
7. **add and edit work order** — [ homeowner, service provider ] ( add, edit )

Forms
-----
1. **register homeowner** — name, email address, street address
2. **register service provider** - name, email address
3. **login**— email address, pin
4. **homeowner** - id, name, email address, street address, registered, is admin
5. **service provider** - id, name, email address, registered
6. **work order** — number, homeowner id, service provider id, opened, issue, resolution, closed

Routes
------
1. get  - /
2. post - /register/homeowner
3. post - /register/serviceprovider
4. post - /login
5. get  - /homeowners
6. get  - /homeowners/:email_address
7. post - /homeowners/save
5. get  - /serviceproviders
6. get  - /serviceproviders/:email_address
7. post - /serviceproviders/save
8. get  - /workorders
9. get  - /workorders/:number
10. post - /workorders/save

Database
--------
1. **work_order_db**

Tables
------
1. **homeowner**
2. **service_provider**
3. **work_order**
>See **ddl.sql** for details.

Mysql
-----
>First option:
1. mysql -uroot -p < ddl.sql
>Second option:
1. mysql -uroot -p
2. \. ddl.sql