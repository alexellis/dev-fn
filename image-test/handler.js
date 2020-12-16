'use strict'
let Jimp = require('jimp')

module.exports = handler; 

async function handler(event, ctx) {
  let image = await new Jimp(800, 418, 'white')
  
  let message = 'Hello OpenFaaS!'
  let x = 10
  let y = 10

  await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
    .then(font => {
      image.print(font, x, y, message)
      return image
    })

  let buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  return ctx
    .status(200)
    .headers({"Content-Type": "image/png"})
    .succeed(buffer)
}
