
Simple SSR app (from [Create React SSR App](https://github.com/trustworktech/create-react-ssr-app)) with HotStone Client

## Run with HotStone Client latest stable version (from npm)

```shell
$ npm install
$ npm run start
```

## Run with HotStone Client HEAD version

Edit `package.json`:

```json
{
    "dependencies": {
        "hotstone-client": "file:vendor/hotstone-client-0.5.1.tgz"
    },

    "scripts": {
        "preinstall": "npm install ./vendor/*.tgz"
    }
}
```

Run:

```shell
CLIENT_SRC=~/projects/hotstone-seo/hotstone-seo/client; cd $CLIENT_SRC  && npm run build && npm pack && cd - && rm vendor/*.tgz && cp $CLIENT_SRC/*.tgz vendor/ && npm i && npm run start
```
