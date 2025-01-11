import DeliveryHome from "../Dashboards/Delivery/Home";
import ManagerHome from "../Dashboards/Manager/Home";
import MealPlan from "../Dashboards/Manager/MealPlan";
import ViewDetails from "../Dashboards/Manager/ViewDetails";
import PantryHome from "../Dashboards/Pantry/Home";
import LoginPage from "../UserFlow/Login"
import RegisterPage from "../UserFlow/Register";

const routes = [


    {path : "/" , element : <LoginPage/>},
    {path : '/signup' , element : <RegisterPage/>},

    {path:"/manager" , element : <ManagerHome/>}, 
    {path : "/manager/:OID" , element : <MealPlan/>},
   



    {path : '/pantry' , element : <PantryHome/>},
    {path : "/delivery" , element : <DeliveryHome/>}
    
];


export default routes