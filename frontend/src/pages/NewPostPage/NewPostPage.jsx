import { useState } from "react"
import { useNavigate } from "react-router";
import * as postService from '../../services/postService'

export default function NewPostPage () {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    text: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
        // sendRequest is expecting an object as the payload
       await postService.create(formData);
       console.log(formData);
       navigate('/posts');
    } catch (err) {
        setErrorMsg('Adding Post Failed');
        console.log(err);
    }

  }

  return (
    <>
     <h2>Add Hoot</h2>
      <form autoComplete="off" onSubmit={handleSubmit}> 
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="general">General</option>
          <option value="question">Question</option>
          <option value="meme">Meme</option>
          <option value="announcement">Announcement</option>
          <option value="event">Event</option>
        </select>
        <label>Post</label>
        <textarea
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        />
        <button type="submit" >
          ADD POST
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}