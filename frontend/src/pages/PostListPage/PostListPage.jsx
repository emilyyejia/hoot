import { useState, useEffect } from "react"
import { Link } from "react-router";
import * as postService from '../../services/postService'
export default function PostListPage () {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            const posts = await postService.index();
            setPosts(posts);
        }
        fetchPosts();
    }, []);
    return (
    <>
      <h1>Hoot List</h1>
      {posts.length ? 
          <main>
            {posts.map((post) => (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <article>
                  <header>
                    <h2>{post.title}</h2>
                    <p>
                      {`${post.author.name} posted on
                ${new Date(post.createdAt).toLocaleDateString()}`}
                    </p>
                  </header>
                  <p>{post.text}</p>
                </article>
              </Link>
            ))}
          </main>
        :
        <p>No Hoots Yet!</p>
      
      }

    </>

    );
}