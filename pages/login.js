import React, { useState} from 'react';
import Layout from "../layouts/Layout";
import Head from "next/head";
import {useRouter} from "next/router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();

        const data = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        const res = await data.json();
        console.log(res.result)
        //  console.log(res);
        if(res.status === 201){
            localStorage.setItem("usersdatatoken",res.result.token);    
            await router.push('/');
        }
      
    }

    return (
        <Layout>
            
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="email" className="form-control" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
            
        </Layout>
    );
};

export default Login;
