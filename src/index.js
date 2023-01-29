import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const ulEL = document.querySelector('.country-list');
const divEL = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
clearHistory();
const valueSearch = inputRef.value.trim();
return fetchCountries(valueSearch).then(data => createMarkup(data));
};

function clearHistory() {
divEL.innerHTML='';      
}


function createMarkup(value) {
  const markup = value.map(
    el => `<img src = ${el.flags.svg} width ='50'></img>
                <h1 class="country-name" >${el.name.official}</h1>
                <p class="country-capital" >Capital: ${el.capital}</p>
                <p class="country-population" >Population: ${
                  el.population
                }</p>
                <p class="country-languages">Languages: ${Object.values(
                  el.languages
                )}</p> `
  );

  return divEL.insertAdjacentHTML('afterbegin', markup);
}
