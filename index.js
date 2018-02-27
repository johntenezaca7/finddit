import reddit from './redditAPI';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//Form Event Listener
searchForm.addEventListener('submit', e => {
    e.preventDefault();
   
    //Get search term
    const searchTerm = searchInput.value;

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    // Get Limit
    const searchLimit = document.getElementById('limit').value;
  
    //Check Input

    if(searchTerm === '') {
        //Show message
        showMessage('Please add a search term!', 'alert-danger')
    }

    //Clear input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            let output = '<div class="card-columns">';
            //Loop through posts

            results.forEach(post => {
                //Check for image;
                const image = post.preview ? post.preview.images[0].source.url : 'https://marketingland.com/wp-content/ml-loads/2014/07/reddit-combo-1920-800x450.png';
                output += `
                <div class="card" >
                    <img class="card-img-top" src=${image} alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">${truncateText(post.title, 50)}...</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href=${post.url} target="_blank" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class="badge badge-secondary"> Subreddit: ${post.subreddit} </span>
                    <span class="badge badge-dark"> Score: ${post.score} </span>
                    </div>
                </div>
                `
            })
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        })

});

//Show Message

function showMessage(message, className) {
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get Parent 
    const searchContainer = document.getElementById('search-container');
    //Get Search
    const search = document.getElementById('search');

    //Insert Message
    searchContainer.insertBefore(div, search);
    
    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
//Truncate Text

function truncateText(text, limit) {
    const shortend = text.indexOf(' ', limit);

    if(shortend == -1) return text;
    return text.substring(0, shortend);
}