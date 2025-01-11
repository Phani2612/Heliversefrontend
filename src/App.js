// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






import './App.css';
import routes from './Routes/Route';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './404';

function App() {

 

  return (
    <BrowserRouter>

      <div >


        <Routes>


          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}


          <Route path='*' element = {<Error/>} ></Route>

        </Routes>



      </div>

    </BrowserRouter>
  );
}

export default App;
