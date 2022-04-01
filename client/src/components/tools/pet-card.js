import {calculate_age, getTime} from '../../custom-utils/dates'
import { feedResult } from './petsController';

function PetCard({pet,handleExpansion}) {



    return (
        <section onClick={() => {handleExpansion(pet)}} className="clickable pet-card">
            <div className="pet-card-header">
                <div className="left">
                    {pet.name + ' - ' + ' ' + (pet.gender ? 'Male ' : 'Female ') + pet.morph + ' ' + pet.species}
                </div>
                <div className="right">
                    {/* {pet.years + 'y ' + pet.months + 'm'} */}
                    {calculate_age(pet.birthday)}
                </div>
            </div>
            <div>
                <div>
                    {pet.weight + ' grams'}
                </div>
                <div className="">
                    {pet.length + ' cm'}
                </div>
                <div className="">
                    {pet.lastFed && `Last fed: ${pet.lastFed.food} on ${getTime(pet.lastFed.time).month} / ${getTime(pet.lastFed.time).day}. Result: ${feedResult(pet.lastFed.result)}`}
                </div>
            </div>
        </section>
    )
}

export default PetCard;