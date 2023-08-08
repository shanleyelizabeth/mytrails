import { useState } from "react"

function Authentication({ setUser }){
    const [ isLogin, setIsLogin ] = useState(0) // if 1 we'll fetch to .../login, if 2, we'll fetch to .../signup
    const [ formData, setFormData ] = useState({username:"",password:""}) // holds login form data

    function handleSubmit(e){
        e.preventDefault()
        const route = isLogin === 1 ? "login" : "signup"
        fetch(`http://localhost:5555/${route}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
            .then( r => r.json())
            .then( user => console.log(user))
    }

    return(
        <div className="authentication">
            {isLogin === 0 ? 
            <div className="login or signup">
                <button onClick={(e)=>{setIsLogin(1)}}>Login</button>
                <button onClick={(e)=>{setIsLogin(2)}}>Signup</button>
            </div>
            :
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, username: e.target.value})}}
                        type="text"
                        username= "username"
                        placeholder="username"
                        className="input-text"
                        value={formData.username}
                    ></input>
                <label htmlFor="password">password</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, password: e.target.value})}}
                        type="password"
                        password= "password"
                        placeholder="password"
                        className="input-text"
                        value={formData.password}
                    ></input>
                <button type="submit">{isLogin === 1 ? "Login" : "Signup"}</button>
            </form>
            }
        </div>
    )
}

export default Authentication