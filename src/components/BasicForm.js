import { useReducer } from "react";

const initialState = {
  firstName: '',
  firstNameValidation: true,
  lastName: '',
  lastNameValidation: true,
  emailAddress: '',
  emailAddressValidation: true
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        ...prevState,
        firstName: action.firstName
      }
    case 'LASTNAME_INPUT':
      return {
        ...prevState,
        lastName: action.lastName
      }
    case 'EMAIL_INPUT':
      return {
        ...prevState,
        emailAddress: action.emailAddress
      }
    case 'NAME_BLUR':
      return {
        ...prevState,
        firstNameValidation: /^[A-Z]/.test(prevState.firstName) && !/\d/.test(prevState.firstName) && prevState.firstName.trim() !== ''
      }
    case 'LASTNAME_BLUR':
      return {
        ...prevState,
        lastNameValidation: /^[A-Z]/.test(prevState.lastName) && !/\d/.test(prevState.lastName) && prevState.lastName.trim() !== ''
      }
    case 'EMAIL_BLUR':
      return {
        ...prevState,
        emailAddressValidation: prevState.emailAddress.includes('@') && prevState.emailAddress.trim() !== ''
      }
    case 'CLEAR':
      return initialState
    default:
      return prevState
  }
}

const BasicForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nameChangeHandler = (event) => {
    dispatch({ type: 'NAME_INPUT', firstName: event.target.value })
  }

  const lastNameChangeHandler = (event) => {
    dispatch({ type: 'LASTNAME_INPUT', lastName: event.target.value })
  }

  const emailChangeHandler = (event) => {
    dispatch({ type: 'EMAIL_INPUT', emailAddress: event.target.value })
  }

  const inputNameBlur = () => {
    dispatch({ type: 'NAME_BLUR' })
  }

  const inputLastnameBlur = () => {
    dispatch({ type: 'LASTNAME_BLUR' })
  }

  const inputEmailBlur = () => {
    dispatch({ type: 'EMAIL_BLUR' })
  }

  const nameClass = !state.firstNameValidation ? 'form-control invalid' : 'form-control'
  const lastnameClass = !state.lastNameValidation ? 'form-control invalid' : 'form-control'
  const emailClass = !state.emailAddressValidation ? 'form-control invalid' : 'form-control'

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch({ type: 'CLEAR' })
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={nameClass}>
          <label htmlFor='name'>First Name</label>
          <input
            value={state.firstName}
            type='text'
            id='name'
            onChange={nameChangeHandler}
            onBlur={inputNameBlur}
          />
          {!state.firstNameValidation && <p>The name must start with <i>capital</i> letter and can't contain a <i>number</i> and can't be <i>empty</i></p>}
        </div>
        <div className={lastnameClass}>
          <label htmlFor='name'>Last Name</label>
          <input
            value={state.lastName}
            type='text'
            id='name'
            onChange={lastNameChangeHandler}
            onBlur={inputLastnameBlur}
          />
          {!state.lastNameValidation && <p>The lastname must start with <i>capital</i> letter and can't contain a <i>number</i> and can't be <i>empty</i></p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          value={state.emailAddress}
          type='text'
          id='name'
          onChange={emailChangeHandler}
          onBlur={inputEmailBlur}
        />
        {!state.emailAddressValidation && <p>Email must include <i>@</i> and can't be <i>empty</i></p>}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
