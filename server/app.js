import express from "express"
import path from "path"
import history from "connect-history-api-fallback"
import helmet from "helmet"
import compression from "compression"

const app = express()
const fileCompiledDir = "dist"

app.use(helmet())
app.use(compression())
app.use(history())

app.use(express.static(fileCompiledDir))

const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.resolve(fileCompiledDir + "/index.html"))
})

app.use(router)

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({ ok: false, statusCode: statusCode, message: err.message })
  next()
})

export default app
