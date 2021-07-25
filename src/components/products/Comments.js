import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { comments, userName, onReplyComment, onEditComment} = this.props;
    return (
      <div>
        {comments.map(function (comment) {
          return <Comment onEditComment={onEditComment} onReplyComment={onReplyComment} userName={userName} key={comment.id} comment={comment} />
        })}
      </div>
    );
  }
}

export default Comments;