import './App.css'
import './index.css'
import HomePage from './pages/HomePage'
import { Routes, Route, Link} from 'react-router-dom';
import Books from './pages/Books'
import Authors from './pages/Authors'
import Genres from './pages/Genres '
import AddBook from './pages/AddBook'
import AddAuthor from './pages/AddAuthor'
import AddGenre from './pages/AddGenre'
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import Reviews from './pages/Reviews';
import AddReview from './pages/AddReview';
import UpdateBook from './pages/UpdateBook';


function App() {

  return (
    <>
      <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/books' element = {<Books />} />
          <Route path='/authors' element = { <Authors /> } />
          <Route path='/genres' element = { <Genres /> } />
          <Route path='/add-book' element = { <AddBook /> } />
          <Route path='/add-author' element = { <AddAuthor /> } />
          <Route path='/add-genre' element = { <AddGenre /> } />
          <Route path='/users' element = { <Users /> } />
          <Route path='/add-user' element = { <AddUser /> } />
          <Route path='/reviews' element = { <Reviews /> } />
          <Route path='/add-review' element = { <AddReview /> } />  
          <Route path="/update-book/:id" element={<UpdateBook />} />        

      </Routes>

    
    </>
  )
}

export default App
