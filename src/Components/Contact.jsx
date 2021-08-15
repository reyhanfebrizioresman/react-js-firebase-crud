import React, {useState,useEffect} from 'react'
import ContactForm from './ContactForm'
import firebaseDB from '../firebase'
const Contact = () => {
    const [contactObj,setContactObj] = useState({});
    const [currentId,setCurrentId] = useState('');
    useEffect(() => {
        firebaseDB.child('contacts').on('value', snapshot=>{
            // jika value tidak null maka kita update setCollectionObject
            if(snapshot.val()!= null )
                setContactObj({
                    ...snapshot.val()
                })
            else
                setContactObj({})
        })
    }, [])
    const addOrEdit = obj =>{
        if(currentId == '')
        firebaseDB.child('contacts').push(
            obj,
            err => {
                if (err)
                    console.log(err)
                else
                    setCurrentId('')
            }
            )
        else
            firebaseDB.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
                )
    }

    const onDelete = key => {
        if(window.confirm('Apakah anda akan menghapus data ini?'))
        firebaseDB.child(`contacts/${key}`).remove(
            err => {
                if (err)
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
                <h1 className="display-4 text-center">Contact Register</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <ContactForm {...({addOrEdit, currentId, contactObj})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>FullName</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObj).map(id => {
                                return <tr key={id}>
                                    <td>{contactObj[id].fullName}</td>
                                    <td>{contactObj[id].mobile}</td>
                                    <td>{contactObj[id].email}</td>
                                    <td>{contactObj[id].address}</td>
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

export default Contact
