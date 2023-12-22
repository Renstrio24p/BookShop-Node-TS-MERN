import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../BackButton"
import Spinner from "../Spinner"
import { ChangeEvent, useState, useEffect } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { Books } from "./types/Book"

type Props = {}

export default function EditBooks({}: Props) {

    const [title , setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(()=>{
      setLoading(true);
      axios.get(`http://localhost:8080/books/${id}`)
      .then((res: AxiosRequestConfig)=>{
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setTitle(res.data.title)
        setLoading(false)
      })
      .catch((error: unknown)=>{
        setLoading(false);
        alert('An Error is happening. please check on the console.')
        console.log((error as Error).message)
      })
    },[])

    const handleEditBook = ()=>{
        const data: Books = {
            title,
            author,
            publishYear,
        }
        setLoading(true);
        axios
           .put(`http://localhost:8080/books/${id}`,data)
           .then(()=>{
             setLoading(false)
             navigate('/')
            })
            .catch((error: unknown)=>{
                setLoading(false)
                alert('An error is happening. Please Check in the console')
                console.log((error as Error))
            })
    }

  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3x1 my-4">Edit Book</h1>
        {loading ? <Spinner /> : ''}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
                <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value)} 
                    className="border-2 border-gray-500 px-4 w-full"
                />
                <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
                <input 
                    type="text"
                    value={author}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setAuthor(e.target.value)} 
                    className="border-2 border-gray-500 px-4 w-full"
                />
                <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
                <input 
                    type="text"
                    value={publishYear}
                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setPublishYear(e.target.value)} 
                    className="border-2 border-gray-500 px-4 w-full"
                />
                <button 
                    className="p-2 bg-sky-300 n-8"
                    onClick={handleEditBook}
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
  )
}