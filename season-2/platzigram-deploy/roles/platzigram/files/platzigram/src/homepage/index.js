var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var picture = require('../picture-card');
var axios = require('axios');
var io = require('socket.io-client')
var utils = require('../utils')

var socket = io.connect('http://localhost:5151') // use envify

page('/', utils.loadAuth, header, loading, loadPicturesAxios, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));
})

socket.on('image', function (image) {
  var picturesEl = document.getElementById('pictures-container')
  var first = picturesEl.firstChild
  var img = picture(image)
  picturesEl.insertBefore(img, first)
})

function loading(ctx, next) {
  var container = document.createElement('div');
  var loadingEl = document.createElement('div');
  container.classList.add('loader-container');
  loadingEl.classList.add('loader');
  container.appendChild(loadingEl);
  var main = document.getElementById('main-container');
  empty(main).appendChild(container);
  next();
}

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}
