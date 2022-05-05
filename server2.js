const http = require('http')
const fs = require('fs')

const PORT = 3010

const delay = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject('Error 500')
      else resolve(data)
    })
  })
}

const server = http.createServer(async (req, res) => {

  switch(req.url) {
    case '/':
      try {
        const home = await readFile('./pages/home.html')
        res.write(home)
        res.end()
        //callback case
        // fs.readFile('./pages/home.html', (err, data) => {
        //   if (err) res.write('Error 500')
        //   else res.write(data)
        //   res.end()
        // })
      } catch (error) {
        res.write('505 error')
        res.end()
      }
      break
    case '/about':
      try {
        await delay(5000)
        const about = await readFile('./pages/about.html')
        res.write(about)
        res.end()
      } catch (error) {
        res.write('505 error')
        res.end()
      }
      break
    case '/favicon.ico':
      fs.readFile('./favicon.ico', (err, data) => {
        if (err) return
        res.write(data)
        res.end()
      })
      break
    default:
      res.write('404 Not found')
      res.end()
      break
  }
})

server.listen(PORT, () => {
  console.log('listen port ' + PORT);
})