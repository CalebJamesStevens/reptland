import {useRef, useState} from 'react'

function AddPetPopup ({addPet, setVisible}) {
    const [newPetInfo, setNewPetInfo] = useState({})

    const name = useRef();
    const bio = useRef();
    const species = useRef();
    const morph = useRef();
    const [gender, setGender] = useState(true);
    const birthday = useRef();
    const weight = useRef();
    const length = useRef();

    const handleChange = () => {
        setNewPetInfo({
            newPet: {
                name: name.current.value,
                bio: bio.current.value,
                species: species.current.value,
                morph: morph.current.value,
                gender: gender,
                birthday: new Date(birthday.current.value),
                weight: weight.current.value,
                length: length.current.value
            }
            
        })
        console.log(newPetInfo)
    }

    return (
        <section className='add-pet-popup-container' aria-labelledby="add-pet-popup-header">
            <h2 id="add-pet-popup-header">Add Pet</h2>
            <form className="add-pet-form" onSubmit={(e) => {addPet(e, newPetInfo)}}>
                <label>
                    Name:
                    <input ref={name} onChange={() => {handleChange()}} type={'text'}/>
                </label>
                <label>
                    Bio:
                    <input ref={bio} onChange={() => {handleChange()}} type={'textarea'}/>
                </label>
                <label>
                    Species:
                    <input ref={species} onChange={() => {handleChange()}} type={'text'}/>
                </label>
                <label>
                    Morph:
                    <input ref={morph} onChange={() => {handleChange()}} type={'text'}/>
                </label>
                <div role={'radiogroup'}>
                    Gender:
                    <label>
                        Male:
                        <input onClick={() => {setGender(true)}} onChange={() => {handleChange()}} type={'radio'} value={true} name='gender'/>
                    </label>
                    <label>
                        Female:
                        <input onClick={() => {setGender(false)}} onChange={() => {handleChange()}} type={'radio'} value={false} name='gender'/>
                    </label>
                </div>
                <label>
                    Birthday (Close Enough):
                    <input ref={birthday} onChange={() => {handleChange()}} type={'date'}/>
                </label>
                <label>
                    Weight (g):
                    <input ref={weight} onChange={() => {handleChange()}} type={'text'} inputMode='numeric'/>
                </label>
                <label>
                    Length (cm):
                    <input ref={length} onChange={() => {handleChange()}} type={'text'} inputMode='numeric'/>
                </label>
                <input value='Add' className='clickable button-style-2' type="submit"/>
                <button onClick={() => {setVisible(false)}} className='clickable button-style-2'>Cancel</button>
            </form>
        </section>
    )
}

export default AddPetPopup;