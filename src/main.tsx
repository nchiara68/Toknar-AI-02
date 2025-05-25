import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.tsx'
import { Amplify } from 'aws-amplify'
import config from './amplify_outputs.json'
import App from './App'
Amplify.configure(config);
// Create a typed config that matches Amplify expectations
/*const amplifyConfig: Record<string, unknown> = {
  ...config,
  oauth: {
    domain: 'toknar-auth.auth.eu-central-1.amazoncognito.com',
    redirectSignIn: 'https://main.dv51549stecdl.amplifyapp.com/',
    redirectSignOut: 'https://main.dv51549stecdl.amplifyapp.com/',
    responseType: 'code',
  },
};*/

//Amplify.configure(amplifyConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
    <App />
  </StrictMode>,
)
