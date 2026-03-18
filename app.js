'use strict'

//=================================================
// DOM referenced image elements from html by id  |
//================================================

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

// for button
const resetBtn = document.getElementById('resetBtn');

// for results and containers
const resultsDiv = document.getElementById('results');
const resultsContainer = document.getElementById('results_Container');

//==========================
// constructor for images  |
//=========================
// only fileName is passed as argument becasue the other property values are known / initialized within constructor (0), imagePath derived from filename; leading to shorter instace creation

function Product(fileName) {
  this.fileName = fileName;
  this.imagePath = `img/${fileName}`;
  this.timesShown = 0;
  this.timesClicked = 0;

  Product.allProducts.push(this);
};

//=============================
// static array for products  |
// =========================== 
// will receive data from new Products thanks to last line in constructor function (push)

Product.allProducts = [];

//==================================
// current item displayed tracker  |
//=================================
// renderProducts() fills with current images & click handler checks which was clicked

let currentProducts = [];

//========================================
// array to store previous round images  |
//=======================================

let previousIndexes = [];

//=========================================
// round counter / tracker for 25 rounds  |
//========================================

let totalVotes = 0;

//=====================================
// storing chart to destroy it later  |
//====================================

let resultsChart = null;

//===================
// product objects  |
// =================
// ;no variables since stored inside array as indexes

new Product('bag.jpg');
new Product('banana.jpg');
new Product('bathroom.jpg');
new Product('boots.jpg');
new Product('breakfast.jpg');
new Product('bubblegum.jpg');
new Product('chair.jpg');
new Product('cthulhu.jpg');
new Product('dog-duck.jpg');
new Product('dragon.jpg');
new Product('pen.jpg');
new Product('pet-sweep.jpg');
new Product('scissors.jpg');
new Product('shark.jpg');
new Product('sweep.png');
new Product('tauntaun.jpg');
new Product('unicorn.jpg');
new Product('water-can.jpg');
new Product('wine-glass.jpg');

//=================================
// render images on html function |
//================================

function renderProducts() {

  // generates three random selections within product array
let index1 = Math.floor(Math.random() * Product.allProducts.length);
let index2 = Math.floor(Math.random() * Product.allProducts.length);
let index3 = Math.floor(Math.random() * Product.allProducts.length);

while ( //checks image does not match any other current image
  index1 === index2 ||
  index1 === index3 ||
  index2 === index3 ||
  // checks previous images
  previousIndexes.includes(index1) ||
  previousIndexes.includes(index2) ||
  previousIndexes.includes(index3)
) {   // reroll for new images, if needed*
  index1 = Math.floor(Math.random() * Product.allProducts.length);
  index2 = Math.floor(Math.random() * Product.allProducts.length);
  index3 = Math.floor(Math.random() * Product.allProducts.length);
}

  //covert array index into objects
  let product1 = Product.allProducts[index1];
  let product2 = Product.allProducts[index2];
  let product3 = Product.allProducts[index3];

  // stores products / images shown in global array; will be used to remember products shown
  currentProducts = [product1, product2, product3];

  //displays by appending to src then image path
  img1.src = product1.imagePath;
  img2.src = product2.imagePath;
  img3.src = product3.imagePath;

  //counter to increase times shown
  product1.timesShown++;
  product2.timesShown++;
  product3.timesShown++;

  // storing previous indexes
  previousIndexes = [index1, index2, index3];
};

//=====================================================
// DOM referenced container elements from html by id  |
//====================================================

const productContainer = document.getElementById('product_Container');

// event listener; run handleClick() anytime image receives a click. reset semantic

productContainer.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetVoting);

//====================
// results function  |
//===================

function showResults() {

  // reference div element id from html
  resultsDiv.innerHTML = '';

  // clears list when new voting happens 
  resultsDiv.innerHTML = '';

  // create list container / element
  const ul = document.createElement('ul');

  // loop through every product in array
  for (let product of Product.allProducts) {

    // create list item
    const li = document.createElement('li');

    // fill li with results combined from constructor, make bold
    li.innerHTML = `<strong>${product.fileName}</strong>: ${product.timesClicked} votes, shown ${product.timesShown} times`;
    // add list item to list
    ul.appendChild(li);
  }

  // add the list to the div
  results.appendChild(ul);
};

//==================
// chart function  |
//=================

function renderChart() {

  // empty arrays for chart data
  const labels = [];
  const votes = [];
  const views = [];

  // loops through every product object to extract data and feed Chart.js; removes extension
  for (let product of Product.allProducts) {
    labels.push(product.fileName.split('.')[0]); // push
    votes.push(product.timesClicked); // vote count
    views.push(product.timesShown); // view count
  }

  const ctx = document.getElementById('resultsChart').getContext('2d');

  // destroy old chart BEFORE creating a new one
  if (resultsChart) {
    resultsChart.destroy();
  }

  // new chart object; 
  resultsChart = new Chart(ctx, {
    type: 'bar', // will try different style (once i get first one working) to test accessibility
    data: { // 'empty' arrays to supply data
      labels: labels, // x-axis
      datasets: [
        {
          label: 'Votes', // bar series
          data: votes,
          backgroundColor: 'rgba(28, 19, 209, 0.7)', // purple
        },
        {
          label: 'Times Viewed', // 2nd bar series
          data: views,
          backgroundColor: 'rgba(83, 71, 47, 0.7)', // gray
        }
      ]
    },
    options: { // config settings
      responsive: true,
      maintainAspectRatio: false, //lets chart grow vertically

      plugins: {
        title: {
          display: true,
          text: 'Odd Duck Product Results',
          font: {
            size: 22
          }
        },
        legend: { //control over "Votes / Times viewed"
          labels: {
            font: {
              size: 14
            }
          }
        }
      },

      scales: { // cntrol over product names
        x: {
          ticks: {
            font: {
              size: 20
            }
          }
        },
        y: { //control over numbers
          ticks: {
            font: {
              size: 16
            }
          }
        }
      }
    }
  });
};

//=================
// click handler  |
//================

function handleClick(event) {

  // only repsonds if click happens on an image
  if (event.target.tagName !== 'IMG') {
    return;
  }

  // count (up to 25)
  totalVotes++;

  // identify which picture was clicked; currentProducts = array of three from renderProducts(); add tally to product chosen
  for (let product of currentProducts) {
    if (event.target.src.includes(product.fileName)) {
      product.timesClicked++;
    }
  }

  // less than 25? run renderProducts() again; else, stop voting (removes evemtListener)
  if (totalVotes < 25) {
    renderProducts();
  } else {
    productContainer.removeEventListener('click', handleClick);
    showResults();
    renderChart();
    console.log('Voting finished');
  }
};

//=========================
// button reset funvtion  |
//========================

function resetVoting() {

  resultsContainer.style.display = 'none';

  // resets vote counter
  totalVotes = 0;

  // resets previous round tracker
  previousIndexes = [];

  // resets product stats
  for (let product of Product.allProducts) {
    product.timesClicked = 0;
    product.timesShown = 0;
  }

  // clears result list
  document.getElementById('results').innerHTML = '';

  // clears chart
  if (resultsChart) {
    resultsChart.destroy();
    resultsChart = null;
  }

  // allows re-clicking
  productContainer.removeEventListener('click', handleClick);
  productContainer.addEventListener('click', handleClick);

  // renders new images
  renderProducts();

  // console msg confirmation

  console.log('Voting has begun anew.')
}


//======================================================
// starts the program, load images, and results after  |
//=====================================================

renderProducts();

resultsContainer.style.display = 'none';

// if it were to run right away as soon as page loads, result would be 'two' lists being displayed. function already included within handleClick(); line 141
// showResults();