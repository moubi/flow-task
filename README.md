# FlowTask with php backend
Query handling and simple json DB.

## Server
The server is handling the `POST/PUT/DELETE` requests and is split in two:
 - `api/columns/index.php` - columns related updates
 - `api/tasks/index.php`- tasks related updates

## Database
There is a simple DB in the form of two .json files:

 - `db/columns.json`

 - `db/tasks.json`

 The glue layer is in `src/lib/Api.js`.

## Build steps
 1) `yarn build`
 2) Manually move the `db/` folder and its contents under `build/`

 This is not done as part of the build process as we don't want to overwrite existing database.
