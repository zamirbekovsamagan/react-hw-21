import {useState, useEffect} from 'react'

const SimpleInput = (props) => {
  const [enteredName,setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched

  useEffect(()=>{
    if(enteredNameIsValid){
      setFormIsValid(true)
    }else{
      setFormIsValid(false)
    }
  },[enteredNameIsValid])

  const nameInputChangeHandler = (event) =>{
    setEnteredName(event.target.value)
  }

  const nameInputBlurHandler = () =>{
    setEnteredNameTouched(true)
  }

  const formSubmissionHandler = (event) =>{
    event.preventDefault()
    setEnteredNameTouched(true)
    if(!enteredNameIsValid){
      return
    }
    setEnteredNameTouched(false)
  }
  const nameInputClasses = nameInputIsValid ? 'form-control invalid' : 'form-control'


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        type='text' 
        id='name'
        value={enteredName} 
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler}
        />
        {nameInputIsValid && <p>Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
