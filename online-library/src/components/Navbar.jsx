const Navbar = () =>{

    return(

        <>

<header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Biblioteka</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Početna</a></li>
              <li><a href="/books" className="hover:underline">Knjige</a></li>
              <li><a href="/authors" className="hover:underline">Autori</a></li>
              <li><a href="/genres" className="hover:underline">Žanrovi</a></li>
              <li><a href="/users" className="hover:underline">Korisnici</a></li>
              <li><a href="/reviews" className="hover:underline">Recenzije</a></li>
             
            </ul>
          </nav>
        </div>
      </header>
        </>
    )


}
export default Navbar;