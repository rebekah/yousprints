$(function(){
    if (window.location.pathname.match(/^\/users\/sign_in$/))
      adjustSignInForm();
})

function adjustSignInForm(){
  $('input[value = "Sign in"]').css('margin-top','20px');
  $('label:contains("Remember me")').css('display','inline').css('clear','right').css('position','relative').css('top','5px');
}
