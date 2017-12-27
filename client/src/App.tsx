import * as React from 'react';
import './App.css';

class App extends React.Component {
  state = {words: []};

  componentDidMount() {
    fetch('/api/random')
      .then(res => res.json())
      .then(words => this.setState({ words }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>UrbanDictionary Search</h2>
        </div>
        <p className="App-intro">
          {this.state.words.map(word => 
            <div>{ word }</div>
          )}
        </p>
      </div>
    );
  }
}

export default App;
