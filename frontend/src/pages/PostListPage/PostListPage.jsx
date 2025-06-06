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
      <h1>Post List</h1>
      {posts.length ? 
        <ul>
            {posts.map((post) => <li key={post._id} >
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </li>)}

        </ul>
        :
        <p>No Posts Yet!</p>
      
      }

    </>

    );
}