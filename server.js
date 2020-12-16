const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json');
const db = low(adapter)

var jsonServer = require('json-server')
var server = jsonServer.create()

const router = jsonServer.router(db)
var middlewares = jsonServer.defaults()

const routes = require('./routes.json');

const delay = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

server.use(middlewares)

server.use(jsonServer.bodyParser)

// If you need to scope this behaviour to a particular route, use this
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    console.log('\x1b[32m','Converts POST to GET and move payload to query params')
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request

    req.method = 'GET'
    req.query = req.body
    if (req.url === '/alfajores') {
      const currentAlfajoressArray = db.get('alfajores').value();
      const nextAlfajorID = currentAlfajoressArray.length + 1; // Following the secuantial logic in other events
      const alfajor = { ...req.body, id:nextAlfajorID }
      console.log('\x1b[36m%s\x1b[0m','creating a new event...', alfajor);
      db.get('alfajores').push({ ...alfajor }).write();
      delay(3).then(() => next());
      return;
    }

  }

  next()
})

// Add this before server.use(router)
server.use(jsonServer.rewriter(routes))

server.use(router)

server.listen(3000, function () {
  console.log('\x1b[32m','JSON Server is running')
});