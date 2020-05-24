const proxy = "http://13.239.134.106:8000/api/"
//const proxy = "http://127.0.0.1:8000/api/"

/*
Saves circuit using the args listed, currently does not support updating a saved circuit and returns true if successful
Status codes: 201 Created, 200 OK (i.e. updated), 400 Bad Request, 500 Internal Server Error
*/
export const saveCircuit = async (student_id, circuit_name, circuit_input, circuit_output_json, is_update=false) => {
    try {
        let url = proxy;
        if (is_update) url += "update-circuit";
        else url += "save-circuit";

        var data = JSON.stringify({
            'student_id': student_id,
            'circuit_name': circuit_name,
            'circuit_input': circuit_input,
            'circuit_output_json': circuit_output_json,
            'grade': 0
        });
        
        var response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });
        
        var status = await response.status;
        return status == "201" || status == "200";

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}

/*
Gets circuit results using circuit_input and returns JSON of results if successful
Status codes: 200 OK, 400 Bad Request
*/
export const getResults = async (circuit_input) => {
    try {
        const url = proxy + "calculate";
        var data = JSON.stringify({
            'circuit_input': (circuit_input)
        });
        console.log('data:', data);
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        let parsedData = await response.json();
        var status = await response.status;
        
        console.log('parsedData:', parsedData);
        console.log('status:', status);
        if (status == "200")
            return parsedData;

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }

}

/*
Gets circuits based on input parameters and returns JSON of query results if successful
The params argument can be defined as any dictionary with appropriately named keys with their respective value
 Valid key/value pairs include:
    student_id: "" or student_id : 1234567890,
    circuit_name: "" or circuit_name = "Sample",
    is_submitted: false or is_submitted: true,
    is_graded: false or is_graded: true,
    is_deleted: false or is_deleted: true,
i.e. for a student to view their circuits, {student_id: 1234567890}
     for admin to view all circuits, {student_id: 'all'}
     for admin to view submitted circuits, {student_id: 'all', is_submitted: true}
Status codes: 200 OK, 400 Bad Request, 500 Internal Server Error
 */
export const retrieveCircuits = async (params) => {
    try {
        const url = proxy + "retrieve-circuits";
        var data = JSON.stringify({
            params
        });
        console.log('data:', data);
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        let parsedData = await response.json();
        var status = await response.status;
        
        console.log('parsedData:', parsedData);
        console.log('status:', status);
        if (status == "200")
            return parsedData;

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
};

/*
Soft deletes circuit using student_id and circuit_name and returns true if successful
Status codes: 200 OK, 400 Bad Request, 500 Internal Server Error
*/
export const deleteCircuit = async (student_id, circuit_name) => {
    try {
        const url = proxy + "delete-circuit";

        var data = JSON.stringify({
            'student_id': student_id,
            'circuit_name': circuit_name
        });

        console.log('data:', data);
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        var status = await response.status;
        console.log('status:', status);
        return status == "200";

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}

/*
Grades circuit using student_id, circuit_name and grade and returns true if successful
Status codes: 200 OK, 400 Bad Request, 500 Internal Server Error
*/
export const gradeCircuit = async (student_id, circuit_name, grade) => {
    try {
        const url = proxy + "delete-circuit";

        var data = JSON.stringify({
            'student_id': student_id,
            'circuit_name': circuit_name,
            'grade': grade
        });

        console.log('data:', data);
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        var status = await response.status;
        console.log('status:', status);
        return status == "200";

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}

/*
Submits circuit using student_id and circuit_name and returns true if successful
Status codes: 200 OK, 400 Bad Request, 500 Internal Server Error
*/
export const submitCircuit = async (student_id, circuit_name) => {
    try {
        const url = proxy + "submit-circuit";

        var data = JSON.stringify({
            'student_id': student_id,
            'circuit_name': circuit_name
        });

        console.log('data:', data);
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        var status = await response.status;
        console.log('status:', status);
        return status == "200";

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}

/*
API Healthcheck to see if it's up and running
Status codes: 200 OK
*/
export const healthCheck = async () => {
    try {
        const url = proxy;

        var response = await fetch(url, {
            method: 'GET'
        });
    
        var status = await response.status;
        console.log('health response:', response);
        console.log('health status:', status);

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }

}