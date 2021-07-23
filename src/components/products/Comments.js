import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  render() {
    const { comments, userName } = this.props;
    debugger
    return (
      <div>
        {comments.map(function (comment) {
          return <Comment userName={userName} key={comment.id} comment={comment} />
        })}
      </div>
    );
  }
}

export default Comments;