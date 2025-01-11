import { useState } from "react";
const Modal = ({ title, shift, onClose , onShare }) => {

    const [MealPlans , setMealPlans] = useState({

        morning : {details:'' , ingredients : '' , instructions : '' , status : 'Pending'},
        afternoon : {details : '' , ingredients : '' , instructions:'' , status : 'Pending'},
        evening : {details : '' , ingredients : '' , instructions:'' , status : 'Pending'}
             
      })
    
    
    const handleInputChange = (shift, field, value) => {
        setMealPlans((prevPlans) => ({
          ...prevPlans,
          [shift]: { ...prevPlans[shift], [field]: value },
        }));
      };



    

    const HandleSubmit = (e)=>{
          
        e.preventDefault()

        onShare({ [shift]: MealPlans[shift] }, shift);

    }
    

    return (
    <div className={`mealplan-modal mealplan-modal-${shift}`}>
      <div className="mealplan-modal-content">
        <h2>{title}</h2>
        <form onSubmit={(e)=>HandleSubmit(e)} >
          <label className="mealplan-label">
            Meal Details:
          </label>

          <textarea
              className="mealplan-textarea"
              value={MealPlans[shift].details}
              name='details'
              onChange={(e) => handleInputChange(shift, 'details', e.target.value)}
              
              placeholder="Enter meal details..."
              required
            ></textarea>


  

          <label className="mealplan-label">
            Ingredients:
            <textarea
              className="mealplan-textarea"
              value={MealPlans[shift].ingredients}
              name="ingredients"
              onChange={(e) => handleInputChange(shift, 'ingredients', e.target.value)}
              placeholder="Enter ingredients..."
              required
            ></textarea>
          </label>
          <label className="mealplan-label">
            Specific Instructions:
            <textarea
              className="mealplan-textarea"
              name="instructions"
              value={MealPlans[shift].instructions}
              onChange={(e) => handleInputChange(shift, 'instructions', e.target.value)}
              placeholder="e.g., No salt, low sugar..."
              required
            ></textarea>
          </label>
          <div className="mealplan-modal-actions">
            <button
              type="button"
              className="mealplan-btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mealplan-btn-save"
             
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}


  export default Modal