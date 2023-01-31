import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputRef = document.getElementById('search-box');
const ulEL = document.querySelector('.country-list');
const divEL = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
let valueSearch = '';

function onSearch() {
  clearHistory();
  valueSearch = inputRef.value.trim();
    return fetchCountries(valueSearch)
    .then(data => {
      createMarkup(data);
    })
    .catch(onError);
}

function clearHistory() {
  divEL.innerHTML = '';
  ulEL.innerHTML = '';
}

function createMarkup(value) {
  if (value.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    }
  if (value.length < 10 && value.length > 1) {
   const  markupList = value.reduce(
      (list, { flags, name }) =>
        (list += `<img src = ${flags.svg} width ='50'></img>
        <h1 class="country-name">${name.official}</h1>`),
      ' '
    );
    return ulEL.insertAdjacentHTML('afterbegin', markupList);
  }
  if (value.length === 1) {
  const markupCountry = value.map(
    ({ flags, name, capital, population, languages }) =>
                `<img src = ${flags.svg} width ='50'></img>
                <h1 class="country-name" >${name.official}</h1>
                <p class="country-value"><strong>Capital: </strong>${capital}</p>
                <p class="country-value"><strong>Population: </strong>${population}</p>
                <p class="country-value"><strong>Languages: </strong>${Object.values(
                  languages
                ).join(', ')}</p> `
    );
    return divEL.insertAdjacentHTML('afterbegin', markupCountry);
  }
};

function onError() {
  if (valueSearch === '') {
      return;
  }
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

