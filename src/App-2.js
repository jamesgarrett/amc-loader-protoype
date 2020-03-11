import React, { Component } from 'react';
import typography from './components/typography';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        shows: [],
        isLoaded: false,
      }
  }

  componentDidMount(){

    fetch('http://amc-api-br.svc.ds.amcn.com/v2/public/feed/collections?name=featured_shows')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded:true,
          shows: json.data.posts,
        })
      });
  }

  render() {

      var { isLoaded, shows } = this.state;

      if (!isLoaded){
        return <div className="Loader">
                  <video id="samp" width="1920" height="1080" controls>
                      <source src="loader-lg.mp4" type="video/mp4">
                          Your browser does not support this video format.
                      </source>
                  </video>
        </div>;
      }

      return (
        <div className="App dark">
          <div className="container-fixed">
            <h1>Featured Shows</h1>

            <ul className="Shows">
              {shows.map(show => (
                <li className="Show" key={show.id}>
                {show.images.poster['200x300'] && (
                  <img src={show.images.poster['200x300'].full}></img>
                  )
                }
                  <h4 className="Name">{show.meta.amcn_field_relation_show_display}</h4>
                </li>
              ))}
            </ul>

          </div>
        </div>
      );
  }

}

export default App;
