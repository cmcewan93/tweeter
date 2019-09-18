 /*
  * Creates a new Tweet element for dom using a given JSON object
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
                ${convertDate(tweetObj.created_at)}
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


const convertDate = (dateobj) => {
  let date = new Date(parseInt(dateobj));
  let fdate = (date.getMonth() + 1)+'/'+ date.getDate()  +'/'+date.getFullYear()
  return fdate;
}
$(document).ready( function() {
  /*
   * Displays the Compose Tweet container after clicking the
   * arrow on on NAV bar
   */

  $(".nav-down-button").on('click', function(e) {
    e.preventDefault();
    $("#tweet-container").slideToggle();
  });

  /*
   * Submit button stores input and returns validity check
   */

  const $button = $(".tweet-form");
  $button.on('submit', function (event) {
    event.preventDefault();
    let input = $($button).serialize();
    let validData = validateForm(input);

    /*
     * If object is valid remove previous alerts
     and perform post request otherwise display corresponding alert
     */

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

/*
 * Adds tweet to storage via /tweets route/
 */

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

/*
 * Renders all tweets on page
 */

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

/*
 * Perforoms a validity check on user inputed form data and returns
 * and object with corresponding error data.
 */

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

/*
 * Prevents xss scripting by escaping any illegitimate characters
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

