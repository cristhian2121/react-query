import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from 'react-query'

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

const defaultData = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
]

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient()

  
 
  // replace with useQuery
  const { data, isError, isLoading, isFetching } = useQuery(["post", currentPage], () => fetchPosts(currentPage),{ 
    // initialData: defaultData,
     staleTime: 2000,
     keepPreviousData: true
     })

  useEffect(() => {
    if(currentPage < maxPostPage){
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["post", nextPage], () => fetchPosts(nextPage), { staleTime: 2000})
    }
  }, [currentPage, queryClient])


  if(isError) return <div>Error</div>
  if(isLoading) return <div>Loading</div>
  // if(isFetching) return <div>Fetching</div>

  

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
