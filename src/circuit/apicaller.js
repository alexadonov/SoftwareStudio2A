export const saveCircuit = (student_id, circuit_name, circuit_input, circuit_output_json) => {
    const url = "http://13.211.191.11:8000/api/save-circuit";
    var data = JSON.stringify({
        student_id: student_id,
        circuit_name: circuit_name,
        circuit_input: circuit_input,
        circuit_output_json: circuit_output_json
    });
    
    fetch(url, {
        method: "POST",
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    })
    .then(response => {
    console.log(response)
    })
    .catch(err => {
    console.log(err);
    });
}

export const getResults = (circuit_input) => {
    const url = "http://0.0.0.0:8000/api/calculate";


    var data = JSON.stringify({
        circuit_input: JSON.stringify(circuit_input)
    });
    
    console.log(data);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => {
    console.log(response)
    })
    .catch(err => {
    console.log(err);
    });
    
}