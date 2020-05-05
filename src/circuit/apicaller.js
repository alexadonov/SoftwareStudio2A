export const saveCircuit = async (student_id, circuit_name, circuit_input, circuit_output_json) => {
    const url = "http://13.211.191.11:8000/api/save-circuit";
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
    /*
    .then(response => {
    console.log(response)
    })
    .catch(err => {
    console.log(err);
    });
    */
}

export const getResults = async (circuit_input) => {
    const url = "http://127.0.0.1:8000/api/calculate";
    var data = JSON.stringify({
        circuit_input: JSON.stringify(circuit_input)
    });
    //console.log(data);
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    var status = await response.status;
    console.log(data);
    console.log(response.json);
    console.log(status);
    if (status == "200")
        return response.json;
    else
        return;
    
}