import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "prismjs/themes/prism-tomorrow.css"
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setcode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`)
  const [review, setreview] = useState('')
  // console.log("🧪 TEST:", import.meta.env.REACT_APP_TEST_HELLO);
  // console.log(import.meta.env.REACT_APP_BACKEND_URL)

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || 'https://z-plus-plus-geminibackend.onrender.com';

    try {
      const response = await axios.post(`${BACKEND_URL}/ai/get-review`, { code });
      setreview(response.data);
    } catch (error) {
      console.error('Error reviewing code:', error);
    }
  }

  return (
    <>
    <div className="page-wrapper">
      <header className='head'> Z++ Code Editor </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setcode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                color: '#f8f8f2',
                border: '1px solid #ddd',
                height: "100%",
                width: "100%",
              }}
            />

          </div>
          <div onClick={reviewCode} className="review"> Review   </div>
        </div>
        <div className="right">
          <div className="res">
            <Markdown
              rehypePlugins={[rehypeHighlight]}
            >
              {review ? review : "Click on Review to get the AI generated code review."}
            </Markdown>
          </div>

        </div>
      </main>
      <footer className='foot'>
        Code the Zak Way 
        <br></br>
        Made with <i className="fa-solid fa-heart"></i> by Zaki

        {/* <a href="https://vitejs.dev" target="_blank">
          <p>Made by </p>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>  */}

      </footer>
      </div>
    </>
  )
}

export default App
