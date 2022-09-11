Work Order
----------
Work order web app linking homeowners and service providers.

Usage
-----
>***Must*** register at least ***one*** service provider before ***any*** homeowners register and submit work orders.

Technologies
------------
>Typescript, Html, Css, W3C.css, Express, Nodemailer, Mysql and Nodejs.

Code Sharing
------------
>To share Typescript code between client and server, in a node web app, I discovered the following solutions:
1. npm link
2. npm publish
3. npm install via npm **and** github repo
4. browserify ( browserify.org )
5. lerna ( lerna.js.org )
6. bit ( bit.dev )
>The top 3 solutions allow for proper ES module imports in both client and server source code during
>development. ***Yet ES6 imports fail to work in the client, when deployed to a browser.*** Moreover,
>said solutions require a lot of research, trial and error. I have explored solutions 4, 5 and 6, with
>Browserify looking the most promising. None are ideal. Consequently, ***entity.ts***, located in
>**src/client** and **src/server** is ***duplicate*** code. Interestingly, code sharing is available
>by **default** with ScalaJs.

Doc
---
>See **doc** folder for ui images.

Install
-------
1. npm install
>See **package.json** for details.

Database
--------
1. npm run ddl

Test
----
1. npm run build
2. npm run test

Dev
---
1. npm run build
2. npm run watch
3. npm run dev

Prod
----
1. npm run build
2. cp -r dist target/
3. cd target
4. node server.js

Nodejs Hosting Providers
------------------------
>Consider:
1. [NodeChef](https://www.nodechef.com/nodejs-hosting)
2. [Digital Ocean](https://www.digitalocean.com/)
3. [Heroku](https://www.heroku.com/nodejs)

Roles
-----
>A role can invoke a set of actions.
1. **homeowner** — add, select and edit *work orders*
2. **service provider** — select and edit *work orders*

Features [ Roles ]
-----------------
>A feature maps to a set of roles.
1. **register user** — [ homeowner, service provider ]
2. **login user** — [ homeowner, service provider ]
3. **add work order** — [ homeowner ]
4. **edit work order** — [ homeowner, service provider ]
5. **list work orders** - [ homeowner, service provider ]
6. **edit user** — [ homeowner, service provider ]

Forms
-----
1. **register** — role, name, email address, street address
2. **login**— email address, pin
3. **user** - role, name, email address, street address, registered
4. **work order** — number, homeowner id, service provider id via list, issue, image_url, resolution, opened, closed

Routes
------
1. post - /register
2. post - /login
3. post - /workorders/add
4. post - /workorders/save
5. post  - /workorders
6. post - /users/save

Sequences
---------
1. **client** --- register --> server --- registered ---> client
2. **client** --- login --> server --- logged in --> client
3. **client** --- (add) save work order --> server --- work order saved --> client
4. **client** --- save work order --> server --- work order saved --> client
5. **client** --- list work orders --> server --- work orders listed --> client
6. **client** --- save user --> server --- user saved --> client

Authentication
--------------
>Via route:
1. /login
>at service.login with **emailAddress** and **pin** via *Login* command.

Authorization
-------------
>Via routes:
1. /workorders/add
2. /workorders/save
3. /workorders
4. /users/save
>at handler.{ addWorkOrder, saveWorkOrder, listWorkOrders, saveUsder } with **license** via *associated* commands.

Schema
------
1. work_order_db
2. user
3. work_order
>See **ddl.sql** for details.

Mysql Setup
-----------
1. sudo mysql -u root
2. CREATE USER 'workorder'@'localhost' IDENTIFIED BY 'workorder';
3. SHOW CREATE USER 'workorder'@'localhost';
4. GRANT ALL PRIVILEGES ON work_order_db.* TO 'workorder'@'localhost';
5. ALTER USER 'workorder'@'localhost' IDENTIFIED BY 'workorder';
6. FLUSH PRIVILEGES;
7. \. ddl.sql

Mysql
-----
1. mysql -u workorder -p
2. \. ddl.sql

Date Time
---------
>Use ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ

Photos
------
>Supported photo file formats:
1. **jpeg**
2. **png**
>Note, only 1 image per work order allowed at this time.

Curl
----
* curl --header "Content-Type: application/json" \
       --request POST \
       --data '{"role":"serviceprovider","name":"fred flintstone","emailAddress":"objektwerks@runbox.com","streetAddress":"123 stone st"}' \
       http://127.0.0.1:3000/register

* curl --header "Content-Type: application/json" \
       --request POST \
       --data '{"emailAddress":"objektwerks@runbox.com","pin":"1234567"}' \
       http://127.0.0.1:3000/login

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