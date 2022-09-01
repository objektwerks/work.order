Work Order
----------
Work order web app linking homeowners and service providers.

Todo
----
1. Rewrite integration test to use service, not router, making it a simple sync test!

Technologies
------------
>Typescript, Html, Css, W3C.css, Express, Nodemailer, Mysql and Nodejs.

Code Sharing
------------
>Various off-the-wall solutions aside, it is not possible to share source code between client and server.
>An NPM local path dependency install works, but an import of the new local package is not recognized by
>the client or server. Consequently, ***entity.ts***, located in **src/client** and **src/server** is
>***duplicate*** code. Interestingly, code sharing is available by default with ScalaJs.

Doc
---
>See **doc** folder for ui images.

Install
-------
1. npm install
>See **package.json** for details.

Install Issues
--------------
1. Note **dependencies** may not work if not installed in your home directory. After a project npm install, some dependencies don't appear in the project node_modules directory.
2. Install nodemon, typescript, typesync, ts-node, ts-watch, tsx and the like globally to run without npx or npm scripts.

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
2. npm run dev

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

Features [ Role ]
-----------------
>A feature maps to a set of roles.
1. **register user** — [ homeowner, service provider ]
2. **login user** — [ homeowner, service provider ]
3. **add work order** — [ homeowner ]
4. **edit work order** — [ homeowner, service provider ]
5. **list work orders by user** - [ homeowner, service provider ]
6. **get work order by number** - [ homeowner, service provider ]
7. **edit user** — [ homeowner, service provider ]

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
5. get  - /workorders/user/:id
6. get  - /workorders/:number
7. post - /users/save
8. post - /image/save

Sequences
---------
1. **client:register** --- registration --> server --- registered ---> client
2. **client:login** --- credentials --> server --- logged in --> client
3. **client:add** --- work order --> server --- work order saved --> client
4. **client:save** --- work order --> server --- work order saved --> client
5. **client:get** --- userid --> server --- work orders listed --> client
6. **client:get** --- number --> server --- work order selected --> client
7. **client:save** --- user --> server --- user saved --> client
8. **client:save** --- image form data --> server --- image saved --> client

Schema
------
1. work_order_db
2. user
3. work_order
>See **ddl.sql** for details.

Mysql
-----
>Option 1:
1. mysql -uroot -p < ddl.sql
>Option 2:
1. mysql -uroot -p
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
       --data '{"role":"serviceprovider","name":"fred flintstone","emailAddress":"funkwerks@runbox.com","streetAddress":"123 stone st"}' \
       http://127.0.0.1:3000/register

* curl --header "Content-Type: application/json" \
       --request POST \
       --data '{"emailAddress":"funkwerks@runbox.com","pin":"1234567"}' \
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