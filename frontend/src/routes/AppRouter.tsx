import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CharacterDetailPage from "@/pages/CharacterDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/characters/:id" element={<CharacterDetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
