import * as React from 'react';
import Item from '../interfaces/Item';

class WordList extends React.Component<{}, { words: Array<Item> }> {
    constructor(props: React.Props<Array<Item>>) {
        super(props);
        this.state = {
            words: Array<Item>()
        };
    }

    componentDidMount(): void {
        fetch('/api/random')
            .then((res) => res.json())
            .then((words) => {
                this.setState({ words: words.list });
            });
    }

    render() {
        return (
            <div className="word-list">
                {this.state.words.map(word => 
                    <div key={word.defid}>{word.word}</div>
                )}
            </div>
        );
    }
}

export default WordList;