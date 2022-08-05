Work Order
----------
Work order web app using javascript, html, css, mysql and nodejs.

Install
-------
1. npm install
>See **package.json** for details.

Dev
---
1. npm run dev
2. Control-C ( to stop nodemon )

Nodejs Hosting Providers
------------------------
>Consider:
1. [NodeChef](https://www.nodechef.com/nodejs-hosting)
2. [Digital Ocean](https://www.digitalocean.com/)
3. [Heroku](https://www.heroku.com/nodejs)

Image Content Delivery Network (CDN)
------------------------------------
>Required for work order image url. Consider:
1. [Bunny](https://bunny.net/)
2. [ImageKit](https://imagekit.io/)
3. [Cloudinary](https://cloudinary.com/) ( Javascript SDK )

Roles
-----
>A role can invoke a set of actions.
1. **homeowner** — add, select and edit *work orders*
2. **service provider** — select and edit *work orders*

Features [ Role ] ( Actions )
-----------------------------
>A feature maps to a set of roles and actions.
1. **register user** — [ homeowner, service provider ] ( register )
2. **login user** — [ homeowner, service provider ] ( login )
3. **add work order** — [ homeowner ] ( add )
4. **edit work order** — [ homeowner, service provider ] ( edit )
5. **list work orders by userid** - [ homeowner, service provider ] ( list )
6. **get work order by number** - [ homeowner, service provider ] ( get )
7. **edit user** — [ homeowner, service provider ] ( edit )
8. **list users by role** - [ homeowner ] ( list )

Forms
-----
1. **register** — role, name, email address, street address
2. **login**— email address, pin
3. **user** - role, name, email address, street address, registered
4. **work order** — number, homeowner id, service provider id via list, issue, image_url, resolution, opened, closed

Routes
------
1. get  - /
2. post - /register
3. post - /login
4. post - /workorders/add/:number
5. post - /workorders/update/:number
6. get  - /workorders/:userid
7. get  - /workorders/:number
8. post - /users/update
9. get  - /users/:role

Sequences
---------
1. client:register --- registration --> server --- status ---> client
2. client:login --- credentials --> server --- user, workorders --> client
3. client:add --- work order --> server --- workorder --> client
4. client:update --- work order --> server --- status --> client
5. client:list --- userid --> server --- workorders --> client
6. client:get --- number --> server --- workorder --> client
7. client:update --- user --> server --- status --> client
8. client:list --- role --> server --- users --> client

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

License
-------
> Copyright (c) [2022] [Objektwerks]

>Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    * http://www.apache.org/licenses/LICENSE-2.0

>Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.