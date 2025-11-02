export const getNotes = async () => {
    try {
        const response = await fetch('http://192.168.1.8:3000/api/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const { notes } = await response.json();

        return { notes };
    } catch (error) {
        console.log("Error in fetching the data...", error);
    }
}

export const addNotes = async (data) => {
    try {
        const response = await fetch('http://192.168.1.8:3000/api/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.log("Error in adding the data...", error);
    }
}

export const deleteNote = async (id) => {
    try {
        const response = await fetch(`http://192.168.1.8:3000/api/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.log("Error in deleting the data...", error);
    }
}