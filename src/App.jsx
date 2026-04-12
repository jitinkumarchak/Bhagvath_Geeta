import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import ChapterDetail from "./pages/ChapterDetail";
import VerseDetail from "./pages/VerseDetail";
import Daily from "./pages/Daily";
import LifeGuide from "./pages/LifeGuide";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import BookReader from "./pages/BookReader";

// Dark mode context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("gita-dark-mode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("gita-dark-mode", dark);
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/"                      element={<Home />} />
          <Route path="/chapters"              element={<Chapters />} />
          <Route path="/chapter/:id"           element={<ChapterDetail />} />
          <Route path="/verse/:chapterId/:verseId" element={<VerseDetail />} />
          <Route path="/daily"                 element={<Daily />} />
          <Route path="/guide"                 element={<LifeGuide />} />
          <Route path="/explore"               element={<Explore />} />
          <Route path="/search"               element={<Search />} />
          <Route path="/chat"                  element={<Chat />} />
          <Route path="/book"                  element={<BookReader />} />
          {/* fallback */}
          <Route path="*"                      element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
