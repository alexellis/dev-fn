'use strict'
const TweetFetch = require("tweet-fetch")
const fs = require('fs')
const fsPromises = fs.promises

module.exports = async (event, context) => {
  if(!event.query['q']) {
    return context.headers({'Content-type': 'text/plain', "Access-Control-Allow-Origin": "http://localhost:8000"})
            .status(400)
            .fail('Give a Twitter URL with ?q=https://twitter.com/alexellisuk/status/1338979828746358790?s=20')
  }

  let consumerKey = await fsPromises.readFile('/var/openfaas/secrets/consumer-key', 'utf8')
  let consumerSecret = await fsPromises.readFile('/var/openfaas/secrets/consumer-secret', 'utf8')
  let accessTokenKey = await fsPromises.readFile('/var/openfaas/secrets/access-token-key', 'utf8')
  let accessTokenSecret = await fsPromises.readFile('/var/openfaas/secrets/access-token-secret', 'utf8')

  
  let tweetURL = event.query['q'].toLowerCase()
  
  const tweetFetch = new TweetFetch({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  })
  
  let res = await tweetFetch.get(tweetURL)  

  let text = res.full_text
  let avatar = res.user.profile_image_url_https

  return context
    .status(200)
    .succeed({
      original: res,
      custom: {
        text: text,
        avatar: avatar
      }
    })
}

