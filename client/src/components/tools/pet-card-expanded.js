import { useEffect, useRef, useState } from 'react';
import {calculate_age, getTime} from '../../custom-utils/dates'
import { feedResult, getPetGender, recordPetFed, recordPetLength, recordPetWeight } from './petsController';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Conditional from '../code-managment/Conditional';

function PetCardExpanded ({handleExpansion, pet, visible}) {
    const [updatedWeight, setUpdatedWeight] = useState();
    const [updatedLength, setUpdatedLength] = useState();
    const [updatedFeed, setUpdatedFeed] = useState();
    const [fedDate, setFedDate] = useState(new Date());
    const fedFood = useRef();

    const handleFoodUpdate = (result) => {
        console.log(fedFood.current.value)
        console.log(fedDate)
        console.log(result)
        
        setUpdatedFeed({
            food: fedFood.current.value,
            time: fedDate,
            result: result
        })
    }

    

    const graphDateFormatter = (format) => {
        return `${getTime(format).month} / ${getTime(format).day}`
    }

    const graphCentimetersFormatter = (format) => {
        return `${format}cm`
    }

    const graphGramsFormatter = (format) => {
        return `${format}g`
    }

    if (!visible) return <></>;

    return (
        <section onClick={(e) => handleExpansion(e)} className='expanded-pet-card-container'>
            <section className='expanded-pet-card'>
                <div className='expanded-pet-card-name'>{pet.name}</div>
                <div className='expanded-pet-attributes'>{`${getPetGender(pet.gender)} ${pet.morph} ${pet.species}` }</div>
                <div className='expanded-pet-age'>{calculate_age(pet.birthday)}</div>
                
                <section className='expanded-pet-main-updates-container'>
                    <section className='main-update-item'>
                        <div className='expanded-pet-input-container-1'>
                            <input className='number-input-1' onChange={(e) => setUpdatedWeight(e.target.value)} type='text' inputMode='numeric'/>
                            <span> grams</span>
                        </div>
                        <button className='clickable expanded-pet-card-button-1' onClick={(e) => recordPetWeight(e, {_id: pet._id, weight: updatedWeight})}>Update Weight</button>
                    </section>

                    <section className='main-update-item'>
                        <div className='expanded-pet-input-container-1'>
                            <input className='number-input-1' onChange={(e) => setUpdatedLength(e.target.value)} type='text' inputMode='numeric'/>
                            <span> cm</span>
                        </div>
                        <button className='clickable expanded-pet-card-button-1' onClick={(e) => recordPetLength(e, {_id: pet._id, length:updatedLength})}>Update Length</button>
                    </section>

                    <section className='main-update-item'>
                        <div className='expanded-pet-input-container-2'>
                            <div className='vertical-layout'>
                                <label>Food fed:</label>
                                <input ref={fedFood} type='text'/>
                            </div>
                            <div>
                                <label>Day fed:</label>
                                <DatePicker selected={fedDate} onChange={(date) => {setFedDate(date)}} />
                            </div>
                            <div role={'radiogroup'}>
                                <label htmlFor='accepted'>
                                    Accepted
                                    <input id='accepted' name='result' type='radio' value={0} onChange={(e) => handleFoodUpdate(e.target.value)}/>
                                </label>
                                <label htmlFor='refused'>
                                    Refused
                                    <input id='refused' name='result' type='radio' value={1} onChange={(e) => handleFoodUpdate(e.target.value)}/>
                                </label>
                                <label htmlFor='regurgitated'>
                                    Regurgitated
                                    <input id='regurgitated' name='result' type='radio' value={2} onChange={(e) => handleFoodUpdate(e.target.value)}/>
                                </label>
                            </div>
                        </div>
                        <button className='clickable expanded-pet-card-button-1' onClick={(e) => recordPetFed(e, {_id: pet._id, lastFed:updatedFeed})}>Add food</button>
                    </section>
                </section>
                
                <Conditional condition={pet.recordedFeeds}>
                    <section aria-labelledby='recorded-feeds-header' className='recorded-feeds-container'>
                        <h3 id='recorded-feeds-header'>Recorded Feeds</h3>
                        <div className='recorded-feeds'>
                            {pet.recordedFeeds.map((feed, index) => {
                                return (
                                    <div key={index} className='recorded-feed-item'>
                                        <div>
                                            {feed.food}
                                        </div>
                                        <div>
                                            {feedResult(feed.result)}
                                        </div>
                                        <div>
                                            {`${getTime(feed.time).month} / ${getTime(feed.time).day}`}
                                        </div>
                                    </div>
                                )
                                
                            })} 
                        </div>
                    </section>
                </Conditional>
                <Conditional condition={pet.recordedWeights}>
                    <section className='expanded-pet-graph'>
                        Weight Graph
                        <ResponsiveContainer>
                            <LineChart width={600} height={300} data={pet.recordedWeights} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                                <CartesianGrid stroke="white" strokeDasharray="5 5" />
                                <XAxis stroke="white" dataKey="time" tickFormatter={(format) => graphDateFormatter(format)}/>
                                <YAxis stroke="white" tickFormatter={(format) => graphGramsFormatter(format)}/>
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>

                    </section>
                </Conditional>
                <Conditional condition={pet.recordedLengths}>
                    <section className='expanded-pet-graph'>
                        Length Graph
                        <ResponsiveContainer>
                            <LineChart width={600} height={300} data={pet.recordedLengths} margin={{ top: 5, right: 0, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="length" stroke="#8884d8" />
                                <CartesianGrid stroke="white" strokeDasharray="5 5" />
                                <XAxis  stroke={"white"} dataKey={"time"} tickFormatter={(format) => graphDateFormatter(format)}/>
                                <YAxis stroke="white" tickFormatter={(format) => graphCentimetersFormatter(format)} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </section>
                </Conditional>
            </section>
        </section>
    )
}


export default PetCardExpanded;