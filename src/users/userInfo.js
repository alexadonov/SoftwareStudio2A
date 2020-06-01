import axios from 'axios'

export const register = async newUser => {
    try {
        const res = await axios.post('/register', {
            student_id: newUser.student_id,
            is_admin: newUser.is_admin,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
            confirm_admin: newUser.confirm_admin
        });
        if (res.status === 201) localStorage.setItem('regoSuccess', 'True');
        else localStorage.setItem('regoSuccess', 'False');
        console.log(res);
    }
    catch (error) {
        if (error.response.status !== 201) {
            localStorage.setItem('regoSuccess', 'False');
        }
    }
}

export const login = async user => {
    try {
        const res = await axios.post('login', {
            email: user.email,
            password: user.password
        });
      localStorage.setItem('student_id', res.data.student_id);

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('successful', 'True');
        localStorage.setItem('isAdmin', res.data.is_admin);
        return res.data;
    }
    catch (error) {
        if (error.response.status === 401) {
            localStorage.setItem('successful', 'False');
        }
    }
}