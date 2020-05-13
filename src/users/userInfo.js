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
        console.log(res);
    })
}

export const login = user => {
    return axios.post('login', {
        email: user.email,
        password: user.password
    }).then(res => {
        localStorage.setItem('successful', res.data.authenticated);
        if (localStorage.successful != "False") {
            localStorage.setItem('token', res.data.token);
            return res.data;
        } else {
            console.log(res);
        }
    })
}