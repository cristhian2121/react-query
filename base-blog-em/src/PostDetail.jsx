import { useQuery, useMutation } from 'react-query'

async function fetchComments(postId) {
  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  console.log('url: ', url);
  const response = await fetch(url);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, isLoading } = useQuery(['postDetail',post.id], () => fetchComments(post.id), { staleTime: 2000 });
  
  // Mutation
  const deleteMutation = useMutation((postId) => deletePost(postId))
  const updateMutation = useMutation((postId) => updatePost(postId))

  if(isError) return <div>Error</div>
  if(isLoading || !data) return <div>loading</div>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {/* Delete */}
      {
        deleteMutation.isError && (<p style={{color: "red"}}>Error deleting the post</p>)
      }
      {
        deleteMutation.isLoading && (<p style={{color: "purple"}}>Deleting the post</p>)
      }
      {
        deleteMutation.isSuccess && (<p style={{color: "green"}}>Ok</p>)
      }
      {/* Update */}
      {
        updateMutation.isError && (<p style={{color: "red"}}>Error updating the post</p>)
      }
      {
        updateMutation.isLoading && (<p style={{color: "purple"}}>Updating the post</p>)
      }
      {
        updateMutation.isSuccess && (<p style={{color: "green"}}>Ok</p>)
      }

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
