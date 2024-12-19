import React, { useState } from 'react'
import background from "../images/background.jpg"
import logo from "../images/GPA_logo.png"
import { Link } from 'react-router-dom';
import firebaseConfig from "../../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database"

export default function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== conPassword){
            alert("Password dosn't match!");
            return;
        }
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const ref = database.ref("Notes").child("Users");
        ref.child(phone).set({ name, password });

        setName("");
        setPhone("");
        setPassword("");
        setConPassword("");

        alert("Form submited!");
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
            <div className='container shadow px-5 py-4 text-center border rounded-5 bg-body-secondary bg-gradient bg-opacity-50' style={{ width: "38%" }}>
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <img src={logo} alt="logo" style={{ height: "100px" }} />
                    </div>
                    <h4 className='mt-1 mb-3 text-danger'>NOTES APP REGISTER</h4>
                    <div class="mb-2 text-start">
                        <label for="name" class="form-label">Your Full Name</label>
                        <input required type="text" class="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div class="mb-2 text-start">
                        <label for="phone" class="form-label">Your Mobile Number</label>
                        <input required type="text" class="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div class="mb-2 text-start">
                        <label for="pass" class="form-label">Password</label>
                        <input required type="password" class="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div class="mb-2 text-start">
                        <label for="conpass" class="form-label">Confirm Password</label>
                        <input required type="password" class="form-control" id="conpass" value={conPassword} onChange={(e) => setConPassword(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-success px-5 mt-3">REGISTER</button>
                </form>
                <p className='mt-3'>Already have an account? <Link to="/">Login here</Link></p>
            </div>
        </div>
    )
}
