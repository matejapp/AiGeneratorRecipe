import React, { useState } from 'react';
import RecipeForm from './RecipeForm';
import { getRecipeFromMistral } from '../ai.js';
import Recipe from './Recipe.jsx';


const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState();
  

  function handleSubmit(formData) {
    const newIngredient = formData.get('ingredient');

    if (ingredients.includes(newIngredient)) {
      return alert('Ingredient already added');
    }

    if (newIngredient.trim() !== '') {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  function cleanUpResponse(response) {
  if (!response) return 'No recipe generated. Please try again.';
  
  // Remove unnecessary whitespace, newlines, or gibberish
  const cleaned = response
    .replace(/User.*?\n/g, '') // Remove irrelevant "User" lines
    .replace(/`+/g, '')       // Remove stray backticks
    .replace(/^\s*$/, '')     // Remove empty lines
    .trim();

  return cleaned || 'The recipe could not be generated. Please add more ingredients or try again.';
}



 function generateRecipe() {
    setRecipe(null); // Clear previous recipe
    getRecipeFromMistral(ingredients)
        .then((response) => {
            const cleanedRecipe = cleanUpResponse(response);
            setRecipe(cleanedRecipe);
        })
        .catch((error) => {
            console.error('Error generating recipe:', error);
            setRecipe('An error occurred while generating the recipe. Please try again later.');
        });
}



  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
  <main>
    <form action={handleSubmit} className='add-ingredient-form'>
      <input aria-label='Add ingredient' type='text' placeholder='e.g. oregano' name='ingredient' />
      <button>Add ingredient</button>
    </form>

    {ingredients.length > 0 && (
      <RecipeForm ingredientsListItems={ingredientsListItems} generateRecipe={generateRecipe} />
    )}

    {recipe === null ? (
      <p>Generating your recipe... Please wait.</p>
    ) : recipe ? (
      <Recipe generatedRecipe={recipe} />
    ) : null}
  </main>
)};


export default Main
