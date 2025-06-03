import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // GET: Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      setPosts(res.data);
    } catch (error) {
      console.error('GET Error:', error);
    }
  };

  // POST: Add new post with unique ID for UI
  const handleAdd = async () => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      });

      const newPost = {
        ...res.data,
        id: Date.now() + Math.floor(Math.random() * 1000), // assign unique id
      };

      setPosts((prev) => [newPost, ...prev]);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('POST Error:', error);
    }
  };

  // PUT: Update post with id = 1
  const handleUpdate = async () => {
    try {
      const res = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
        title,
        body,
        userId: 1,
      });
      alert('Post 1 updated (simulated)');
      console.log('Updated:', res.data);
    } catch (error) {
      console.error('PUT Error:', error);
    }
  };

  // DELETE: Remove from UI as well
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error('DELETE Error:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Axios CRUD Demo</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <div className="buttons">
        <button onClick={handleAdd}>Add Post (POST)</button>
        <button onClick={handleUpdate}>Update Post 1 (PUT)</button>
      </div>

      <h2>Fetched Posts (GET)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.body}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
