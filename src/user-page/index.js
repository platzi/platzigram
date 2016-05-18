/**
 * Module dependencies
 */

import page from 'page';
import template from './template';
import title from 'title';
import empty from 'empty-element';
import header from '../header';

page('/:username', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.user.username}`);
  empty(main).appendChild(template(ctx.user));
});

async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
    next();
  } catch (err) {
    console.log(err);
  }
}