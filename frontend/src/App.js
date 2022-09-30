import 'bootstrap/dist/css/bootstrap.min.css';
import { gql, useQuery } from '@apollo/client';
import User from './Components/User'
import Login from './Components/Login';
import Posts from './Components/Posts';

const FETCH_USER = gql`
  query{
    users{
      id
      username
      age
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(FETCH_USER)

  if (error) {
    return <h1>Something went wrong</h1>
  }
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (data) {
    return (
      <div className='container'>
        <h1 className='text-center'>Book Store</h1>
        <Login />
        <br />
        <div className='row'>
          {data.users.map(usr => {
            return <User user={usr} key={usr.id} />
          })}
        </div>
        <br />

      </div>
    );
  }

}

export default App;
