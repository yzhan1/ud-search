import * as React from 'react';
import Item from '../interfaces/Item';
import '../css/App.css';

class App extends React.Component {
  state = {words: Array<Item>()};

  componentDidMount() {
    fetch('/api/random')
      .then((res) => res.json())
      .then((words) => {
        this.setState({ words: words.list });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>UrbanDictionary Search</h1>
        </div>
        {this.state.words.map(word => 
          <div key={word.defid}>{word.word}</div>
        )}
      </div>
    );
  }
}

export default App;
