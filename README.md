# week5_day1

> Node | Basic Authorization, Authentication & Sessions


## Main points: session management

To manage authorization and sessions in an Ironlauncher, you need to:
1. Install `bcryptjs`, `express-session` and `connect-mongo` 2.
2. Include the `SESS_SECRET` key in the `.env` file.
3. Include the `session.config.js` file in the `configs` directory and link it to `app.js` via `require("./config/session.config")(app)`.

The `express-session` and `mongo-store` dependencies provide configurations that allow managing user sessions:
- The `req.session.currentUser` property stores the identified user.
- The `req.session.destroy()` method closes the session.


## Main points: *custom middlewares*.
- The *middlewares* are intermediate processes that the server assumes on each request before routing it.
- In the case of *custom middlewares*, it is possible to create them through a callback that, argued to the `.use()` method of Express, has access to the `res`, `req` objects and the `next()` method.
- The `next()` method allows to leave the middleware and continue with the execution of the script:
  ````javascript
  app.use((req, res, next) => {
    console.log("---- MIDDLEWARE EXECUTED -----")
    next()
  })
  ````
- It is possible to create middlewares in a separate file, export and import them where needed:
  ````javascript
  // any-middleware.js
  const myMiddleware = (req, res, next) => {
    console.log("---- MIDDLEWARE EXECUTED -----")
    next()
  }
  module.exports = { myMiddleware }
  ````
  ````javascript 
  // any-routes.js
  const { myMiddleware } = require('./../middleware/any-middleware')
  ````
- Also, they can be included between routes or as part of a route, by arguing it between the endpoint and the callback:
  ````javascript
  // any-routes.js
  app.get('/endpoint', myMiddleware, (req, res, next) => res.render('any-view'))
  ````
  
## Main points: session check
Through a _custom middleware_ it is possible to limit access to certain paths for unidentified users:
````javascript
const isLoggedIn = (req, res, next) => req.session.currentUser ? next() : res.render('forbidden')

module.exports = { isLoggedIn }
```
