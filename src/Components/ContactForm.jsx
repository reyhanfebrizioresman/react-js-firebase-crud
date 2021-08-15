import React,{useState,useEffect} from 'react'

const ContactForm = ({addOrEdit,currentId,contactObj}) => {
    const initialFieldValues = {
        fullName: '',
        mobile: '',
        email: '',
        address: '',
    }
    const [values,setValues] = useState(initialFieldValues);

    useEffect(() => {
        if(currentId == '')
        setValues({
            ...initialFieldValues
        })
        else
        setValues({
            ...contactObj[currentId]
        })
    }, [currentId,contactObj])

    const handleInputChange = e => {
        const {name,value} = e.target
        setValues({
            ...values,
            [name] : value
        });
        console.log(e.target.value)
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        addOrEdit(values);
    }
    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Full Name" 
                    value={values.fullName}
                    onChange={handleInputChange}
                    name="fullName" />
                </div>
                <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input type="number" className="form-control" placeholder="Mobile" 
                    value={values.mobile}
                    onChange={handleInputChange}
                    name="mobile" />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="email" 
                    value={values.email}
                    onChange={handleInputChange}
                    name="email" />
                </div>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Address" 
                    value={values.address}
                    onChange={handleInputChange}
                    name="address" />
                </div>
                <div className="form-group">
                    <input type="submit" value={currentId == '' ? 'Save' : 'Update'} className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default ContactForm
