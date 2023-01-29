const ENDPOINT = 'https://restcountries.com/v3.1/name/'


 function fetchCountries(query) {
   return fetch(`${ENDPOINT}${query}`).then(res => res.json());
 }





 

export default fetchCountries;