import axios from 'axios'

export const register = newUser => {
    return axios.post('/register', {
        student_id: newUser.student_id,
        is_admin: newUser.is_admin,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        confirm_admin: newUser.confirm_admin
    }).then(res => {
        localStorage.setItem('regoSuccess', 'True');
        console.log(res);
    }, error => {
        if (error.response.status !== 201) {
            localStorage.setItem('regoSuccess', 'False');
        }
    })
}

export const login = user => {
    return axios.post('login', {
        email: user.email,
        password: user.password
    }).then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('successful', 'True');
        return res.data;
    }, error => {
        if (error.response.status === 401) {
            localStorage.setItem('successful', 'False');
        }
    })
}