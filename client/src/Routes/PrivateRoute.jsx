import {  useSelector } from "react-redux";
import { Navigate} from 'react-router-dom';
function PrivateRoute({children}) {
    const {auth,admin} = useSelector((store) => store.auth)

      if(!auth){
       return<Navigate to="/login"/>
        }
       else if (admin){
        return<Navigate to="/admin"/>
       }
     else{
          return (children)
      }
}

export default PrivateRoute