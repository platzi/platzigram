'use strict'

const config = {
  aws: {
    bucket: process.env.AWS_BUCKET || 'platzigram',
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  client: {
    endpoints: {
      pictures: 'http://api.platzigram.com/picture',
      users: 'http://api.platzigram.com/user',
      auth: 'http://api.platzigram.com/auth'
    }
  },
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://platzigram.com/auth/facebook/callback'
    }
  },
  secret: process.env.PLATZIGRAM_SECRET || 'pl4tzi', // never use default
  segment: {
    writeKey: process.env.SEGMENT_WRITE_KEY
  }
}

// For development use local micro instances
if (process.env.NODE_ENV !== "production") {
  config.client.endpoints = {
    pictures: 'http://localhost:5000',
    users: 'http://localhost:5001',
    auth: 'http://localhost:5002'
  }

  // incluye tus keys y secrets aquí
  config.auth.facebook.clientID = '...';
  config.auth.facebook.clientSecret = '...';
  config.auth.facebook.callbackURL = 'http://localhost:5050/auth/facebook/callback'

  config.aws.accessKey = '...';
  config.aws.secretKey = '...';
  config.aws.bucket = '...';

  config.segment.writeKey = '...';
}

module.exports = config
