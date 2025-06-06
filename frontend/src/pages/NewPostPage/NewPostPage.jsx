import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import * as postService from '../../services/postService'

export default function NewPostPage() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
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
    if (postId) {
      await postService.update(postId, formData);
      navigate(`/posts/${postId}`);

    } else {
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


  }

  // src/components/HootForm/HootForm.jsx

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData(postData);
    };
    if (postId) fetchPost();
    return () => setFormData({ title: '', text: '', category: 'general' });
  }, [postId]);


  return (
    <main>
      <h1>{postId ? 'Edit Hoot' : 'New Hoot'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='general'>General</option>
          <option value='question'>Question</option>
          <option value='meme'>Meme</option>
          <option value='announcement'>Announcement</option>
          <option value='event'>Event</option>
        </select>
        <button type='submit'>SUBMIT</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </main>


  );
}
