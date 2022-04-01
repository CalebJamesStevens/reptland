export const recordPetFed = (e, body) => {
    e.preventDefault();



    fetch('/api/pets/update', {
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
        console.log(data)
        return data;
    });
}

export const recordPetWeight = (e, body) => {
    e.preventDefault();

    

    fetch('/api/pets/update', {
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
        console.log(data)
        return data;
    });
}

export const recordPetLength = (e, body) => {
    e.preventDefault();

    

    fetch('/api/pets/update', {
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
        console.log(data)
        return data;
    });
}

export const feedResult = (result) => {
    switch (result){
        case 0:
            return 'Accepted';
        case 1:
            return 'Rejected';
        case 2:
            return 'Regurgitated';
        default:
            return 'Not recorded'    

    }

}

export const getPetGender = (bool) => {
    return bool ? 'Male' : 'Female';
}