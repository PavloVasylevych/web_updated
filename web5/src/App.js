import './App.css';
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import AccountEdit from "./Pages/AccountEdit";
import AccountRegister from "./Pages/AccountRegister";
import { BrowserRouter as Router,
  Routes, Route} from "react-router-dom";
import CreateReservation from "./Pages/Reservation/CreateReservation";
import EditReservation from "./Pages/Reservation/EditReservation";
import ViewAllReservation from "./Pages/Reservation/ViewAllReservation";
import Reservation from "./Pages/Reservation/Reservation";

function App() {
  return (      <Router>
    <Routes>
      <Route exact path ='/' element={<Login />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<AccountRegister />} />
      <Route exact path='/account' element={<Account />} />
      <Route exact path='/edit_account' element={<AccountEdit />} />
      <Route exact path='/create_res' element={<CreateReservation/>}/>
      <Route exact path='/edit_res/:id' element={<EditReservation/>}/>
      <Route exact path='/reses' element={<ViewAllReservation/>}/>
      <Route exact path='/reses/:id' element={<Reservation/>}/>
    </Routes>
  </Router>);
}

export default App;



