# odd_duckz / Odd Duck Voting App

A data-driven UI experiment with persistent state, user interaction tracking, and visualization.  

This project simulates a product research tool used by marketing teams to measure user preference through repeated exposure and interaction tracking.  
Users vote on product images, while the application tracks impressions and selections, persisting data across sessions and visualizing results.

votes, votez, VOTES!

## Features

- Randomized product voting.
- Tracks user interaction data (clicks + impressions) in real time.
- Data persistence with `localStorage` across sessions using browser storage.
- Prevents selection bias by avoiding repeating images display.
- Dynamically rendered & interactive charts through use of Chart.js.
- Clean reset of state for controlled experiment cycles.

## Highlights

- Object-oriented architecture using constructor functions; (`Product`).
- State management via a centralized `Product.allProducts` array.
- Custom randomization algorithm preventing duplicate selections (`renderProducts`, `previousIndexes`).
- Data persistence using localStorage + JSON serialization/deserialization; `loadFromLocalStorage`, `saveToLocalStorage`.
- Rehydration of persisted data into fully functional object instances through constructor reconstruction (`loadFromLocalStorage` constructor loop).
- Event-driven UI updates with DOM event listeners (`handleClick`, `addEventListener`).
- Dynamic DOM rendering for displaying results (`showResults`).
- Chart rendering lifecycle management with destroy/recreate logic (`renderChart`, `resultsChart.destroy()`).

## Learned

- Managing application state.
- Persisting data across sessions.
- Reconstructing objects from JSON.

## Live Demo

[View Site](https://tonch-liv.github.io/odd_duckz/)

## Screenshots

might delete idk
(include your chart + lighthouse score)

- 03.10.26
  - added base files (html, css, js, json).
  - added image assets.
  - created img placeholders in html with ids, added basic styling format to keep image dimensions same regardless of image.
  - created constructor that stores image file name / path, # of times shown, and times clicked.
  - created static `allProducts` property that pushes to global array.
  - defined new object instances
  - created js variables to select html elements
  - created `renderProducts()` fucntion to generate three random pictures, ensure no duplicates are shown, increase counter, etc. (notes included in js).
  - added global variable to track 25 rounds.
  - created reference for container through html id link.
  - added event listener for click and click handler for execution, added function invocation.
  - images load on browser, will need to edit orentation and dimensions; fixed spelling on 'cthulhu' image so it would populate.
  - fixed spelling in `<head>` for styles.css link; was missing 's' off 'styles'.
  - speeling error within css was also preventing styles from applying; renaming of id.
  - crated `results()` function.
  - fixed issue on lists not updating / voting results being added to 'master' list, now results only show up after voting has completed with only choices displayed (and voted on); sans items not displayed.

- 03.12.26
  - added 'use strict'
  - added lighthouse report, before branch; 100%
  - ![lighthouse report' 100% :)](img/03.12_before.viz.branch.png)
- dataviz branch
  - linked Chart.js in nested `<script>` element within `<head>`, added `<canvas>` element (with `id=resultsChart`).
  - created chart function,
  - renamed `eslitor.json` to `eslintrc.json`.
  - rearranged order of javascript by moving click handler till after `renderChart()`.
  - added comments to `renderChart()`.
  - moved results locations from `<aside>` to below pictures and sidexside of chart.
  - created flexbox container to hold results and chart. updated comments abput DOM `.getElementById` to reflect being linked to `<div>`, not `<aside>`.
  - added styling for `results_Container`, `resultsChart`, and `results`.

- 03.16.26
  - refactored `renderProducts()` function to account for checking not only duplicates in active round, but also repeated images in following rounds, and also accounts if need to regenerate new images. (added array toward end of function to store previous indexes).
  - included a method to clear list, should new voting instace begin to avoid stackig list inside `showResults()`
  - modified click to specify click needs to happen on image not including container around it.
  - added button to add ability to restart voting without need to refresh page.
  - specified desctruction / clearing of old chart to avoid odd behavior.
  - merged dataViz with main branch, will style on next loadout.

- 03.17.26
  - added updated lighthouse report after merging viz branch.
  - ![100% report again](img/03.17_after.viz.merge.png)
  - branch created (dataStore).
  - began styling; added css selctors for `<body>` and `<main>`.
  - modified `product_Container` selector; widens gap between images as well as margin on top and bottom.
  - added container for products, white background.
  - added a placeholder container for results.
  - styled results.
  - styled and centered button.
  - modified chart loading aspects.
  - adding h1 heading.
  - changed chart colors.
  - styled iomages to zoom on hover.
  - added fixed height to product container.
  - changed background color.
  - added variables for html/dom id's; `results` and `results_Container`.
  - broke chart.js.
  - fixed styling on header and h1.
  - added transiiton for results container (still needs testing).
  - changed color on button.
  - deleted aside and extra section in html.
  - added footer text.
  - added styling to header so itll grow when hovered on.
  - fixed chart; hiding on load and display upon finish.
  - final check before starting on local storage.
    - minor changes to css; dimensions, effects, cleaned up js variable calls and comments.
  - added `loadFromLocalStorage` (+ invocation) and `saveToLocalStorage` function.
    - deleted global `new Product` instances and included them within local storage function.
    - added `saveToLocalStorage` inside `handleClick` function.
  - changed chart colors.
  - added footer styling (but its broken).
  - modified button colors.
- 03.22.26
  - fixed footer styling.
  - data is being saved. but stacking... will need to pevent from saving more than one / the previous round.
  - will merge to main for now and fix on next itteration.
  - lighthouse report
  - ![91% report...](img/03.22_post_dataStore.merge.png)
- 03.27.26
  - added block to `resetVoting` to remedy data persistence issue of data stacking/accumulating (isolated to button, refreshing page retains dataset).
  - added dynamically changing alt text per image cycled in `renderProducts()`.
  - added landing type description to readme (up top).
  - added lighthouse report (91!).
  - ![final report, ](img/03.27_final.report.png)
  - modified readme description, features, highlights, etc.
  - included js snippet to display indication to start voting.
