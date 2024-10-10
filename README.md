# EVA NextUI Onboarding Template

## Introduction

This is a template to quickly set up an EVA onboarding page.

Supported UserRequirements:

- EmailAddress
- FirstName
- LastName
- PhoneNumber
- DateOfBirth
- Gender
- CountryID
- LanguageID

The portal supports subscriptions, but exclusively those without inquiries attached.

The portal also support providing a redirect url, which it will redirect to after signup with a token to be used for automatic login.

Finally, the portal support customer account types `0` and `1`, set through `App:Customer:AccountType`. If it is set to `0`, password fields will be added to the form.

### Supported query params

The portal supports several query parameters, each of these have different functions. These params are as follows:

- `baseurl/[languageID]?storeId=xyz&orderId=xyz&orderAppToken=xyz&redirectUrl=xyz

**storeId**

When this param is given, the `storeId` will be set on the customer as `PreferredStoreID`.

**orderId** and **orderAppToken**

When both of these params are given, the customer will be attached to the given order. `OrderAppToken` should be the token which you get when calling `CreateOrderAppToken` for an order.

**redirectUrl**

When a `redirectUrl` is given we navigate to this URL after a successful signup. Additionally, we will append a `token` query param when navigating to the `redirectUrl`. This token can be used in the `AuthenticationToken` body parameter of the `/login` endpoint to authenticate the user in the application we redirect to. Format:

- `redirectUrl?token=xyz`

Note: RedirectURL should be an encoded URI component (encodeURIComponent() in JavaScript)

## Getting started

Either clone the repository yourself, or [Deploy directly on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdavidoost%2Fnextui-onboarding&env=EVA_ENDPOINT,ONBOARDING_OU_ID&envDescription=See%20the%20README%20file%20for%20an%20in-depth%20description%20of%20these%20variables.)

### Installation

Run the following command to install all dependencies:

`npm i`

### Environment variables

Create an `.env.local` file at the root of the folder with the following structure:

```
EVA_ENDPOINT=https://api.euw.example.test.eva-online.cloud // your EVA endpoint
ONBOARDING_OU_ID=32 // The OU to run on (must be of type webshop)
```

### Running the development server

No run `npm run dev` to run the development server.

## Deploying the portal

Since the portal is built on Next.js, the recommended deployment platform would be Vercel. After deployment, make sure to add your deployment URL to the `Cors:AccessControlAllowOrigin` in your EVA environment. Without this setting, any requests this app makes will be denied by EVA.

## Styling

This project uses [NextUI](https://nextui.org/). Refer to the documentation to figure out styling.

## Adding UserRequirements / Form Fields

To add a new UserRequirement, add it to:

- `src/types/user-requirements.ts`
- `src/types/onboarding-form-data.ts`
- `src/schemas/onboarding-schema.ts`
- `src/functions/create-customer.ts`
- `src/forms/onboarding-form.tsx`

## Adding new translation languages

- Add a translation file under `src/i18n` with a file name reflecting the language's ISO 639-1 code.

## Adding new translation keys

- Add the key under `src/types/translations`
- Add a value for the key in all translation files
