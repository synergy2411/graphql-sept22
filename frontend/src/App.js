import 'bootstrap/dist/css/bootstrap.min.css';
import { gql, useQuery } from '@apollo/client';
import User from './Components/User'

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
        <div className='row'>
          {data.users.map(usr => {
            return <User user={usr} key={usr.id} />
          })}
        </div>
      </div>
    );
  }

}

export default App;
