# Auth0 Code Sample: Express + TypeScript Menu API

This projects presents you with a feature-complete Express API built with TypeScript. The `secure-api` branch implements authorization on the API. 
 
You can test your API locally using terminal commands. Additionally, you can use a live client application, the ["WHATABYTE Dashboard"](https://dashboard.whatabyte.app/), as a testing harness to simulate production conditions and live user interactions.

![WHATBYTE Dashboard demo client](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-menu-page.png)

> The [sleek web player from Spotify](https://open.spotify.com/search) inspired the design of the live demo application.

For **simplicity**, the API stores data in-memory and not in an external database. However, you can connect its data service to any database of your liking.

You can read [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/) to learn how to build this API.

For **security**, the API implements access control by following these business rules:

- Anyone can read data.

- Only authenticated users with a `menu-admin` role can create, update, or delete menu items. The `menu-admin` role bundles the necessary permissions to execute these write operations.

You can follow [Node.js and TypeScript Tutorial: Secure an Express API](https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/) to implement authorization in your API. You'll require users to log in to perform write operations on the API. Additionally, you'll further increase your API's security by requiring users to have a set of permissions (defined through a role) to perform any write operation.

## Get Started

Clone the project in a directory called `menu-api` and checkout its `build-api` branch:

```bash
git clone git@github.com:auth0-blog/menu-api-express-ts.git \
menu-api \
--branch secure-api
```

If you already cloned the project before, checkout the `secure-api` branch.

Make the project folder your current directory:

```bash
cd menu-api
```

Then, install the project dependencies:

```bash
npm i
```

## Set Up an Authorization Service

With Auth0, you can manage the authorization requirements of an application stack easily. To start, you need to create a <a href="https://auth0.com/signup">free Auth0 account</a> if you don't have one yet.

Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that comes with building your own solution to authenticate and authorize users. We offer [tons of guidance and SDKs](https://auth0.com/docs/quickstarts) for you to get started and integrate Auth0 in your stack easily.

After you create your account, you'll create an [Auth0 Tenant](https://auth0.com/docs/getting-started/create-tenant), which is a container that Auth0 uses to store your identity service configuration and your users in isolation &mdash; no other Auth0 customer can peek into or access your tenant. It's similar to you being a tenant in an apartment building. Auth0 looks after the building while the apartment is all yours to live in and customize. However, each apartment is fully isolated (no windows, soundproof walls, etc.) so that neighbors can't intrude on your privacy.

After creating your tenant, you need to create an API register with Auth0, which is an API that you define within your Auth0 tenant and that you can consume from your applications to process authentication and authorization requests.

After creating your account, head to [the APIs section in the Auth0 Dashboard](https://manage.auth0.com/#/apis) and hit the **Create API** button.

Then, in the form that Auth0 shows:
 
- Add a **Name** to your API: `Menu API`.

- Set its **Identifier** to `https://menu-api.example.com`.

- Leave the signing algorithm as `RS256` as it's the best option from a security standpoint.

![Auth0 Dashboard new API form](https://cdn.auth0.com/blog/developing-a-secure-api-with-nestjs/auth0-dashboard-new-api-form.png)

Identifiers are unique strings that help Auth0 differentiate between your different APIs. We recommend using URLs as they facilitate predictably creating unique identifiers; however, Auth0 never calls these URLs.

With these values in place, hit the **Create** button.

Your API needs some configuration variables to identity itself with Auth0: an _Audience_ and a _Domain_ value. The best place to store these values is within the `.env` file of your project.

Open `.env` and add the following keys to it:

```bash
PORT=7000
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
```

Head back to your Auth0 API page, and **follow these steps to get the Auth0 Audience**:

![Get the Auth0 Audience to configure an API](https://cdn.auth0.com/blog/complete-guide-to-user-authentication/get-the-auth0-audience.png)

1. Click on the **"Settings"** tab.

2. Locate the **"Identifier"** field and copy its value.

3. Paste the "Identifier" value as the value of `AUTH0_AUDIENCE` in `.env`.

Now, **follow these steps to get the Auth0 Domain value**:

![Get the Auth0 Domain to configure an API](https://cdn.auth0.com/blog/complete-guide-to-user-authentication/get-the-auth0-domain.png)

1. Click on the **"Test"** tab.
2. Locate the section called **"Asking Auth0 for tokens from my application"**.
3. Click on the **cURL** tab to show a mock `POST` request.
4. Copy your Auth0 domain, which is _part_ of the `--url` parameter value: `tenant-name.region.auth0.com`.
5. Paste the Auth0 domain value as the value of `AUTH0_DOMAIN` in `.env`.

> **Tips to get the Auth0 Domain**
>
> - The Auth0 Domain is the substring between the protocol, `https://` and the path `/oauth/token`.
>
> - The Auth0 Domain follows this pattern: `tenant-name.region.auth0.com`.
> 
> - The `region` subdomain (`au`, `us`, or `eu`) is optional. Some Auth0 Domains don't have it.

**Restart the server so that Express can recognize the changes you just made to `.env`**. Stop the running process and execute `npm run dev` once again.

Finally, run the project by executing the following command:

```bash
npm run dev
```

## Test the API with the Demo Client

You can use a demo application, the [WHATABYTE Dashboard](https://dashboard.whatabyte.app/home), to interact with your Menu API like any user would. The demo application lets you enable and disable its authentication features.
 
Since you have not yet implemented authorization in your API to protect your endpoints, you'll use the demo client without any authentication features, which allows you to perform read and write operations on your Menu API as an anonymous user.

### Set up the demo client application

Head to [https://dashboard.whatabyte.app](https://dashboard.whatabyte.app) to open the demo client. If this is your first time using this client application, the _Auth0 Demo Settings_ view will open up.

Under the **"Auth0 Demo Settings"** view, ensure that the **Enable Authentication Features** option is off:

![Dashboard demo settings without authentication](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/auth0-demo-settings-authentication-features-off.png)

You should have a form with one field labeled **API Server Base URL** under its **API Configuration** section. The value of this field corresponds to your Express server base URL, in this case, `http://localhost:7000`.

> If you are using any other base URL for your server, change the value of the form field.

Now, click the **Save** button to load the demo client application:

![Dashboard home page](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-home-page.png)

Locate the navigation bar on the left side of the page. Then, click on the **Menu** tab. Three menu items from your server's store should load up:

![Dashboard menu page](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-menu-page.png)

### Create an item

On the **"Menu Items"** page, click on the **Add Item** button on the top-right corner. The **"Add Menu Item"** page should load up with a pre-populated form:

![Page to add a menu item](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-create-item-salad.png)

Click on the **Save** button to add a "Spring Salad" item to your menu.

Once the request-response cycle is complete between the client and the server, the client application loads the "Menu Items" page again. The menu grid now features four items, which includes the "Spring Salad":

![Menu page showing new item](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-add-item-success-salad.png)

### Update an item

Now, try updating the property of an item. Click on the "Tea" item to load its item page:

![Tea menu item page](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-menu-item-page-tea.png)

You'll notice two buttons at the bottom: **Edit** and **Delete**. 

Click the **Edit** button and modify the form that loads up:

- Change the **Name** value from "Tea" to "Ginger Tea".
- Change the **Description**  value from "Informative" to "Energizing".

![Page to edit the tea item](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-edit-menu-item.png)

Then, click the **Save** button. Once the request-response cycle completes again, you'll see four items in the menu grid. However, the "Tea" item will show its new name and description:

![Updated menu item page](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-edit-item-success-tea.png)

### Delete an item

Click on any item on the menu grid, such as the "Spring Salad". On the item page, click its **Delete** button. You'll load up the **"Delete Menu Item"** page, asking you to confirm if you what to delete the item:

![Page to delete the salad item](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-delete-menu-item-salad.png)

Click the **Delete** button to confirm the operation. After the request-response cycle completes, the menu grid loads up without that particular item:

![Menu page without the deleted item](https://cdn.auth0.com/blog/whatabyte-dashboard-demo-client/anon-delete-item-success-salad.png)
