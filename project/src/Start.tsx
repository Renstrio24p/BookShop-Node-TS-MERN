import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import CreateBooks from "./components/pages/CreateBooks";
import ShowBook from "./components/pages/ShowBook";
import EditBook from "./components/pages/EditBook";
import DeleteBook from "./components/pages/DeleteBook";

export default function Start() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}
