import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SuccessOrder from "./pages/SuccessOrder";
import ProfilePage from "./pages/ProfilePage";
import RatesPage from "./pages/RatesPage";
import PopupPage from "./pages/PopupPage";

import { fetchUser, fetchRates } from "./heplers/ApiUtils";

function App() {
  const [user, setUser] = useState(null);
  const [tgId, setTgId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const tgIdToSet = window.Telegram.WebApp.initDataUnsafe.user.id;
    const tgIdToSet = 7140601990;
    console.log(tgIdToSet);
    setTgId(tgIdToSet);
  }, [])

  useEffect(() => {
    if (!tgId) return;

    const loadUser = async () => {
      try {
        const user = await fetchUser(tgId);
        if (user === null) {
          navigate('/popup')
        }
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, [tgId]);

  const [rates, setRates] = useState([]);

  useEffect(() => {

    const loadRates = async () => {
      try {
        const rates = await fetchRates();
        setRates(rates);
      } catch(err){
        console.error(err);
      }
    }

    loadRates();
  }, [])

  useEffect(() => {
    window?.Telegram?.WebApp.expand()
  }, [])


  return ( 
      <Routes>
        <Route path='/' element={<MainPage user={user} rates={rates}/>}/>
        <Route path='/success-order' element={<SuccessOrder/>}/>
        <Route path='/profile' element={<ProfilePage user={user}/>}/>
        <Route path='/rates' element={<RatesPage rates={rates} user={user}/>}/>
        <Route path='/popup' element={<PopupPage/>}/>
      </Routes>
  );
}

export default App;
