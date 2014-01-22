/*
*
*     /\  \          ___        /\  \
*    /::\  \        /\  \      /::\  \
*   /:/\:\  \       \:\  \    /:/\:\  \
*  /::\~\:\__\      /::\__\  /:/  \:\  \
* /:/\:\ \:|__|  __/:/\/__/ /:/__/_\:\__\
* \:\~\:\/:/  / /\/:/  /    \:\  /\ \/__/
*  \:\ \::/  /  \::/__/      \:\ \:\__\
*   \:\/:/  /    \:\__\       \:\/:/  /
*    \::/__/      \/__/        \::/  /
*     ~~                        \/__/
*      ___           ___                   ___           ___
*     /\  \         /\__\      ___        /\  \         /\  \
*    /::\  \       /:/  /     /\  \      /::\  \       /::\  \
*   /:/\ \  \     /:/  /      \:\  \    /:/\:\  \     /:/\:\  \
*  _\:\~\ \  \   /:/  /       /::\__\  /:/  \:\__\   /::\~\:\  \
* /\ \:\ \ \__\ /:/__/     __/:/\/__/ /:/__/ \:|__| /:/\:\ \:\__\
* \:\ \:\ \/__/ \:\  \    /\/:/  /    \:\  \ /:/  / \:\~\:\ \/__/
*  \:\ \:\__\    \:\  \   \::/__/      \:\  /:/  /   \:\ \:\__\
*   \:\/:/  /     \:\  \   \:\__\       \:\/:/  /     \:\ \/__/
*    \::/  /       \:\__\   \/__/        \::/__/       \:\__\
*     \/__/         \/__/                 ~~            \/__/
*
* A tiny jQuery plugin for slide panel navigation
* Created by Adam D. Scott (www.adamdscott.com)
* You may use bigSlide.js under the terms of the MIT License.
*/

(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {

    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'side': 'left',
      'menuWidth': '15.625em',
      'speed': '300'
    }, options);

    var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

    var positionOffScreen = {
      'position': 'fixed',
      'top': '0',
      'bottom': '0',
      'settings.side': '-' + settings.menuWidth,
      'width': settings.menuWidth,
      'height': '100%'
    };

    var animateSlide = {
      '-webkit-transition': '-webkit-transform ' + settings.speed + 'ms ease',
      '-moz-transition': '-moz-transform ' + settings.speed + 'ms ease',
      '-ms-transition': '-ms-transform ' + settings.speed + 'ms ease',
      '-o-transition': '-o-transform ' + settings.speed + 'ms ease',
      'transition': 'transform ' + settings.speed + 'ms ease'
    };

    function translatePosition(elem, val){
      var args = {
        '-webkit-transform': 'translateX(' + val + ')',
        '-moz-transform': 'translateX(' + val + ')',
        '-ms-transform': 'translateX(' + val + ')',
        '-o-transform': 'translateX(' + val + ')',
        'transform': 'translateX(' + val + ')'
      };
      elem.css(args);
    }

    menu.css(positionOffScreen);
    menu.css(animateSlide);
    push.css(animateSlide);

    menu._state = 'closed';

    menu.open = function() {
      menu._state = 'open';
      translatePosition(menu, '0');
      translatePosition(push, width);
    };

    menu.close = function() {
      menu._state = 'closed';
      translatePosition(menu, '-' + width);
      translatePosition(push, '0');
    };

    menuLink.on('click.bigSlide', function(e) {
      e.preventDefault();
      if (menu._state === 'closed') {
        menu.open();
      } else {
        menu.close();
      }
    });

    menuLink.on('touchend', function(e){
      menuLink.trigger('click.bigSlide');
      e.preventDefault();
    })

    return menu;

  };

}(jQuery));
