
import { useState } from "react"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"
import type { ChangeEvent } from 'react';


<link href="/src/styles.css" rel="stylesheet"></link>


interface Note {
  id: string
  date: Date
  content: string
}

export function App() {

  const [buscar, setBuscar] = useState('');


  const[notes, setNotes] = useState<Note[]>(() => {
    
    const NotasStorage = localStorage.getItem('notes')

    if(NotasStorage) {
      return JSON.parse(NotasStorage)
    }
    
    return []
  })

  function criacaoNota(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notasArray = [newNote, ...notes]

    setNotes(notasArray);

    localStorage.setItem('notes', JSON.stringify(notasArray))
  }


  function deletarNota(id: string) {
    const ArrayNotas = notes.filter(note => {
      return note.id != id 
    })

    setNotes(ArrayNotas);
  }


  function pesquisar(event: ChangeEvent<HTMLInputElement>) {
    const query =  event.target.value

    setBuscar(query);
  }


  const filtrarNotas = buscar !==  ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
  : notes


  return (  


    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 "> 

     
        <form className="w-full ">
          <input 
          type="text" 
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500" 
          onChange={pesquisar}
          />
          
        </form>


        <div className="h-px bg-slate-700 " />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]" >

          <NewNoteCard criacaoNota={criacaoNota} />

          {filtrarNotas.map(note => {
            return <NoteCard key={note.id} note={note} deletarNota={deletarNota} />
          })}


        </div>
        
    </div>


  

)
}

