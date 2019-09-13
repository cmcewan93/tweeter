/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /**
  * returns a tweet article element
  */
const createTweetElement = (tweetObj) => {

 const $tweet = `
            <article class="tweet-display">
            <header class="tweet-header">
              <div class="tweet-header-left">
                <img class='tweet-profile-pic' src="${tweetObj.user.avatars}"/> 
                <span class='tweet-full-name'>
                ${tweetObj.user.name}
                </span>
             </div>
              <span class="tweet-handle">
                ${tweetObj.user.handle}
              </span>
            </header>
            <div class="tweet-message">
              ${escape(tweetObj.content.text)}
            </div>
            <footer class="tweet-footer">
              <span>
                ${tweetObj.created_at}
              </span>
              <span class="tweet-logos">
                  <i class="fab fa-font-awesome-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
              </span>
            </footer>
            </article>
  `
  return $tweet;
}

$(document).ready( function() {

  $(".nav-down-button").on('click', function(e) {
    console.log('NAV CLICK')
    e.preventDefault();
    $("#tweet-container").slideToggle();
  });

  const $button = $(".tweet-form");
  $button.on('submit', function (event) {
    event.preventDefault();
    let input = $($button).serialize();
    let validData = validateForm(input);

    if(validData.valid === true) {
      if($(".alert")) {
        $(".alert").slideUp();
      }
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: input,
        success:  () => {
          let test = $("#tweets-container");
          addTweet(test);
        }
      })
    } else if (validData.valid === false)  {
      if($(".alert")) {
        $(".alert").remove();
      }
      let newError = validData.errorHTML;
      $("#tweet-container").prepend(newError); 
    }  
  });
  loadTweets();
});

const addTweet = (element) => {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'JSON'
  })
  .then(function (data) {
    let tweet = createTweetElement(data[data.length -1]);
    $(element).prepend(tweet);
  })
}

const loadTweets = () => {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'JSON'
  })
  .then(function (data) {
    renderTweets(data);
  })
}

const renderTweets = (tweets) => {
  for(tweet of tweets) {
    let $newTweet = createTweetElement(tweet);
    $('#tweets-container').prepend($newTweet); 
  }
}

const validateForm = (data) => {

  let error = {
    message: '',
    valid: true,
    errorHTML: ''
  }
  if(data.length <= 5) {
    error.message = 'Invalid input! You need to enter some text!';
    error.valid = false;
    error.errorHTML =  `<span class="alert">${error.message}</span>`
  } else if (data.length > 145) {
    error.message = "The tweet you entered is too long!",
    error.valid = false;  
    error.errorHTML =  `<span class="alert">${error.message}</span>`
  } 
  return error;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

