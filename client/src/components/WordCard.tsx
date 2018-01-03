import * as React from 'react';
import { Card, Rate } from 'antd';
import { calculateRate } from '../utils/util';
import Item from '../interfaces/Item';

class WordCard extends React.Component<{ item: Item }, {}> {
    constructor(props: { item: Item }) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <Card 
                key={item.defid} 
                title={item.word} 
                className="word-card"
                bordered={false}
            >
                <p>{item.definition}</p>
                <blockquote><i>{item.example}</i></blockquote>
                <p>
                    <strong className="author-name">@{item.author}</strong>
                </p>
                <Rate disabled={true} defaultValue={calculateRate(item.thumbs_up, item.thumbs_down)} />
            </Card>
        );
    }
}

export default WordCard;