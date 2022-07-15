import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../services/AuthProvider';
import AuthServices from '../services/AuthServices';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [loadingUser, setLoadingUser] = useState(false);
  // const [error, setError] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const componentDidMount = async () => {

      const accessString = auth?.accessToken;
      const id = auth?.id;

      if (accessString == null) {
        this.setState({ loadingUser: false, error: false });
      }

      await AuthServices.getUserById(id, accessString)
        .then(response => {
          console.log("El access string: " + accessString)
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        })
    }

    componentDidMount()
      .catch(console.error);

  })


  const Logout = async () => {
    setAuth({});
    navigate('/');
  }

  return (
    <div>
      Hola soy el DASHBOARD
      <button onClick={Logout}>Cerrar Sesion</button>
    </div>
  )

}

export default Dashboard;