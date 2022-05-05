const http = require('http')
const fs = require('fs')

const PORT = 3010
let counter = 0

const server = http.createServer((req, res) => {

  if (req.url !== '/favicon.ico') {
    console.log('Number of requests', counter++)
  }

  switch(req.url) {
    case '/':
      res.write('Home page')
      break
    case '/courses':
      res.write('Courses')
      break
    case '/students':
      res.write('Students')
      break
    case '/favicon.ico':
      const favicon = fs.readFileSync('./favicon.ico')
      res.write(favicon)
      break
    default:
      res.write('404 Not found')
      break
  }

  res.write(', IT course')
  res.end()
  
})

server.listen(PORT, () => {
  console.log('listen port ' + PORT);
})