const proxy = "http://13.239.134.106:8000/api/"
//const proxy = "http://127.0.0.1:8000/api/"

export const saveCircuit = async (student_id, circuit_name, circuit_input, circuit_output_json) => {
    try {
        const url = proxy+"save-circuit";
        var data = JSON.stringify({
            student_id: student_id,
            circuit_name: circuit_name,
            circuit_input: circuit_input,
            circuit_output_json: circuit_output_json
        });
        
        var response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });
        var status = await response.status;
        return status == "200";

    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}

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

export const loadCircuit = async () => {
    try {
        const url = proxy + "load-circuit";

        var response = await fetch(url, {
            method: 'GET'
        });

        var status = await response.status;
        console.log('health response: ', response);
        console.log('health status: ', status);
    } catch (error) {
        console.log(error);
        alert(`An error occured: "${error}"`);
    }
}