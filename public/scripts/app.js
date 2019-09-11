/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /**
  * returns a tweet article element
  */
const createTweetElement = (tweetObj) => {
  // let $tweet = $("<article>").addClass("tweet-display");

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
              ${tweetObj.content.text}
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

const renderTweets = function(tweets) {
  for(tweet of tweets) {
    let $newTweet = createTweetElement(tweet);
    $('#tweets-container').append($newTweet); 
  }
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like

$(document).ready( function() {
  renderTweets(tweetData);
})