import { useState, useEffect } from "react"
import { useParams } from "react-router";
import * as postService from '../../services/postService'

export default function PostDetailPage () {
    const{ postId } = useParams();
    const[post, setPost] = useState(null);
    const[errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function fetchPost() {
            try {
                const post = await postService.show(postId);
                setPost(post);

                
            } catch (error) {
                setErrorMsg('Failed to load post');
                console.log(error);
                
            }

        }
        fetchPost();

    }, [postId]);

  return (
  <>
    {post ? (
      <>
        <h2>{post.title}</h2>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Post:</strong></p>
        <p>{post.text}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
    <p className="error-message">&nbsp;{errorMsg}</p>
  </>
  );
}