import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md';
import { Books } from "./types/Book";
import BooksCard from "../home/BooksCard";
import BooksTable from "../home/BooksTable";
import { Show } from "./types/Show";

type Props = {};

export default function Home({}: Props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState<Show>('table')

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);
    axios
      .get('http://localhost:8080/books', { signal })
      .then((res: AxiosRequestConfig) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') {
          console.log('Request aborted');
        } else {
          console.log((error as Error));
        }
        setLoading(false);
      });

    // Cleanup function to abort the request when the component unmounts
    return () => abortController.abort();
  }, []);

  return (
    <div className="p-4">

      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={()=> setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={()=> setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3x1 my-8">Book List</h1>
        <Link to={'/books/create'}>
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        showType === 'table' ? <BooksTable books={books as Books[]} /> : <BooksCard books={books as Books[]} />
      )}
    </div>
  );
}
