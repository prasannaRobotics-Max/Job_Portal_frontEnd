import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from"./Redux/Store.jsx";
import AppRouter from './Router/AppRouter.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
 <AppRouter/>
    </Provider>
  </StrictMode>,
)
