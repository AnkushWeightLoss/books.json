// Global variable to store books
let globalBooksData = [];

// Arrow function for debugging
const debugLog = (message) => {
    console.log(`DEBUG: ${message}`);
};

// Custom function to create book card
const createBookCard = (book) => {
    // Using template literals and destructuring
    const { title, author, publicationYear, coverImage } = book;
    
    return `
        <div class="book-card">
            <img src="${coverImage}" alt="${title} cover" onerror="this.src='https://via.placeholder.com/200x300'">
            <div class="book-info">
                <h2>${title}</h2>
                <p>Author: ${author}</p>
                <p>Published: ${publicationYear}</p>
            </div>
        </div>
    `;
};

// Async function with Promises to fetch books
const fetchBooks = () => {
    // Replace with your actual GitHub Pages raw JSON URL
    const jsonUrl = ' https://ankushweightloss.github.io/books.json/';
    
    return new Promise((resolve, reject) => {
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                globalBooksData = data; // Global scope assignment
                debugLog(`Fetched ${data.length} books`);
                resolve(data);
            })
            .catch(error => {
                debugLog(`Fetch error: ${error.message}`);
                reject(error);
            });
    });
};

// Function to render books to the DOM
const renderBooks = (books) => {
    const bookContainer = document.getElementById('bookContainer');
    
    // Clear existing content
    bookContainer.innerHTML = '';
    
    // Use map and join to create book cards
    const bookCards = books.map(createBookCard).join('');
    
    bookContainer.innerHTML = bookCards;
};

// Initialization function using Promises
const initializeBookCollection = () => {
    fetchBooks()
        .then(renderBooks)
        .catch(error => {
            const bookContainer = document.getElementById('bookContainer');
            bookContainer.innerHTML = `<p>Error loading books: ${error.message}</p>`;
        });
};

// Event listener to initialize on page load
document.addEventListener('DOMContentLoaded', initializeBookCollection);