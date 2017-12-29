import * as React from 'react';
import Header from './Header';
import WordList from './WordList';
import '../css/App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <WordList/>
            </div>
        );
    }
}

export default App;
