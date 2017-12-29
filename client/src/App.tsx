import * as React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {words: []};

  componentDidMount() {
    axios.get('/api/random')
      .then((res) => {
        const words = res.data.list;
        this.setState({ words });
        this.state.words.map((word, index) => {
          console.log(`${index}, ${word}`)
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>UrbanDictionary Search</h2>
        </div>
        {this.state.words}
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}

export default App;
