
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles.css';

function Programs() {
  return <main style={{padding:'120px 8%',minHeight:'100vh'}}>
    <h1>COACHING PROGRAMS</h1>
    <p>The Shaikh Academy — Programs page coming soon.</p>
    <a href="/">← BACK TO HOME</a>
  </main>;
}

function Book() {
  return <main style={{padding:'120px 8%',minHeight:'100vh'}}>
    <h1>BOOK A SESSION</h1>
    <p>The Shaikh Academy — Booking enquiries coming soon.</p>
    <a href="/">← BACK TO HOME</a>
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/programs" element={<Programs/>}/>
        <Route path="/book" element={<Book/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
