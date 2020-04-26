export const saveCircuit = (studentid, circuit_name, circuit_input, circuit_output_json) => {
    const url = "http://13.211.191.11:8000/api/save-circuit";
    fetch(url, {
        "method": "POST",
        "body": JSON.stringify({
            "studentid": studentid,
            "circuit_name": circuit_name,
            "circuit_input": circuit_input,
            "circuit_output_json": circuit_output_json
        })
    })
    .then(response => response.json())
    .then(response => {
    console.log(response)
    })
    .catch(err => {
    console.log(err);
    });
}