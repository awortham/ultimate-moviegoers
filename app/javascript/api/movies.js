var _ = require('lodash');

var apiKey = 'a982fe2404361ddccb79877090faea0b'
var delayTimer;
var baseUrl = 'https://api.themoviedb.org/'

function toCamelCase(object) {
  return _.mapKeys(object, (value, key) => _.camelCase(key))
}

function handleData(results) {
  return _.map(results, result => toCamelCase(result) )
}


async function fetchCollection(url) {
  const data = await fetch(url)
  const movieData = await data.json()
  const cleanData = await handleData(movieData.results)

  return cleanData
}

export async function getMovie(id) {
  const data = await fetch(`${baseUrl}3/movie/${id}?api_key=${apiKey}`)
  const movieData = await data.json()
  const cleanData = await toCamelCase(movieData)

  return cleanData
}

export function searchMovies(term) {
  const url = `${baseUrl}3/search/movie?api_key=${apiKey}&query=${term}&region=us`
  return fetchCollection(url)
}

export function nowPlaying() {
  const url = `${baseUrl}3/movie/now_playing?api_key=${apiKey}&region=US`
  return fetchCollection(url)
}

export function popular() {
  const url = `${baseUrl}3/discover/movie?api_key=${apiKey}&region=US&sort_by=popularity.desc`
  return fetchCollection(url)
}

export function highestRated() {
  const url = `${baseUrl}3/discover/movie?api_key=${apiKey}&region=US&sort_by=vote_count.desc`
  return fetchCollection(url)
}
