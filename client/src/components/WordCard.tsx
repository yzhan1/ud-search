import * as React from 'react';
import Item from '../interfaces/Item';
import { Card, Rate } from 'antd';
import { calculateRate } from '../utils/util';

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
                <p><strong>@{item.author}</strong></p>
                <Rate disabled={true} defaultValue={calculateRate(item.thumbs_up, item.thumbs_down)} />
            </Card>
        );
    }
}

export default WordCard;