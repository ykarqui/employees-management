# STEPS

## Check node version with nvm
```bash
nvm current
```
## to get nvm (Node Version Manager)
[nvm](https://github.com/nvm-sh/nvm)

## run-rs
[run-rs](https://www.npmjs.com/package/run-rs)
```bash
npm i run-rs -g
```
## If you can't try the following command
```bash
nvm use 12.17.0 #The current LTS version
```

## mongo-express
[mongo-express](https://www.npmjs.com/package/mongo-express)
```bash
npm i -g mongo-express
```
## Download npm dependencies
At the project root folder run
```bash
npm i
```
# Run
Start mongodb with replica sets
```bash
run-rs
```

Start node app
```bash
npm run dev
```

To test the GraphQL queries through GraphiQL access to
localhost:3000/graphql

# Extras
To interact with mongodb you can use mongo-express
```bash
mongo-express -U "mongodb://localhost:27017,localhost:27018,localhost:27019/example?replicaSet=rs"
```

# SOLVE SOME FIX WITH UBUNTU
$ npm config set unsafe-perm=true
$ sudo chown -R $USER /usr/local/lib/node_modules
$ npm install run-rs -g
$ run-rs

$ npm run dev

$ mongo-express -U "mongodb://localhost:27017,localhost:27018,localhost:27019/example?replicaSet=rs"
http://localhost:8081