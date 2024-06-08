import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGSOx9Rtl2i_p0Hwxrhaj6j7cwgQnH-TI",
  authDomain: "react-restapi-2051e.firebaseapp.com",
  projectId: "react-restapi-2051e",
  storageBucket: "react-restapi-2051e.appspot.com",
  messagingSenderId: "987583482657",
  appId: "1:987583482657:web:85a83129560e85e1730c60",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
// เผื่อได้ใช้งานในอนาคต
