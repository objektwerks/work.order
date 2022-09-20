Work Order App
--------------
>Work order web app linking homeowners and service providers via work orders and email notification.

Setup
-----
>At least ***one*** service provider must be ***registered*** before ***any*** homeowners register and submit work orders.

App
---
>Entry point via:
* [App](../doc/app/app.png)

Register
--------
>Provide a 1) role, 2) name, 3) email address and 4) street address via:
* [Register](../doc/app/register.png)
>If the email address is valid, a registration email is sent:
* [Registration Email](../doc/app/register.email.png)

Login
-----
>Provide an 1) email address and 2) pin via [Login](../doc/app/login.png)

WorkOrders
----------
>Rules:
1. Only homeowners can submit a work order. Service providers can't.
2. Only service providers can close a work order. Homeowners can't.
3. Only 1 photo may be selected. A photo is not required, though.
4. Once a work order is submitted, only a service provider may edit and closed it.
>Views:
* [WorkOrders Homeowners](../doc/workorders/work.orders.homeowner.png)
* [WorkOrders Service Providers](../doc/workorders/work.orders.service.provider.png)
* A homeowner will see a New and Refresh button; while a service provider will only see a Refresh button.
* Both a homeowner and service provider may select and view an open or closed work order.
* Closed work orders are readonly.
>Examples:
1. [WorkOrder Closed No Photo](../doc/6.work.order.service.provider.no.photo.png)
2. [WorkOrder New](../doc/7.work.order.new.homeowner.png)
3. [WorkOrder Opened](../doc/8.work.order.opened.homeowner.png)
4. [WorkOrders](../doc/9.work.orders.opened.homeowner.png)
5. [WorkOrder Opened Email](../doc/10.work.order.opened.email.png)
6. [WorkOrder Closed](../doc/11.work.order.closed.by.service.provider.png)
7. [WorkOrder Closed Email](../doc/12.work.order.closed.email.png)
8. [WorkOrders](../doc/13.work.orders.closed.png)

Profile
-------
>Service providers and homeowners create a profile during registration. See:
* [Service Provider](../doc/profile/profile.service.provider.png)
* [Homeowner Profile](../doc/profile/profile.homeowner.png)