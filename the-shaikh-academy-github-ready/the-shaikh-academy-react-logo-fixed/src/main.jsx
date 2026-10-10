
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Programs from './Programs';
import Book from './Book';
import './styles.css';

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
