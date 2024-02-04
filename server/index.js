import Express from 'express'

const app = new Express()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})


app.listen(process.env.PORT || 3000, () => {
  console.log('Server started at http://localhost:3000')
})
