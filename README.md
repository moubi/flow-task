# Todo board for touch
Simple todo board for your mobile browser. Written in **React** using [create-react-app](https://github.com/facebook/create-react-app).

## Support

Though, it contains some nice ideas in terms of UI and interactions, the board was initially intended to serve personal goals and therefore developed and tested in _**latest iOS Safari**_.

## Getting started

Open your terminal and go to your projects folder
```
git clone git@github.com:moubi/todo-board.git
cd todo-board/
yarn
yarn start
```

That's it. Navigate to http://localhost:3002 and view the board filled with some example data.

### Before installation

The project is built with node version **10.15.1**. This is set in the `.nvmrc` file. You may need to additionally install it on your development machine using `nvm`:
```
nvm install 10.15.1
nvm use
```

## Backend integration

All the code under the `master` branch is pure frontend using _**localStorage database**_ to store columns and tasks data. There are, though, two backend integrations for deployment on a php or node enabled hosting.

 - Php backend (in [feature/php-backend](https://github.com/moubi/todo-board/tree/feature/php-server) branch)
 - Node backend (in [feature/node-backend](https://github.com/moubi/todo-board/tree/feature/node-server) branch)

Check their corresponding READMEs for more info.

## Tests

Trigger the test suite by

```
yarn test
```

Tests cover all the components, reducers and actions. Each test (`*.test.js`) is placed next to its target file.

There is an extensive use of the [unexpected](https://github.com/unexpectedjs/unexpected) library and its supportive modules for testing. Thanks to that writing tests is simple as:
```jsx
it("should render default", () => {
  return expect(
    <Task {...props} />,
    "when mounted",
    "to exhaustively satisfy",
    <div id="1" className="Task">
      <div className="Task-text" contentEditable />
      <div className="Task-options">
        <span className="Task-options-complete">complete</span>
        <span className="Task-options-delete">delete</span>
      </div>
    </div>
  );
});
```

## Deployment

To build a `create-react-app` project run:

```
yarn build
```

All the production files are then stored in the `build/` folder.

Refer to the corresponding guides on how to create production builds for the app with [node](https://github.com/moubi/todo-board/tree/feature/node-server) or [php](https://github.com/moubi/todo-board/tree/feature/php-server) backend.

## Contributing
Any help related to Android support, bug fixes, new features or even a desktop version is welcome.
Contact me directly if you are interested in further project development.

## Authors

* [Miroslav Nikolov](https://webup.org)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Swipeable - for native like swiping effects
* [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - great drag and drop module for React
* [unexpected-dom](https://github.com/unexpectedjs/unexpected-dom) - easily test React components
