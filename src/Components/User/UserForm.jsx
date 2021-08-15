import React,{useState,useEffect} from 'react'

const UserForm = ({addOrEdit,UserObj,currentId}) => {
    const initialFieldValues = {
        userName: '',
        numberPhone: '',
        address: '',
        gender: '',
    }
    const [userValue,setUserValue] = useState(initialFieldValues);

    useEffect(() => {
        if(currentId == '')
            setUserValue({
                ...initialFieldValues
            })
            else
            setUserValue({
                ...UserObj[currentId]
            })
        
    }, [UserObj,currentId])

    const handleInputChange = e => {
        const {name,value} = e.target
            setUserValue({
                ...userValue,
                [name]: value
            })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        addOrEdit(userValue)
    }
    return (
        <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Full Name" 
                    value={userValue.userName}
                    onChange={handleInputChange}
                    name="userName" />
                </div>
                <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input type="number" className="form-control" placeholder="numberPhone" 
                    value={userValue.numberPhone}
                    onChange={handleInputChange}
                    name="numberPhone" />
                </div>
                {/* <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="email" 
                    value={values.email}
                    onChange={handleInputChange}
                    name="email" />
                </div> */}
                <div className="form-group">
                    <textarea className="form-control" placeholder="Address" 
                    value={userValue.address}
                    onChange={handleInputChange}
                    name="address" />
                </div>
                <div className="form-group">
                    <input type="submit" value='Save' className="btn btn-primary btn-block" />
                </div>
                </div>
            </form>
        </div>
    )
}

export default UserForm
