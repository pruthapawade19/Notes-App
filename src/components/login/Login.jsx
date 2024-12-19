import React,{useState} from 'react';
import background from "../images/background.jpg"
import logo from "../images/GPA_logo.png"
import { Link,useNavigate} from 'react-router-dom';
import firebaseConfig from "../../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database"



const Login = () => {

    const [phone,setPhone]= useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database().ref("Notes").child("Users").child(phone);

        database.on("value",(snapshot) => {
            if(snapshot.exists()){
                if(snapshot.val().password === password){
                    localStorage.setItem("user",phone);
                    setPhone("");
                    setPassword("");
                    navigate("/notes");

                    // alert("Success")
                }
                else{
                    alert("Incorrect credentials");
                }

            }
            else{
                alert("User not Registered!");
            }
        })
    }
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className='container shadow px-5 py-4 text-center mb-5 border rounded-5 bg-body-tertiary bg-opacity-50' style={{ width: "38%" }}>
                <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <img src={logo} alt="logo" style={{ height: "100px" }} />
                </div>
                <h4 className='mt-1 mb-3 text-danger'>NOTES APP LOGIN</h4>
                <div class="form-floating mb-3">
                    
                    <input required type="phone" class="form-control" id="floatingInput" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label for="floatingInput">Phone</label>
                </div>
                <div class="form-floating">
                    <input required type="password" class="form-control" id="floatingPassword" value={password}  onChange={(e) => setPassword(e.target.value)} />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" class="btn btn-success px-5 mt-3">LOGIN</button>
            </form>
                <p className='mt-3'>Not registered yet? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    )
}

export default Login;
