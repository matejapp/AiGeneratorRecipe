import React from 'react'

const RecipeForm = ({ingredientsListItems,generateRecipe}) => {
  
  

  return (
        <>
          <section>
                <h2 className='title'>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredientsListItems.length >= 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={generateRecipe}>Get a recipe</button>
                </div>}
          </section>
        </>
            
  )
}

export default RecipeForm