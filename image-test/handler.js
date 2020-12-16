'use strict'
const { createCanvas } = require('canvas')

module.exports = async (event, ctx) => {
  const result = {
    'status': 'Received input: ' + JSON.stringify(event.body)
  }

  const context = canvas.getContext('2d')

  const text = 'Hello, OpenFaaS!'
  context.textBaseline = 'top'
  context.fillStyle = '#3574d4'
  const textWidth = context.measureText(text).width
  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
  context.fillStyle = '#fff'
  context.fillText(text, 600, 170)

  const buffer = canvas.toBuffer('image/png')

  return ctx
    .status(200)
    .headers({"Content-Type": "image/png"})
    .succeed(buffer)
}

