# TO START THE PROJECT LOCALLY

#### After cloning the project, run "npm install" to install the necessary dependencies and run the command "npm start". That should get the project up and running. If by any chance "npm install" fails, run "npm i -f" to do a forcefull install and that should do it.


# FEATURES COVERED:

#### 1.Covered the infinite scrolling on up and down directions wherein up will load older movies and down will load new movies with respect to the current movie year on initial load, i.e 2012

#### 2. Made the Genre filter wherein multiple genre filter selection is possible and the data list will get updated accordingly. API is called when the genres are selected.

#### 3. Total movie shown per year is 20 as mentioned in the requirements list.

#### 4. Added a fade on the movie summary on card with a "view more" option which opens a browser alert stating the full movie summary.

# FEATURES NOT COVERED:

#### 1. Cast and director is not shown on the card as the API data did not include those properties.

#### 2. Search functionality got left out.

# SPECIAL MENTION:

#### As for genres, when multiple genres are selected the data is coming all good but once infinite scroll is done, TMDb did not have an api to call older or newer movies whilst maintaining the current selected genres. Hence the solution I implemented is that when there is any genre is selected as a filter, as the filter API result contained movies from various timeframes, I stopped calling the ususal scroll APIs as that did not make sense. Once all filters are cleared the data is restored back to 2012 with normal functionality as before.

