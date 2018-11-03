import React, { Component } from 'react'
import * as moment from 'moment'
import ModalButton from './modal-button'

export default class StoryItem extends Component {

    render() {
        return (
            <div className="blog-container">

                <div className="blog-header">
                    <div className="blog-author--no-cover">
                        <a href={this.props.item.url}>
                            <h3>
                                {this.props.item.title}
                            </h3>
                        </a>
                    </div>
                </div>

                <div className="blog-footer">
                    <ul>
                        <li className="published-date"> {moment.unix(this.props.item.time).fromNow()} by {this.props.item.by}</li>
                        <li className="shares">
                            <ModalButton item={this.props.item}>
                                
                            </ModalButton>
                            <svg id="icon-star" viewBox="0 0 1024 1024" width="5%" height="100%" fill="#999999">
                                <title>Score</title>
                                <path className="path1" d="M1020.192 401.824c-8.864-25.568-31.616-44.288-59.008-48.352l-266.432-39.616-115.808-240.448c-12.192-25.248-38.272-41.408-66.944-41.408s-54.752 16.16-66.944 41.408l-115.808 240.448-266.464 39.616c-27.36 4.064-50.112 22.784-58.944 48.352-8.8 25.632-2.144 53.856 17.184 73.12l195.264 194.944-45.28 270.432c-4.608 27.232 7.2 54.56 30.336 70.496 12.704 8.736 27.648 13.184 42.592 13.184 12.288 0 24.608-3.008 35.776-8.992l232.288-125.056 232.32 125.056c11.168 5.984 23.488 8.992 35.744 8.992 14.944 0 29.888-4.448 42.624-13.184 23.136-15.936 34.88-43.264 30.304-70.496l-45.312-270.432 195.328-194.944c19.296-19.296 25.92-47.52 17.184-73.12zM754.816 619.616c-16.384 16.32-23.808 39.328-20.064 61.888l45.312 270.432-232.32-124.992c-11.136-6.016-23.424-8.992-35.776-8.992-12.288 0-24.608 3.008-35.744 8.992l-232.32 124.992 45.312-270.432c3.776-22.56-3.648-45.568-20.032-61.888l-195.264-194.944 266.432-39.68c24.352-3.616 45.312-18.848 55.776-40.576l115.872-240.384 115.84 240.416c10.496 21.728 31.424 36.928 55.744 40.576l266.496 39.68-195.264 194.912z"></path>
                            </svg>
                            <span className="numero">{this.props.item.score} Points</span>
                        </li>
                    </ul>
                </div >
            </div >

        )
    }
}