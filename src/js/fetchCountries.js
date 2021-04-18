const BASE_URL = 'https://restcountries.eu/rest/v2';

// function fetchCountries(searchQuery) {
//   return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
//     if (!response.ok) {
//       throw response;
//     }
//     response.json();
//   });
// }

async function fetchCountries(searchQuery) {
  const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
  return await response.json();
}

export default { fetchCountries };
