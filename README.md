Work Order
----------
Work order web app linking homeowners and service providers.

Todo
----
1. Send ***email notification*** to *homeowner* and *service provider* when a *work order* is ***opened*** and ***closed***.

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
1. npm run test

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
4. pm2 start server.js
>See [PM2](pm2.keymetrics.io/)

Nodejs Hosting
--------------
>Consider:
1. [NodeChef](nodechef.com/nodejs-hosting)
2. [Heroku](heroku.com/nodejs)
3. [A2](a2hosting.com/nodejs-hosting)

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

Registration
------------
>A prospective user must register with:
1. role
2. name
3. email address
4. street address
>If the email address is valid and registration email sent, the new user will receive a pin.

Authentication
--------------
>**Route**:
1. /login
>**Function**: service.login with **emailAddress** and **pin** via *Login* command.

Authorization
-------------
>**Routes**:
1. /workorders/add
2. /workorders/save
3. /workorders
4. /users/save
>**Functions**: handler.{ addWorkOrder, saveWorkOrder, listWorkOrders, saveUser } with **license** via *SaveWorkOrder*,
>*ListWorkOrders* and *SaveUser* commands.

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
>Built with version - 8.0.30
1. mysql -u workorder -p
2. \. ddl.sql

Cache
-----
>A user **license** is cached at login. This is the simplest possible cache, with no time-to-live configuration
>or random-cache-miss database access. With an expected max user base of 50 to 100, this is the best option at
>present. Moreover, it is expected the server will need to be restarted at leaast once a week - due to likely
>memory leaks.

Date Time
---------
>Use ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ

Photos
------
>The following image file types are supported:
1. **jpeg**
2. **png**
>Only **1** image is allowed ***per*** work order. The app stores ***images*** in **WORK_ORDER_IMAGES_DIR** defined below.

Environment
-----------
>The following ***environment variables*** must be defined:
export WORK_ORDER_BIND_IP="127.0.0.1"
export WORK_ORDER_PORT=3000
export WORK_ORDER_DATABASE_URL="mysql://workorder:workorder@localhost:3306/work_order_db"
export WORK_ORDER_EMAIL_HOST="youremailhost.com"
export WORK_ORDER_EMAIL_PORT=587
export WORK_ORDER_EMAIL_SENDER="youremailaddress@youremailhost.com"
export WORK_ORDER_EMAIL_PASSWORD="youremailpassword"
export WORK_ORDER_SERVICE_PROVIDER_EMAIL="testemailaddress1@youremailhost.com"
export WORK_ORDER_HOME_OWNER_EMAIL="testemailaddress2@youremailhost.com"
export WORK_ORDER_DIR=$HOME/.workorder
export WORK_ORDER_IMAGES_DIR=$WORK_ORDER_DIR/images
export WORK_ORDER_LOGS_DIR=$WORK_ORDER_DIR/logs

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