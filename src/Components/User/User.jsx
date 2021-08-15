import React,{useState,useEffect} from 'react';
import UserForm from './UserForm';
import firebaseDB from '../../firebase';
const User = () => {

        const [UserObj,setUserObj] = useState({});
        const [currentId,setCurrentId] = useState('');
        useEffect(() => {
            firebaseDB.child('user').on('value', snapshoot=>{
                if(snapshoot.val()!= null){
                    setUserObj({
                        ...snapshoot.val()
                    })
                }
                else
                    setUserObj({})
            })
        }, [])

        const addOrEdit = obj =>{
            if(currentId == '')
                firebaseDB.child('user').push(
                obj,
                err=>{
                    if(err)
                    console.log(err)
                else
                    setCurrentId('')
                }
            )
            else
            firebaseDB.child(`user/${currentId}`).set(
                obj,
                err=>{
                    if(err)
                    console.log(err)
                else
                    setCurrentId('')
                }
            )
        }
        const onDelete = key =>{
            if(window.confirm('Apakah anda akan menghapusnya'))
            firebaseDB.child(`user/${key}`).remove(
                err=>{
                    if(err)
                    console.log(err)
                else
                    setCurrentId('')
                }
            )
        }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">User Register</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <UserForm {...({addOrEdit,currentId,UserObj})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>UserName</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(UserObj).map(id => {
                                return <tr key={id}>
                                    <td>{UserObj[id].userName}</td>
                                    <td>{UserObj[id].numberPhone}</td>
                                    <td>{UserObj[id].address}</td>
                                    {/* <td>{contactObj[id].address}</td> */}
                                    <td>
                                        <a href="#" className="btn text-primary btn-sm" onClick={()=> setCurrentId(id)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#" className="btn text-danger btn-sm" onClick={()=> onDelete(id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default User
