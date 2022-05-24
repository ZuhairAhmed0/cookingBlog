/*<div class="ingredientList">
                        
                    </div>
 */ 

const ingredientList = document.querySelector('.ingredientList');
const addIngredientsBtn = document.querySelector('#addIngredientsBtn');

addIngredientsBtn.addEventListener('click', () => {
    const newInput = 
    `<div class="ingredientDev mb-1">
        <input type="text" name="ingredients" id="ingredients" class="form-control">
    </div>`
    ingredientList.insertAdjacentHTML('beforeend', newInput);
})