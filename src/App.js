import { useState ,useEffect} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useMode, ColorModeContext } from "./theme";
import TopBar from "./components/layouts/Topbar";

import SideBar from "./components/layouts/Sidebar";
import Lead from "./pages/Lead";
import LeadDetail from "./pages/LeadDetail";
import { getCustomersThunk } from "./reducers/customers/customerSlice";
import { getLeadsThunk } from "./reducers/leads/leadSlice";
import Customer from "./pages/Customer";

function App() {
  const dispatch = useDispatch();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);



  useEffect(() => {
    dispatch(getCustomersThunk());
    dispatch(getLeadsThunk())

  }, [dispatch]);

console.log(process.env.REACT_APP_OPENAI_API_KEY, "dll");

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar isSidebar={isSidebar} />
          <main className="content">
            <TopBar setIsSidebar={setIsSidebar} />
            <Routes>
        
              <Route path="/" element={<Lead/>} />
              <Route path="/leads/:id" element={<LeadDetail />} />
              <Route path="/customers" element={<Customer/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;