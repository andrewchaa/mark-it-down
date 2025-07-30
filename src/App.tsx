import React, { useState } from 'react';
import './App.css';
import MarkdownEditor from './MarkdownEditor';

function App() {
  const [content, setContent] = useState('');

  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
        <h1>WYSIWYG Rich Text Editor</h1>
        <p>A powerful rich text editor with Tiptap - featuring bold, italic, lists, links, and more</p>
      </header>
      <main style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <MarkdownEditor 
          onChange={setContent}
          placeholder="Start writing your content here..."
        />
        {content && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <h3>Current Content Length: {content.length} characters</h3>
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View HTML Output</summary>
              <pre style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '10px', 
                borderRadius: '4px', 
                overflow: 'auto',
                fontSize: '12px',
                marginTop: '10px'
              }}>
                {content}
              </pre>
            </details>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
