const http = require('http')
const ShareDB = require('sharedb')
const WebSocket = require('ws')
const WebSocketJSONStream = require('websocket-json-stream')

// Start ShareDB
const share = ShareDB()

// Create a WebSocket server
const server = http.createServer()
const wss = new WebSocket.Server({server})
server.listen(8080)
console.log('Listening on http://localhost:8080')

wss.on('connection', function (ws, req) {
  const stream = new WebSocketJSONStream(ws)
  share.listen(stream)
})
