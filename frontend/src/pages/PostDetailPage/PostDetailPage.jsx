import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router";
import * as postService from '../../services/postService'
import CommentForm from "../../components/CommentForm/CommentForm";

export default function PostDetailPage({ user }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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
  const navigate = useNavigate();
  async function handleDelete() {
    await postService.remove(postId);
    navigate('/posts');
  }

  return (
    <>
      {post ? (
        <main>
          <section>
            <header>
              <p>{post.category.toUpperCase()}</p>
              <h1>{post.title}</h1>
              <p>
                {`${post.author.name} posted on
            ${new Date(post.createdAt).toLocaleDateString()}`}
              </p>
              {post.author._id === user._id && (
                <>
                  <Link to={`/posts/${postId}/edit`}>
                    <button> Edit </button>
                  </Link>
                  <button onClick={() => handleDelete(postId)}> Delete </button>
                </>
              )}
            </header>
            <p>{post.text}</p>
          </section>
          <section>
            <h2>Comments</h2>
            <CommentForm postId={postId} />
            {!post.comments.length && <p>There are no comments.</p>}

            {post.comments.map((comment) => (
              <article key={comment._id}>
                <header>
                  <p>
                    {`${comment.author.name} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </section>
        </main>
      ) : (
        <p>Loading...</p>
      )}
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}