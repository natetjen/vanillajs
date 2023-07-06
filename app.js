axios.get('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
  .then((res) => {
    console.log(res.data)
    let eachCard = res.data;
    var cardContainer = document.querySelector('.card-container');
    eachCard.forEach((card) => {
      let thisCard = createCard(card);
      cardContainer.append(thisCard)
    })
  })
  .catch((err) => {
    console.log(err)
  })

function createCard(data) {
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  }

  // Create the card
  const card = document.createElement('div');
  card.classList.add('card');

  // Category
  const category = document.createElement('div');
  category.classList.add('category');
  category.textContent = 'CLOUD AND SERVER';

  // Contain
  const contain = document.createElement('div');
  contain.classList.add('contain');

  const title = document.createElement('a');
  title.textContent = data.title.rendered;
  title.href = data.link;
  title.classList.add('title');

  const image = document.createElement('img');
  image.src = data.featured_media;

  const authDate = document.createElement('div');
  authDate.classList.add('authDate');

  const author = data._embedded.author[0].name;
  const authorLink = data._embedded.author[0].link;
  const date = formatDate(data.modified);

  const by = document.createElement('text');
  const textDate = document.createElement('text');
  const authorElement = document.createElement('a');

  by.textContent = 'By ';
  textDate.textContent = ' on ' + date;
  authorElement.textContent = author;
  authorElement.href = authorLink;

  authDate.appendChild(by);
  authDate.appendChild(authorElement);
  authDate.appendChild(textDate);

  const excerptContainer = document.createElement('div');
  excerptContainer.classList.add('excerptContainer');
  const excerpt = data.excerpt.rendered;
  excerptContainer.innerHTML = excerpt;

  const readMore = document.createElement('button');
  readMore.classList.add('readMore');
  readMore.textContent = 'Read More';
  excerptContainer.appendChild(readMore);

  card.appendChild(category);
  card.appendChild(contain);
  contain.appendChild(image);
  contain.appendChild(title);
  contain.appendChild(authDate);
  card.appendChild(excerptContainer);

  // Add click event listener to the "Read More" button
  readMore.addEventListener('click', () => {
    openModal(data.content.rendered);
  });

  return card;
}

// Get the modal element
const modal = document.getElementById('myModal');

// Get the modal content element
const modalContent = document.getElementById('modalContent');

// Get the close button element
const closeButton = document.getElementsByClassName('close')[0];

// Function to open the modal and populate the content
function openModal(content) {
  modal.style.display = 'block';
  modalContent.innerHTML = content;
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Add click event listener to the close button
closeButton.addEventListener('click', closeModal);
