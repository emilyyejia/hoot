import { useState } from 'react';
import * as postService from '../../services/postService'

export default function CommentForm(props) {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    await postService.createComment(props.postId, formData);
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>SUBMIT COMMENT</button>
    </form>
  );
};



