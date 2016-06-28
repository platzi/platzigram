var axios = require('axios');

async function loadAuth(ctx, next) {
  try {
    var whoami = await axios.get('/whoami').then(res => res.data)
    if (whoami.username) {
      ctx.auth = whoami;
    } else {
      ctx.auth = false;
    }
    next();
  } catch (err) {
    return console.log(err);
  }
}

exports.loadAuth = loadAuth;
