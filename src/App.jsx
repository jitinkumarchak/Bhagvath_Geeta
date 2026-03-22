import React from "react";
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

export default function App() {
  return (
    <BrowserRouter>
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
        {/* fallback */}
        <Route path="*"                      element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
