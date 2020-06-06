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
        
        console.log(res);
        const status = await res.status;
        return status === 201;
    }
    catch (error) {
        console.log(error);
        //alert(`An error occured: "${error}"`);
        return false;
    }
}

export const login = async user => {
    try {
        const res = await axios.post('login', {
            email: user.email,
            password: user.password
        });
        
        const status = await res.status;
        if (status === 200) {
            localStorage.setItem('token', res.data.token);
            if (res.data.is_admin) localStorage.setItem('admin_id', res.data.student_id);
            else localStorage.setItem('student_id', res.data.student_id);
            localStorage.setItem('is_admin', res.data.is_admin);
        }
        return status === 200;
    }
    catch (error) {
        console.log(error);
        //alert(`An error occured: "${error}"`);
        return false;
    }
}