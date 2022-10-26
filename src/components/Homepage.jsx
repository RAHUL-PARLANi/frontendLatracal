import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import axios from 'axios'
const Homepage = () => {
 const [noPlate, setNoPlate] = useState('');
 const [name, setName] = useState('');
 const [data1,setData1]=useState([]);
 const [allDate,setAllData]=useState([]);
 useEffect(() => {
   axios.get('https://relaxed-biscuit-86b1d6.netlify.app/.netlify/functions/api/data/').then(res=>{setData1(res.data)})
   axios.get('https://relaxed-biscuit-86b1d6.netlify.app/.netlify/functions/api/data/all').then(res=>{setAllData(res.data)})
 })
 
 function handleSubit(e){
    e.preventDefault();
    var date=new Date();
    const ctr=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    const data={
        "driverName":name,
        "numberPlate":noPlate,
        "checkInTime":ctr
    }
    axios.post('https://relaxed-biscuit-86b1d6.netlify.app/.netlify/functions/api/data/add',data)
    alert('Thanks for Checking in');
}
function checkout(id){
    var date=new Date();
    const ctr=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    axios.post('https://relaxed-biscuit-86b1d6.netlify.app/.netlify/functions/api/data/update/'+id,{'checkOutTime':ctr})
    alert('Succesfully Checkout')
}
  return (
    <div>
        <Navbar/>
        <div className='Numb'>
            
        <div style={{'marginTop':'20px','marginBottom':'20px','fontSize':'22px','color':'rgb(123, 65, 247)','fontWeight':'600','textAlign':'center','padding':'10px','margin':'10px','backgroundColor':'white', "boxShadow":  "5px 5px 26px #ededed,-5px -5px 26px #ffffff"
 }}>
                Park Your Vehicle
            </div>
            <form className='VechileBox' onSubmit={handleSubit} style={{'marginLeft':'auto','marginRight':'auto'}}>
                    <div><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbm5BJ4HJKBkAJLoUCJyn0zuGtSltWZCJJGw&usqp=CAU'} alt='Car logo'/></div>
                    <div className='Box-details'>
                        <div className='points'>
                            <input value={noPlate} required onChange={e=>{setNoPlate(e.target.value)}} placeholder='Number Plate'/>
                        </div>
                        <div className='points'>
                            <input value={name} required onChange={e=>{setName(e.target.value)}} placeholder='Driver Name'/>
                        </div>
                        <div className='points'>
                            <div className='tag-details'  ><button type='submit' className='checkout-button'>Checkin Now</button></div>
                        </div>
                    </div>
            </form>
            
            <div style={{ 'marginTop':'30px','fontSize':'22px','color':'rgb(123, 65, 247)','fontWeight':'600','textAlign':'center','padding':'10px','margin':'10px','backgroundColor':'white', "boxShadow":  "5px 5px 26px #ededed,-5px -5px 26px #ffffff"
 }}>
                Garage
            </div>
            <div className="Box1">
            <div className='total-Vechicles'>{data1.length}</div>
            <div className='tag'>Number of Vehicles</div>
            </div>
            
            <div className='all-vechicles'>
                {data1.map(e=>{
                    return(
                        <div className='VechileBox' key={e._id}>
                        <div><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbm5BJ4HJKBkAJLoUCJyn0zuGtSltWZCJJGw&usqp=CAU'} alt='Car logo'/></div>
                        <div className='Box-details'>
                        <div className='points'>
                            <div className='tag'>Number Plate</div>
                            <div className='tag-details'>{e.numberPlate}</div>
                        </div>
                        <div className='points'>
                            <div className='tag'>Driver Name</div>
                            <div className='tag-details'>{e.driverName}</div>
                        </div>
                        <div className='points'>
                            <div className='tag'>Checkin Timing</div>
                            <div className='tag-details'>{e.checkInTime}</div>
                        </div>
                        <div className='points'>
                            <div className='tag-details' ><button onClick={()=>{checkout(e._id)}} className='checkout-button'>Checkout</button></div>
                        </div>
                        </div>
                        </div>
                        
                    )
                })}
                
            </div>
            <div style={{ 'marginTop':'30px','fontSize':'22px','color':'rgb(123, 65, 247)','fontWeight':'600','textAlign':'center','padding':'10px','margin':'10px','backgroundColor':'white', "boxShadow":  "5px 5px 26px #ededed,-5px -5px 26px #ffffff"
 }}>
                History
            </div>
            <div className='all-vechicles'>
                {allDate.filter(e=>{
                    return e.checkOutTime !== "N/A"
                }).map(e=>{return(
                    <div className='VechileBox'>
                    <div><img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbm5BJ4HJKBkAJLoUCJyn0zuGtSltWZCJJGw&usqp=CAU'} alt='Car logo'/></div>
                    <div className='Box-details'>
                        <div className='points'>
                            <div className='tag'>Number Plate</div>
                            <div className='tag-details'>{e.numberPlate}</div>
                        </div>
                        <div className='points'>
                            <div className='tag'>Driver Name</div>
                            <div className='tag-details'>{e.driverName}</div>
                        </div>
                        <div className='points'>
                            <div className='tag'>Checkin Timing</div>
                            <div className='tag-details'>{e.checkInTime}</div>
                        </div>
                        <div className='points'>
                            <div className='tag'>Checkout Timing</div>
                            <div className='tag-details'>{e.checkOutTime}</div>
                        </div>
                    </div>
                </div>
                
                )
                })}
                
            </div>
       
        </div>
    </div>
  )
}

export default Homepage