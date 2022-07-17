import { useState } from 'react';

const usePost = ( url, methodReq = 'POST' ) => {
  const [ postError, setPostError ] = useState( null );
  const post = async ( JSONBody ) => {
    try {
      const postFetch = await fetch( url, {
        method: methodReq,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSONBody
      } );
      console.log( postFetch );
      return true;
    } catch ( error ) {
      setPostError( error );
    }
  };

  return { postError, post };

};
export default usePost;

