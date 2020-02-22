# FlowTask with nodejs backend
Introduces single nodejs file and simple json DB.

## Development setup
```
yarn client && node bulld/server.js
```
That will start the creacte-react-app client and point everything to the `server.js`.

## Database
There is a simple DB in the form of two .json files:

 - `db/columns.json`

 - `db/tasks.json`

 The glue layer is in `src/lib/Api.js`.

## Build steps
 1) `yarn build`
 2) Manually move the `db/` folder and its contents under `build/`

 This is not done as part of the build process as we don't want to overwrite existing database.

 3) Rename the paths in `build/server.js` like so:

`app.use(express.static(path.join(__dirname, "public")));`

to

`app.use(express.static(path.join(__dirname, "build")));`

and

`res.sendFile(path.join(__dirname, "public", "index.html"));`

to

`res.sendFile(path.join(__dirname, "build", "index.html"));`
