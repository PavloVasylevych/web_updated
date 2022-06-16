import './App.css';
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import AccountEdit from "./Pages/AccountEdit";
import AccountRegister from "./Pages/AccountRegister";
import React from 'react';
import { BrowserRouter as Router,
  Routes, Route} from "react-router-dom";


function App() {
  return (
      <Router>
        <Routes>
          <Route exact path ='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<AccountRegister />} />
          <Route exact path='/account' element={<Account />} />
          <Route exact path='/edit_account' element={<AccountEdit />} />
        </Routes>
      </Router>);
}

export default App;
