import { useState } from 'react';
import './App.css';

function App() {

    const [text, setText] = useState({
        content:'', author:''
    });
    const [allText, setAllText] = useState([]);
    const [editText, setEditText] = useState(null);


    function onChangeText(event) {


        const { name, value } = event.target
        setText((prevText) => {
            return {
                ...prevText,
                [name]: value
            }
        });

    }

    function onTextSubmit(event) {
        event.preventDefault();

        if (text.author !== '') {

            setAllText((prev) => {

                const newText = {...text};
                newText.id = Date.now().toString();
                return [newText, ...prev]
            });
        }
        
    }

    function onDelete(textID) {
        setAllText((prevAllText) => {
            return  prevAllText.filter((theText) => {
                return theText.id !== textID 
            });
        });
    }


    function onChangeEditText(event) {

        const { name, value } = event.target

        setEditText((prev) => {
            return { ...prev, [name]:value }
        });
    }
    

    function onEditTextSubmit(event) {

        // event.preventDefault()

        setAllText((prev) => {
            return prev.map((theText) => {
                if (theText.id !== editText.id) return theText;
                return editText;
            });
        });

        setEditText(null);

    }


    //Elements
    const elementText = allText.map((i) => {
        return (
            <div  className='app-content' key={i.id} >
                <p>{i.author}</p>
                <div className='option-content'>
                    <div onClick={() => {onDelete(i.id)}} className='option-btn' >Delete</div>
                    <div className='sep'> | </div>
                    <div onClick={() => {setEditText(i)}} className='option-btn' >Edit</div>
                </div>
        
        </div>
        )
    });


    let editElement = null
    if (!!editText) {
        editElement = (
            <div className='edit-container'>
                <div className='edit-bg' onClick={() => {setEditText(null)}} ></div>
                <div className='edit-content'>
                    <form onSubmit={onEditTextSubmit}>
                        <p className='edit-header'>Edit</p>
                        <input 
                            name='author' 
                            value={editText.author} 
                            type='text' onChange={onChangeEditText} 
                            placeholder='Enter text here'
                            />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                
            </div>
        )
    }



    return (
        <div className="App">
        <form onSubmit={onTextSubmit}>
            <input name='author' type='text' placeholder='Enter Text' value={text.author} onChange={onChangeText} />
    
            <button type='submit' >Click here</button>

        </form>
        {elementText}
        {editElement}

        </div>
    );
}

export default App;
