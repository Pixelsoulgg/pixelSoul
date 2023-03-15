import { NextFunction, Request, Response } from 'express'
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible'
import TooManyRequestException from '../exceptions/too-many-request'

const MAX_REQUEST_LIMIT = 100
const MAX_REQUEST_WINDOW = 1 * 60 // Per 1 minutes by IP

const options: IRateLimiterOptions = {
  duration: MAX_REQUEST_WINDOW,
  points: MAX_REQUEST_LIMIT
}

const rateLimiter = new RateLimiterMemory(options)

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string | undefined
  const consume = apiKey || req.ip
  rateLimiter
    .consume(consume)
    .then((rateLimiterRes) => {
      res.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000)
      res.setHeader('X-RateLimit-Limit', MAX_REQUEST_LIMIT)
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints)
      res.setHeader(
        'X-RateLimit-Reset',
        new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString()
      )
      next()
    })
    .catch(() => {
      next(new TooManyRequestException())
    })
}
