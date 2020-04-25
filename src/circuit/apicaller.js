export const saveCircuit = (studentid, circuit_input, circuit_output_json) => {
    fetch("13.211.191.11:8000/api/save-circuit", {
        "method": "POST",
        "body": JSON.stringify({
            "studentid": studentid,
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