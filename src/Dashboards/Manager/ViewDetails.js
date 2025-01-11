// import React from 'react';
// import './styles/ViewDetails.css'


// function ViewDetails({ morning, afternoon, evening, onClose }) {

//   return (
//     <div className="viewdetails-modal-overlay">
//       <div className="viewdetails-modal-content">
//         <h2 className="viewdetails-heading">Meal Details</h2>
//         <div className="viewdetails-meal-shift-container">
//           {/* Morning Shift */}
//           <div className="viewdetails-meal-shift viewdetails-morning">
//             <h3 className="viewdetails-shift-heading">Morning</h3>
//             <p><strong className="viewdetails-meal-label">Meal:</strong> {morning.details}</p>
//             <p><strong className="viewdetails-meal-label">Ingredients:</strong> {morning.ingredients}</p>
//             <p><strong className="viewdetails-meal-label">Instructions:</strong> {morning.instructions}</p>
//           </div>

//           {/* Afternoon Shift */}
//           <div className="viewdetails-meal-shift viewdetails-afternoon">
//             <h3 className="viewdetails-shift-heading">Afternoon</h3>
//             <p><strong className="viewdetails-meal-label">Meal:</strong> {afternoon.details}</p>
//             <p><strong className="viewdetails-meal-label">Ingredients:</strong> {afternoon.ingredients}</p>
//             <p><strong className="viewdetails-meal-label">Instructions:</strong> {afternoon.instructions}</p>
//           </div>

//           {/* Evening Shift */}
//           <div className="viewdetails-meal-shift viewdetails-evening">
//             <h3 className="viewdetails-shift-heading">Evening</h3>
//             <p><strong className="viewdetails-meal-label">Meal:</strong> {evening.details}</p>
//             <p><strong className="viewdetails-meal-label">Ingredients:</strong> {evening.ingredients}</p>
//             <p><strong className="viewdetails-meal-label">Instructions:</strong> {evening.instructions}</p>
//           </div>
//         </div>
//         <button className="viewdetails-close-btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }

// export default ViewDetails;



import React , {useEffect} from 'react';
import './styles/ViewDetails.css'; // CSS file for the modal

const ViewDetails = React.memo(({ morning, afternoon, evening, onClose , taskid , selectedtask  })=> {


  useEffect(() => { console.log('mounted'); }, [])
  
  return (
   <div className='parent' >
     <div className="view-modal-overlay">
      <div className="view-modal-content">
        <h2>Meal Details</h2>
        <table className="meal-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Details</th>
              <th>Ingredients</th>
              <th>Instructions</th>
              <th>Pantry Status</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Morning</td>
              <td>{morning.details || 'N/A'}</td>
              <td>{morning.ingredients || 'N/A'}</td>
              <td>{morning.instructions || 'N/A'}</td>
              <td style={{
  color: 
    morning.status === 'Pending' ? 'red' : 
    morning.status === 'In Progress' ? 'orange' : 
    morning.status === 'Done' ? 'green' : 'black'
}}>
  {morning.status || 'N/A'}
</td>


<td style={{
  color: 
    morning.Delivery_Status === 'Pending' ? 'red' : 
    morning.Delivery_Status === 'In Progress' ? 'orange' : 
    morning.Delivery_Status === 'Delivered' ? 'green' : 'black'
}}>
  {morning.Delivery_Status || 'N/A'}
</td>



            </tr>
            <tr>
              <td>Afternoon</td>
              <td>{afternoon.details || 'N/A'}</td>
              <td>{afternoon.ingredients || 'N/A'}</td>
              <td>{afternoon.instructions || 'N/A'}</td>
              <td style={{
  color: 
    afternoon.status === 'Pending' ? 'red' : 
    afternoon.status === 'In Progress' ? 'orange' : 
    afternoon.status === 'Done' ? 'green' : 'black'
}}>
  {afternoon.status || 'N/A'}
</td>


<td style={{
  color: 
    afternoon.Delivery_Status === 'Pending' ? 'red' : 
    afternoon.Delivery_Status === 'In Progress' ? 'orange' : 
    afternoon.Delivery_Status === 'Delivered' ? 'green' : 'black'
}}>
  {afternoon.Delivery_Status || 'N/A'}
</td>



            </tr>
            <tr>
              <td>Evening</td>
              <td>{evening.details || 'N/A'}</td>
              <td>{evening.ingredients || 'N/A'}</td>
              <td>{evening.instructions || 'N/A'}</td>
              <td style={{
  color: 
    evening.status === 'Pending' ? 'red' : 
    evening.status === 'In Progress' ? 'orange' : 
    evening.status === 'Done' ? 'green' : 'black'
}}>
  {evening.status || 'N/A'}
</td>



<td style={{
  color: 
    evening.Delivery_Status === 'Pending' ? 'red' : 
    evening.Delivery_Status === 'In Progress' ? 'orange' : 
    evening.Delivery_Status === 'Delivered' ? 'green' : 'black'
}}>
  {evening.Delivery_Status || 'N/A'}
</td>


            </tr>
          </tbody>
        </table>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
   </div>
  );
})


export default ViewDetails;
