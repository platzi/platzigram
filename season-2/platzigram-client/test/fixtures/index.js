'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getImage () {
    let id = uuid.uuid()
    return {
      description: 'an #awesome picture with #tags #platzi',
      tags: [ 'awesome', 'tags', 'platzi' ],
      url: `https://platzigram.test/${uuid.v4()}.jpg`,
      likes: 0,
      liked: false,
      userId: uuid.uuid(),
      publicId: uuid.encode(id),
      id: id,
      createdAt: new Date().toString()
    }
  },
  getImages (n) {
    let images = []
    while (n-- > 0) {
      images.push(this.getImage())
    }

    return images
  },
  getUser () {
    return {
      id: uuid.uuid(),
      name: 'A random user',
      username: `user_${uuid.v4()}`,
      createdAt: new Date().toString()
    }
  }
}

module.exports = fixtures
