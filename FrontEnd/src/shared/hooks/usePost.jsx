import { useState } from 'react';

const usePost = (url) => {
  const [postError, setPostError] = useState(null);

  const post = async (JSONBody) => {
    try {
      const postFetch = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSONBody
      });
      console.log(postFetch);
    } catch (error) {
      setPostError(error);
    }


  };

  return { postError, post };

};
export default usePost;

