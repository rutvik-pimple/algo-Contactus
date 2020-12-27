import React,{ useState } from 'react'
import './Contactus.css'
import {firedata} from '../App'



function Contactus() {
    const [input, setinput] = useState(
        {
          name: "",
          lastname: "",
          email: "",
          message: ""
        }
      );
    const [message, setMessage] = useState("")

      const handlechange = (e) => {
        let dup = input;
        dup[e.target.name] = e.target.value;
        setinput(dup);
      };

      function addToDb(){
        // fireDb.child('bookings').on('value',snapshot=>{
        //     if (snapshot.val()!=null){
        //         obj = snapshot.val()
        //     }
            
        // })
        
        firedata.child('contactus-info').push(input,err=>{
            console.log(err)
        })
        setMessage("Submited Successfully")

    }


    return (
        <div className="contactus">
            <h3>{message}</h3>
            <div className="form">
                <h1>Contact Us Form</h1>
                <label>Name:</label><br/>
                <input type="text" name="name" onChange={handlechange} /><br/>
                <label>LastName:</label><br/>
                <input type="text" name="lastname" onChange={handlechange} /><br/>
                <label>Email:</label><br/>
                <input type="text" name="email" onChange={handlechange} /><br/>
                <label>Message:</label><br/>
                <textarea type="text" name="message" onChange={handlechange} /><br/>
                <button onClick={addToDb}>Submit</button>
            </div>
        </div>
    )
}

export default Contactus
