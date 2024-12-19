import {
    HfInference
} from "@huggingface/inference";




const SYSTEM_PROMPT = `
You are a helpful assistant that generates recipes based on the ingredients a user provides. 

Instructions:
1. Suggest a recipe using some or all of the ingredients they mention.
2. The recipe can include up to 3 additional ingredients that they did not mention.
3. Clearly format the recipe in markdown, including:
   - A title (use a level-2 heading).
   - An ingredients list (as a bullet list).
   - Step-by-step instructions (as a numbered list).

Make sure the response is user-friendly and well-structured for easy rendering on a web page.
`;


const hf = new HfInference(
    import.meta.env.VITE_RECIPE_APP_TOKEN);

export async function getRecipeFromMistral(ingredientsArr) {
    if (ingredientsArr.length === 0) {
        throw new Error('Ingredients list is empty.');
    }
    const ingredientsStr = ingredientsArr.join(', ');

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [{
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `I have ${ingredientsStr}. Please give me a recipe that I can make with those ingredients.`
                }
            ],
            max_tokens: 1024,
        });

        const recipe = response.generated_text;

        if (!recipe || recipe.trim() === '') {
            throw new Error('The AI did not generate a valid recipe.');
        }

        return recipe;
    } catch (error) {
        console.error('Error fetching recipe:', error.message);
        return 'Sorry, no recipe could be generated at this time. Please try again later.';
    }
}