import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../actions/posts';
import { Button, TextField, Typography } from '@mui/material';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
    setComment('');
    setComments(newComments);
    commentsRef.current.scrollIntoView();
  };

  return (
    <div>
      <div className='comments__container'>
        <div className='comments__wrapper'>
          <h2 >Comments</h2> 
          <div className="comnts">
          {comments?.map((c, i) => (
            <p key={i} >
              <strong>{c.split(': ')[0]} : </strong>
              {c.split(':')[1]}
            </p>
          ))}
          <div ref={commentsRef}/>
          </div>
        </div>
        {user?.result?.name && (
          <div className='comment__field'>
          <Typography variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
          )}
      </div>
    </div>
  );
};

export default CommentSection;