import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3400/api/posts')
      .then(res => {
        console.log(res)
        debugger
        setPosts(res.data)
      })
      .catch(err => {
        alert(err.message);
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {posts.map(post => <div>
                                <div>{post.title}</div>
                                <div>{post.contents}</div>
                             </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
