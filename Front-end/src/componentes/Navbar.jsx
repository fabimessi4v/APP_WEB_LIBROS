import React, { useEffect, useState } from 'react'
import { FaBookJournalWhills } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const navbar = () => {
  //variables creadas para manejar si la navbar esta abierto o cuando esta "pegada"

  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const [isSticky,setIsSticky]=useState(false);
  //activar o desacrivar menu (toggle)
  const toggleMenu= () => {
      setIsMenuOpen(!isMenuOpen);
  }
  useEffect(() =>{
    const handleScroll = () =>{
      if(window.scrollY>100){
          setIsSticky(true);
      }
      else{
        setIsSticky(false);
      }
      
    }
    // cada vez que el usuario hace scroll, se ejecuta "hancleScroll"
    window.addEventListener("scroll",handleScroll); 
    return () => {
      window.addEventListener("scroll",handleScroll);
    }
  }, [])
  // Items de navbar
  const navItems =[
  {link: "Menu", path: "/"},
  {link: "Dashboard", path: "/menu"}
  ]
  return (
    <div className="bg-orange-200 min-h-screen">
    <header className='w-full bg-blue-500 fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
        <nav className={'py-4 lg:px-24 px-4 ${isSticky? "sticky top-0 left-0 right-0 bg-red-600" : ""}flex items-center justify-between'}>
              <Link to="/" className='text-2x1 font-serif text-white flex place-items-center gap-2'><FaBookJournalWhills className='inline-block' />Libros</Link>
              <div className="flex-1 flex justify-center">
              <ul className="flex space-x-10">
              {
                navItems.map(({ link, path }) => (
                  <Link 
                  //Usa `path` como clave única para cada enlace.
                    key={path}      
                  // Asigna el valor de `path` como destino del enlace.            
                    to={path}                  
                    className="block text-base text-white text-pretty" // Agrega clases para estilos.
                  >
                    {link}                     {/*Usa el valor de `link` como texto visible del enlace.*/}
                  </Link>
                ))
              }
            </ul>
            </div>
        </nav>
    </header>
    </div>
  )

  
}
export default navbar
