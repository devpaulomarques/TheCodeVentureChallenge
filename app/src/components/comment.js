import React from 'react';
import axios from 'axios'
import * as moment from 'moment'

export default class Comment extends React.Component {

    state = {
        comment: null
    };

    async componentDidMount() {
        this.setState({
            comment: await axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.item}.json?print=pretty`)
        });
    }

    render() {

        const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

        return (
            this.state.comment && this.state.comment.data.text ?
                <div>
                    <div className="comment" style={{ paddingLeft: this.props.level * 30 + 'px' }}>
                        <div>
                            <p className="head-comment" >
                                by {this.state.comment.data.by} {moment.unix(this.state.comment.data.time).fromNow()}
                            </p>
                            <div className="body-comment">
                                {renderHTML(this.state.comment.data.text)}
                            </div>
                        </div>
                    </div>
                    {this.state.comment.data.kids ? this.state.comment.data.kids.map((kid, index) => <Comment item={kid} key={index} level={this.props.level + 1} />) : null}
                </div>
                : null

        );
    }
}