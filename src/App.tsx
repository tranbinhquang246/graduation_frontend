import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignInPage } from './container/authContainer';

function App() {
  return (
	 <BrowserRouter>
		  <Routes>
			  <Route path="/login" element={<LoginPage />} />
			  <Route path="/signin" element={<SignInPage/>}/>
        {/* <Route path="/" element={<MainLayout />}>
          <Route index element={<Products />} />
          <Route path="/product/:productID" element={<DetailProduct />} />
        </Route> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
