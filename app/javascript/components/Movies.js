import React, { Fragment } from "react"
import Logo from 'images/logo.png'
import Rocket from 'images/rocket.png'
import { highestRated, nowPlaying, popular, searchMovies } from '../api/movies'
import MovieModal from 'components/movie_modal'

var delayTimer;

const fetchTypes = {
  'highest-rated': {
    fn: highestRated,
    label: 'Highest Rated',
  },
  'now-playing': {
    fn: nowPlaying,
    label: 'Now Playing',
  },
  'popular': {
    fn: popular,
    label: 'Most Popular'
  }
}

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      movieCollectionLabel: '',
      movieList: [],
      searchBox: false,
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleFetchData(fetchType) {
    this.setState({ loading: true })
    const requestType = fetchTypes[fetchType]

    const fetchData = async () => {
      const movies = await requestType.fn()
        .then(data => this.setState(
          {
            loading: false,
            movieList: data,
            movieCollectionLabel: requestType.label,
            searchBox: false,
          }
        ))
    }

    fetchData()
  }

  handleSearch(e) {
    this.setState({ loading: true })

    let term = e.target.value
    clearTimeout(delayTimer);

    delayTimer = setTimeout(() => {
      const movies = searchMovies(term)
      movies.then(data => this.setState(
        {
          loading: false,
          movieList: data,
          movieCollectionLabel: `Search: (${term})`,
        }
      ))
    }, 600)
  }

  render() {
    return (
      <Fragment>
        <div id="preloder">
          <div className="loader"></div>
        </div>

        {this.state.loading && (
          <div className="spinner"></div>
        )}

        <header className="header-section">
          <a href="./index.html" className="site-logo">
            <img className='logo' src={Rocket} alt='logotron' />
          </a>
          <div className="nav-warp">
            <div className="user-panel">
              <a onClick={() => this.setState({ searchBox: !this.state.searchBox })}>
                Search Now
              </a>
            </div>

            {this.state.searchBox && (
              <div className="form-group has-search">
                <input
                  type="text"
                  autoFocus
                  className="form-control"
                  onChange={this.handleSearch}
                  placeholder="Search"
                />
              </div>
            )}

          </div>
        </header>

        <section className="hero-section set-bg">
          <div className="container h-100">
            <div className="hero-content text-white">
              <div className="row">
                <div className="col-lg-6 pr-0">
                  <h2>Ultimate Moviegoers Guide</h2>
                  <p>
                    Your one stop shop for all your movie questions! Search, view and discover everything you ever wanted to
                    know about every movie you can imagine!
                  </p>

                  <div className="row">
                    <button onClick={() => this.handleFetchData('now-playing')} className="site-btn" type="button">Now Playing</button>
                    <button onClick={() => this.handleFetchData('popular')} className="site-btn" type="button">Popular Movies</button>
                    <button onClick={() => this.handleFetchData('highest-rated')} className="site-btn" type="button">Highest Rated</button>
                  </div>

                </div>
              </div>
              <div className="hero-rocket">
                <img src={Rocket} alt='rocket' />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container h-100">
            <div className="row">
              <h3 style={{ color: '#eb2b63', marginTop: '.5em'}}>{this.state.movieCollectionLabel}</h3>
            </div>
          </div>
        </section>

        <section className="movie-list">
          <div className="container h-100">
            <div className="row">
                {this.state.movieList.map(movie => {
                  return(
                    <div className="card" onClick={() => this.setState({ selectedMovie: movie })} key={movie.id} style={{ width: '18rem', margin: '1em' }}>
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Release Date: {movie.releaseDate}</h6>
                        <p className="card-text">{_.truncate(movie.overview, { 'length': 150 })}</p>
                        <div className="d-flex justify-content-between">
                          <div className="font-small">
                            <h6 className="text-muted">Popularity:</h6> {movie.popularity}
                          </div>
                          <div className="font-small">
                            <h6 className="text-muted">Vote Count:</h6> {movie.voteCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>

        {this.state.selectedMovie && (
          <MovieModal
            onClick={() => this.setState({ selectedMovie: null })}
            movieId={this.state.selectedMovie.id}
          />
        )}

      </Fragment>
    )
  }
}

export default Movies

