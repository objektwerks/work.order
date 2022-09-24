Work Order App
--------------
>A web app linking homeowners and service providers via work orders and email notification.

Setup
-----
>At least ***one*** service provider must be ***registered*** before ***any*** homeowners register and submit work orders.

App
---
>Home page:
* [App](../doc/app/app.png)

Register
--------
>Provide a 1) role, 2) name, 3) email address and 4) street address via:
* [Register](../doc/app/register.png)
>If the email address is valid, a registration email is sent:
* [Registration Email](../doc/app/register.email.png)

Login
-----
>Provide an 1) email address and 2) pin via:
* [Login](../doc/app/login.png)

WorkOrders
----------
>Rules:
1. Only homeowners can submit a work order. Service providers can't.
2. Only service providers can close a work order. Homeowners can't.
3. Only 1 photo may be selected. A photo is not required, though.
4. Once a work order is submitted, only a service provider may edit and close it.
>Views:
* [WorkOrders Homeowners](../doc/workorders/work.orders.homeowner.png)
* [WorkOrders Service Providers](../doc/workorders/work.orders.service.provider.png)
* A homeowner will see a New and Refresh button; while a service provider will only see a Refresh button.
* Both a homeowner and service provider may select and view an open or closed work order.
* Closed work orders are readonly.
* Form fields with a light grey background are readonly.
>Examples:
1. [WorkOrder Opened By Homeowner](../doc/workorder/work.order.opened.homeowner.png)
2. [WorkOrders Opened](../doc/workorders/work.orders.opened.png)
3. [WorkOrder Opened Email](../doc/workorder/work.order.opened.email.png)
4. [WorkOrder Closed By Service Provider](../doc/workorder/work.order.closed.by.service.provider.png)
5. [WorkOrder Closed Email](../doc/workorder/work.order.closed.email.png)
6. [WorkOrders Closed](../doc/workorders/work.orders.closed.png)

Profile
-------
>Homeowners and service providers create a profile during registration. See:
* [Service Provider](../doc/profile/profile.service.provider.png)
* [Homeowner Profile](../doc/profile/profile.homeowner.png)