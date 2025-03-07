Work Order
----------
>Work order (mobile) web app linking homeowners and service providers via work orders and email notification.

Todo
----
1. Refactored service.ts and store.ts ( see notes and code in both files for details ).

Documentation
-------------
>See [Readme](doc/readme.md)

Technologies
------------
>Typescript, Html, Css, W3C.css, Express, Nodemailer, Mysql and Nodejs.

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
>Requires a Mysql database and email service. See [PM2](https://pm2.keymetrics.io/)

Hosting
-------
>Consider:
1. [NodeChef](https://www.nodechef.com/nodejs-mysql-hosting)
2. [Heroku](https://www.heroku.com/nodejs)
3. [A2](https://www.a2hosting.com/nodejs-hosting)
>Requires a Mysql database, email service and monitoring.

Roles
-----
>A role can invoke a set of actions.
1. **homeowner** — add, select and edit *work orders*
2. **service provider** — select and edit *work orders*
3. **app** - has super powers :)

Features [ Roles ]
------------------
>A feature maps to a set of roles.
1. **register user** — [ homeowner, service provider ]
2. **login user** — [ homeowner, service provider ]
3. **add work order** — [ homeowner ]
4. **edit work order** — [ homeowner, service provider ]
5. **list work orders** - [ homeowner, service provider ]
6. **edit user** — [ homeowner, service provider ]
7. **registration email notification*** - [ app ]
8. **new work order email notification** - [ app ]
9. **work order (updated and closed) email notifications** - [ app ]

Forms
-----
1. **register** — role, name, email address, street address
2. **login**— email address, pin
3. **work order** — number, homeowner, service provider, issue, street address, image url, resolution, opened, closed
4. **user** - role, name, email address, street address, registered

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
1. **client** --- register --> server --- registered ---> client --- email ---> homeowner or service provider
2. **client** --- login --> server --- logged in --> client
3. **client** --- (add) save work order --> server --- work order saved --> client --- email ---> homeowner and service provider
4. **client** --- save work order --> server --- work order saved --> client --- email ---> homeowner and service provider
5. **client** --- list work orders --> server --- work orders listed --> client
6. **client** --- save user --> server --- user saved --> client

Registration
------------
>A prospective user must register with a/an:
1. role
2. name
3. email address
4. street address
>If the email address is valid, the new user will receive a ***pin*** via a **Work Order Registration** email.

Authentication
--------------
>A user must login with a/an:
1. email address
2. pin

Authorization
-------------
>The following routes are authorized by a user's **license**:
1. /workorders/add
2. /workorders/save
3. /workorders
4. /users/save

Mysql Schema
------------
1. work_order_db
2. user
3. work_order
>See **user.sql** and **ddl.sql** for details.

Mysql Setup
-----------
>Built using Mysql 8.0.30
1. sudo mysql -u root
2. \. user.sql
3. \. ddl.sql
4. exit

Mysql Connection Url
--------------------
* mysql://workorder:workorder@127.0.0.1:3306/work_order_db

Mysql Update
------------
1. mysql -u workorder -p
2. \. ddl.sql
3. exit

Mysql Log
---------
>Apple M1, macOS, Big Sur - /opt/homebrew/var/mysql/computername.local.err

Mysql Connection Error
----------------------
>Nodejs occassionally produces this error with Mysql: connect ECONNREFUSED ::1:3306
>The solution is varied and fundamentally unknown.

Cache
-----
>A user **license** is cached at login. This is the simplest possible cache, with no time-to-live configuration
>or random-cache-miss database access. With an expected max user base of 50 to 100, this is the best option at
>present. Moreover, it is expected the server will need to be restarted at leaast once a week - due to likely
>nodejs memory leaks.

Date Time
---------
>ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ

Photos
------
>The following image file types are supported:
1. **jpeg**
2. **jpg**
3. **png**
>Only **1** image is allowed ***per*** work order. The app stores ***images*** in **WORK_ORDER_IMAGES_DIR** defined below.

Environment
-----------
>The following environment variables ***must*** be defined:
export WORK_ORDER_BIND_IP="127.0.0.1"
export WORK_ORDER_PORT=3000
export WORK_ORDER_DATABASE_URL="mysql://workorder:workorder@127.0.0.1:3306/work_order_db"
export WORK_ORDER_EMAIL_HOST="youremailhost.com"
export WORK_ORDER_EMAIL_PORT=587
export WORK_ORDER_EMAIL_SENDER="youremailaddress@youremailhost.com"
export WORK_ORDER_EMAIL_PASSWORD="youremailpassword"
export WORK_ORDER_SERVICE_PROVIDER_EMAIL="testemailaddress1@youremailhost.com"
export WORK_ORDER_HOME_OWNER_EMAIL="testemailaddress2@youremailhost.com"
export WORK_ORDER_DIR=$HOME/.workorder
export WORK_ORDER_IMAGES_DIR=$WORK_ORDER_DIR/images
export WORK_ORDER_LOGS_DIR=$WORK_ORDER_DIR/logs
>All variables are for production less: WORK_ORDER_SERVICE_PROVIDER_EMAIL and WORK_ORDER_HOME_OWNER_EMAIL, which are
>for the integration test.

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

Code Sharing
------------
>To share Typescript code between client and server, in a node web app, I discovered the following purported solutions:
1. npm link
2. npm publish
3. npm install via npm **and** github repo
4. browserify ( browserify.org )
5. lerna ( lerna.js.org )
6. bit ( bit.dev )
7. typescript references ( blog.logrocket.com/make-sharing-typescript-code-types-quick-easy/ )
>The top 3 solutions allow for proper ES module imports in both client and server source code during development.
>Yet ES6 imports ***fail*** to work when deployed to a browser. Moreover, said solutions require endless research,
>trial and error. I have explored solutions 4, 5, 6 and 7, with 7 looking the most promising. None are ideal.
>Consequently, ***entity.ts***, located in >**src/client** and **src/server** is ***duplicate*** code.
>Interestingly, code sharing is available by **default** with ScalaJs.

License
-------
>Copyright (c) [2022 - 2025] [Objektwerks]

>Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    * http://www.apache.org/licenses/LICENSE-2.0

>Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations u\nder the License.
