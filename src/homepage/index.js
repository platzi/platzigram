var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var Webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, asyncLoad, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = document.getElementById('picture-preview')
  const camaraInput = document.getElementById('camara-input')
  const cancelPicture = $('#cancelPicture');
  const shootButton = $('#shoot');
  const uploadButton = $('#uploadButton')

  function reset() {
    picturePreview.classList.add('hide');
    camaraInput.classList.remove('hide');
    cancelPicture.addClass('hide');
    shootButton.removeClass('hide');
    uploadButton.addClass('hide');
  }

  cancelPicture.click(reset);

  $('.modal-trigger').leanModal({
    ready: function () {
      Webcam.attach('#camara-input')
      shootButton.click(() => {
        Webcam.snap((data_uri) => {
          picturePreview.innerHTML = `<img src="${data_uri}"/>`;
          picturePreview.classList.remove('hide');
          camaraInput.classList.add('hide');
          cancelPicture.removeClass('hide');
          shootButton.addClass('hide');
          uploadButton.removeClass('hide')
          uploadButton.off('click')
          uploadButton.click(() => {
            const pic = {
              url: data_uri,
              likes: 0,
              liked: false,
              createdAt: +new Date(),
              user: {
                avatar: "https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767",
                username: "slifszyc"
              }
            }
            $('#picture-cards').prepend(picture(pic));
            reset();
            $('#modalCamara').closeModal();
          });
        });
      })
    },
    complete: function () {
      Webcam.reset()
      reset()
    }
  });
})

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