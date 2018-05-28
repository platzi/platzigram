'use strict'

import fixtures from '../fixtures/'

export default class Db {
  connect () {
    return Promise.resolve(true)
  }

  disconnect () {
    return Promise.resolve(true)
  }

  getImage (id) {
    return Promise.resolve(fixtures.getImage())
  }

  getImages () {
    return Promise.resolve(fixtures.getImages())
  }

  getImagesByTag () {
    return Promise.resolve(fixtures.getImagesByTag())
  }

  getImagesByUser (username) {
    return Promise.resolve(fixtures.getImages())
  }

  saveImage (image) {
    return Promise.resolve(fixtures.getImage())
  }

  likeImage (image) {
    image = fixtures.getImage()
    image.liked = true
    image.likes = 1
    return Promise.resolve(image)
  }

  saveUser (user) {
    return Promise.resolve(fixtures.getUser())
  }

  getUser (username) {
    return Promise.resolve(fixtures.getUser())
  }

  authenticate (username, password) {
    return Promise.resolve(true)
  }
}
