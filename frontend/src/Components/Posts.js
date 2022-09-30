import { gql, useQuery } from "@apollo/client";

const FETCH_POSTS = gql`
    query {
        books{
            id
            title
        }
    }
`

const Posts = () => {
    const { data, error, loading } = useQuery(FETCH_POSTS);
    console.log(data, error, loading);
    if (error) {
        return <h1>Something went wrong - {error.message}</h1>
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (data) {
        return (
            <div>
                <ul>
                    {data.books.map(book => <li key={book.id}>{book.title}</li>)}
                </ul>
            </div>
        )
    }
}

export default Posts;