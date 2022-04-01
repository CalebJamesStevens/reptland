import {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Conditional from '../code-managment/Conditional';
import AddPetPopup from '../tools/add-pet-popup';
import PetCard from '../tools/pet-card'
import PetCardExpanded from '../tools/pet-card-expanded'

function Tracker () {
    const [pets, setPets] = useState([]);
    const [expansionPet, setExpanstionPet] = useState();
    const [expansionVisible, setExpansionVisible] = useState(false);
    const [addPetPopupVisible, setAddPetPopupVisible] = useState(false);
    const navigate = useNavigate();


    const getPets = () => {
        fetch('/api/pets/users-pets')
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error(data.error)
                return navigate('/')
            }
            console.log(data)
            setPets(data.pets)
        })
    }

    const addPet = (e, body) => {
        e.preventDefault();


        fetch('/api/pets/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                return console.error(data.error);
            }
        });
    }

    const test_addPet = (e) => {
        e.preventDefault();

        const body = {
            newPet: {
                name: "Test Name",
                bio: "",
                species: "Test Species",
                morph: "Test Morph",
                gender: true,
                birthday: new Date(2018, 8),
                weight: 1200,
                length: 50
            }
        }
        

        fetch('/api/pets/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                return console.error(data.error);
            }
        });
    }

    const handlePetExpansion = (pet) => {
        setExpanstionPet(pet);
        setExpansionVisible(true);
    }
    
    const closePetExpansion = (e) => {
        if(e.target === e.currentTarget) {
            setExpansionVisible(false);
         }
    }

    useEffect(() => {
        getPets();
    }, [])

    return (
        <main className='tracker-container'>
            <section className='add-pet-card'>
                <button className='clickable button-style-2' onClick={() => setAddPetPopupVisible(true)}>Add Pet</button>
            </section>
            <Conditional condition={addPetPopupVisible}>
                <AddPetPopup addPet={addPet} setVisible={setAddPetPopupVisible}/>
            </Conditional>
            {pets.length > 0 && pets.map(pet => {
                return (
                    <PetCard key={pet._id} handleExpansion={handlePetExpansion} pet={pet}/>
                )
            })}

            <PetCardExpanded handleExpansion={closePetExpansion} pet={expansionPet} visible={expansionVisible}/>
        </main>
    )
}

export default Tracker;