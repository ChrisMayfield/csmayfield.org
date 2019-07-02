# babynames

This web app consists of the following files:

* `index.html`, `about.html`, `style.css`
* `bchart.js` draws the bar charts
* `search.js` displays search results
* `counts.py` generates `counts.js`
* `sounds.py` generates `sounds.js`
* `trends.py` generates `trends.js`

To generate or update the JavaScript data files:

1. Download and extract `names.zip` (National data) from https://www.ssa.gov/oact/babynames/limits.html
2. Run `counts.py`, `sounds.py`, and `trends.py` (in that order)

The files `metaphone.py` and `word.py` are originally from https://github.com/oubiwann/metaphone (version 0.4) by Andrew Collins.
