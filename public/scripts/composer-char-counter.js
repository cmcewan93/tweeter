/*
 * Code for character counter in compose tweet area.
 */

$(document).ready(function() {
  $('.tweet-area').on('input', function () {
    let val = 140 - $(this).val().length;
    if (val < 0) {
      $($('.counter').text(val)).css("color", "red");
    } else {
      $($('.counter').text(val)).css("color", "");
    } 
  });
});
