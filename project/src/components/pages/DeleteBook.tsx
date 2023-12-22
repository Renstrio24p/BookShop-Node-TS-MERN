
import { useState } from "react"
import BackButton from "../BackButton"
import Spinner from "../Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

type Props = {}

export default function DeleteBook({}: Props) {

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteBook = ()=>{
     setLoading(true)
     axios
      .delete(`http://localhost:8080/books/${id}`)
      .then(()=>{
        setLoading(false)
        navigate('/')
      })
      .catch((error: unknown)=>{
        setLoading(false)
        console.log((error as Error).message)
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2x1">Are you sure you want to delete this book?</h3>
          <button 
              className="p-4 bg-red-600 text-white m-8 w-full"
              onClick={handleDeleteBook}
          >
            Yes, Continue
          </button>
      </div>
    </div>
  )
}