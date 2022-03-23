# lukso-test-scripts

Test scripts for [lsp-factory.js](https://docs.lukso.tech/tools/lsp-factoryjs/introduction/getting-started).

## Install

```sh
yarn install
```

### Generate private key

You will need to add your private key in `.env`.

```sh
cp .env.example .env
```

To generate and fund one address, you can check the [LUKSO Universal Profile docs](https://docs.lukso.tech/guides/universal-profile/create-profile).
Or you can use the [`./src/generate-account.ts`](./src/generate-account.ts) script.

## Run scripts

```sh
npx ts-node src/[SCRIPT-NAME].ts
```
