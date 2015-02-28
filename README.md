# prequest
[![Build Status](https://travis-ci.org/alyssaq/prequest.png?branch=master)](https://travis-ci.org/alyssaq/prequest)

Promisified HTTP requests with [`bluebird`](https://github.com/petkaantonov/bluebird/blob/master/API.md) and [`request`](https://github.com/mikeal/request) modules.

## Grab it

    $ npm install prequest

## prequest usage
#### GET example
With this wrapper, we can easily make requests and catch any http failures in a promise's catch. By default, method is `GET`:
```js
var prequest = require('prequest');

prequest('http://localhost:4567/api').then(function (body) {
  console.log('Success!');
}).catch(function (err) { // Any HTTP status >= 400 falls here
  console.error('Failed.', err.statusCode, ' >= 400');
});

```

If you need the full response (e.g. to view headers), specify `arrayResponse: true` to have the response and body in an array. You may use bluebird's `spread` to access the items directly:
```js
prequest({
  url:'http://localhost:4567/api',
  arrayResponse: true
}).spread(response, body) {
  console.log('Success!', response.headers, body);
});
```

#### POST example
All options supported by [`request`](https://github.com/mikeal/request) can be supplied to prequest.
By default, `json: true` is enabled to set body payload as a JSON representation. If you do not want this, simply override it to false.
```js
var prequest = require('prequest');

prequest({
  method: 'POST',
  url:'http://localhost:4567/api',
  body: {
    someData: [1, 2, 3]
  }
}).then(body) {
  console.log('Success!',  body);
}).catch(function (err) { // Any HTTP status >= 400 falls here
  console.error('Failed.', err.statusCode, ' >= 400');
});
```

To use the other methods: [delete, patch, head], specify it in method.

## Testing

To run the tests:

    $ npm install
    $ npm test

## The past, without prequest
Without this wrapper, a common pattern to `promisify` requests:
```js
var Promise = require('bluebird');
var prequest = Promise.promisify(require('request'));

prequest(url).then(function (response) {
  if (reponse.statusCode === 200) {
    // continue;
  } else if (reponse.statusCode >= 500) {
    // handle this error case
  } else if (reponse.statusCode >= 400) {
    // you get the point...
  }
}).catch(function (err) {
  console.error(err);
  // network issue
})
```
## Contribute
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
[MIT](http://alyssaq.github.io/mit-license/)
