import React from 'react';

const Comment = (props) => {
    const comment = props.comment;
    return (
        <div className="comment">
            <a className="avatar">
                <img src={comment.img}></img>
            </a>
            <div className="content">
                <a className="author">{comment.author}</a>
                <div className="metadata">
                    <span className="date">{comment.date}</span>
                </div>
                <div className="text">
                    {comment.text}
                </div>
            </div>
        </div>
    )
}

export default Comment;