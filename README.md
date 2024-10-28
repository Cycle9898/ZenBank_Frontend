# Zen Bank

## Introduction

ZenBank is a modern banking platform.

With this application, you can link your bank accounts, view information and transaction history on them, and transfer funds.

The back-end (authentication and database) is handled by Appwrite.

Plaid is used to retrieve user's bank account informations from banks.

Funds transfer is handled by Dwolla.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

-   [Node.JS](https://nodejs.org/en)

-   [PNPM](https://pnpm.io/fr/)

-   [Appwrite account](https://cloud.appwrite.io/) for authentication and database

-   [Dwolla account](https://www.dwolla.com/) for money transfer

### Appwrite database fields

#### User

-   'email': Email type, required

-   'userId': String type, required

-   'dwollaCustomerUrl': String type, required

-   'dwollaCustomerId': String type, required

-   'firstName': String type, required

-   'lastName': String type, required

-   'address1': String type, required

-   'city': String type, required

-   'postalCode': String type, required

-   'dateOfBirth': String type, required

-   'ssn': String type, required

-   'state': String type, required

#### Banks

-   'accountId': String type, required

-   'bankId': String type, required

-   'accessToken': String type, required

-   'fundingSourceUrl': String type, required

-   'shareableId': String type, required

-   'userId': Relationship with userId from 'User' type

#### Transactions

-   'name': String type, required

-   'amount': String type, required

-   'channel': String type, required

-   'category': String type, required

-   'senderId': String type, required

-   'receiverId': String type, required

-   'senderBankId': String type, required

-   'receiverBankId': String type, required

-   'email': String type, required

## Getting Started

1. Create accounts on Dwolla, Appwrite and configure the database with the above templates

2. Clone this project

3. Install dependencies with `pnpm install`

4. Complete the .env file with the requested informations (to be retrieved from your Dwolla and Appwrite accounts)

5. Start the project:

```bash
pnpm dev
# or
pnpm build
pnpm preview
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test the app

The Zen Bank app is hosted on Vercel : [https://zen-bank.vercel.app/](https://zen-bank.vercel.app/)

You can test it with the following credentials :

-   Email: 'test@test.com'

-   Password: 'password123'
