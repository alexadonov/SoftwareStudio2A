const proxy = "http://13.239.134.106:8000/api/"; 
//const proxy = "http://127.0.0.1:8000/api/";

export const saveCircuit = async (student_id, circuit_name, circuit_input, circuit_output_json) => {
    const url = proxy + "save-circuit";
    var data = JSON.stringify({
        'student_id': student_id,
        'circuit_name': circuit_name,
        'circuit_input': circuit_input,
        'circuit_output_json': circuit_output_json
    });
    
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    const parsedData = await response.json();
    console.log('parsedData:', parsedData);
}

export const submitCircuit = async (student_id, circuit_name) => {
    const url = proxy + "submit";
    var data = JSON.stringify({
        'student_id': student_id,
        'circuit_name': circuit_name
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
}

export const getResults = async (circuit_input) => {
    const url = proxy + "calculate";
    var data = JSON.stringify({
        'circuit_input': JSON.stringify(circuit_input)
    });

    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    const parsedData = await response.json();
    const status = await response.status;
    console.log('data:', data);
    console.log('parsedData:', parsedData);
    console.log('status:', status);
    if (status == "200")
        return parsedData;
    else
        return; // Handle error here
}

export const healthCheck = async () => {
    const url = proxy;

    var response = await fetch(url, {
        method: 'GET'
    });

    var status = await response.status;
    console.log('health response:', response);
    console.log('health status:', status);
}