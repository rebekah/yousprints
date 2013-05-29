// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .
$(function() {

  if (window.location.pathname.match(/^\/$/)) {
     moveLoginForm();
  }

})

// repositions and redisplays the user log in form used on the landing page
function moveLoginForm(){
  $('form#new_user fieldset div').eq(4).remove();
  $('form#new_user fieldset label').removeClass();
  $('form#new_user fieldset input').not($('.btn')).removeClass();
  $('form#new_user fieldset label').addClass('inline');
  $('form#new_user fieldset input').not($('.btn')).addClass('inline landing_login_textbox');
  $('form#new_user fieldset label').eq(0).html('username*');
  $('form#new_user fieldset label').eq(1).html('password*');
  keepLoginFormHTML = $('form#new_user').eq(1).html();
  $('form#new_user').eq(1).remove();
  newLoginFormHTML = keepLoginFormHTML.replace(/<div.*?\>/g,"").replace(/\<\/div\>/g,"");
  $('form#new_user').prepend(newLoginFormHTML);
}
