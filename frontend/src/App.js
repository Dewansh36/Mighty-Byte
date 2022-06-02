// import './App.css';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './Components/Home/Home';
import CP from './Components/Cp/Cp'
import Login from './Components/Login/Login';
import Register from './Components/Login/Registration';
import Footer from './Components/footer/footer'
import Select from './Components/Select/Select'
import Profile from './Components/User/Profile'
import Project from './Components/project/Project'
import CreatePost from './Components/post/Post'
import News from './Components/news/News'
import Search from './Components/Search/Search';
import ViewPost from './Components/postview/views';
// import Project from './Components/project/Project'
// import Conversation from './Components/Conversations/Conversations';
import Messenger from './Components/Messenger/Messenger';
function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/cp' element={<CP />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/selectPage' element={<Select />} />
          <Route path='/users/:id' element={<Profile />} />
          <Route path='/posts/:id' element={<ViewPost />} />
          {/* <Route path='/editor' element={<Editor />} /> */}
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/posts' element={<Project />} />
          <Route path='/news' element={<News />} />
          <Route path='/search' element={<Search />} />
          {/* <Route path='/createPost' element={<CreatePost />} /> */}
          <Route path='/messenger' element={<Messenger />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
