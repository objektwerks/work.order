Work Order
----------
Work order web site design.

Roles
-----
>Roles are assigned to a user. Each role can invoke a set of actions.
1. **admin** — can invoke all actions
2. **homeowner** — can add, edit, save and select work orders
3. **lawncare provider** — can select, view and close work orders

Features [ Role ] ( Actions )
-----------------------------

1. register form — [ admin ] ( register, edit, save )
2. login form — [ homeowner, lawncare provider ] ( login )
3. work order list — [ homeowner, lawncare provider ] ( select to view )
4. work order form — [ homeowner ] ( add, edit, save ) [ lawncare provider ] ( close )
5. role list — [ admin ] ( select to view )
6. role form — [ admin ] ( add, edit, save )
7. user list — [ admin ] ( select to view )
8. user form — [ admin ] ( add, edit, save )

Forms
-----

1. register form — email address, street address
2. login form — email address
3. work order form — homeowner **, lawncare provider **, opened, issue, resolution, closed
4. role form - name
5. user form - email address, street address

** Can include or link to email address and street address.

Tables
------

1. role — name: varchar
2. user — email address: varchar, street address: varchar
3. users-roles — join table
3. work order — homeowner: user, lawncare provider: user, opened: datetime, issue: varchar, resolution: varchar, closed: datetime

Requirements
------------

1. website provider with the usual compliment of web site management tools, to include mysql database.

Technologies
------------

1. Javascript
2. Html
3. Css
4. Sql
