import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {words: []}

  componentDidMount() {
    fetch('/api/random')
      .then(res => res.json())
      .then(words => this.setState({ words }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.words.map(word =>
            <div>{word}</div>
          )}
        </p>
      </div>
    );
  }
}

export default App;
