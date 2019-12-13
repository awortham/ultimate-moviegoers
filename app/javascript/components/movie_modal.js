import React from 'react'
import { getMovie } from '../api/movies'

const numberToCurrency = amount => {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
  return formatter.format(amount)
}

class MovieModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: {}
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const movie = await getMovie(this.props.movieId)
        .then(data => this.setState({ movie: data }))
    }

    fetchData()
  }

  render() {
    const { runtime, overview, releaseDate, revenue, title, tagline, voteAverage, voteCount } = this.state.movie
    const { onClick } = this.props

    return (
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="">{title}</h4>
              <div className="float-right">Action, Comedy, Romance</div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="row" style={{ margin: 'auto' }}>
                    <h6>Runtime:</h6><div style={{ marginLeft: '.5em', fontSize: 'small' }}>{runtime} minutes </div>
                  </div>
                  <div className="row" style={{ margin: 'auto' }}>
                    <h6>Release date:</h6><div style={{ marginLeft: '.5em', fontSize: 'small' }}>{releaseDate}</div>
                  </div>
                  <div className="row" style={{ margin: 'auto' }}>
                    <h6>Box office:</h6><div style={{ marginLeft: '.5em', fontSize: 'small' }}>{numberToCurrency(revenue)}</div>
                  </div>
                  <div className="row" style={{ margin: 'auto' }}>
                    <h6>Vote count:</h6><div style={{ marginLeft: '.5em', fontSize: 'small' }}>{voteCount}</div>
                  </div>
                  <div className="row" style={{ margin: 'auto' }}>
                    <h6>Vote average:</h6><div style={{ marginLeft: '.5em', fontSize: 'small' }}>{voteAverage}</div>
                  </div>
                </div>
                <div className="col-md-7">
                  {overview}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="tagline" style={{ minWidth: '90%', fontStyle: 'italic', fontWeight: 'bold' }}>
                {tagline}
              </div>
              <button type="button" className="btn btn-secondary" onClick={onClick} data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieModal
