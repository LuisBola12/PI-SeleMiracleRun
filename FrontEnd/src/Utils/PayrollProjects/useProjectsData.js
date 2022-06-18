import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateActiveProject } from '../../Slices/projectSlice/activeProjectSlice';

export const useProjectsData = () => {
  const [ projects, setProjects ] = useState( [] );
  const emailFromUser = useSelector( ( state ) => state.user.user.Email );
  const rolFromUser = useSelector( ( state ) => state.user.user.Roles );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState( false );
  const [ needToRefresh ,setNeedToRefresh  ] = useState( false );

  useEffect( () => {
    const getData = async () => {
      try {
        setLoading( true );
        const response = await fetch( `http://localhost:4000/projects/${emailFromUser}/${rolFromUser}` );
        if ( !response.ok ) {
          setLoading( false );
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setProjects( actualData );
      } catch ( err ) {
        setProjects( null );
      } 
      setLoading( false );
    };
    getData();
    setNeedToRefresh( false );
  }, [ needToRefresh ] );
  
  const handleProjectSelection = ( projectName ) => {
    dispatch( updateActiveProject( projectName ) );
    rolFromUser === 'admin' ?
      ( navigate( '/employees' ) ) :
      ( navigate( '/home' ) );
  };

  return {
    projects,
    handleProjectSelection,
    setNeedToRefresh, loading
  };
};
