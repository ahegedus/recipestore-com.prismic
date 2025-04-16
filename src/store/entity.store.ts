import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";

/**
 * Fetches all entities of a given type from Prismic and returns them as a Map.
 * @param entity - The type of entity to fetch (e.g., "category", "author", "recipe").
 * @returns A Promise that resolves to a Map containing the fetched entities.
 */
const getEntityMap = async (entity: "category" | "author" | "recipe", categoryFilterUid?: string): Promise<unknown> => {
  const client = createClient();
  const map = new Map<string, unknown>();

  const response = categoryFilterUid
    ? await client.getAllByType(entity, {
      filters: [
        filter.at("my.recipe.category", categoryFilterUid),
      ]
    })
    : await client.getAllByType(entity);

  response.reduce((acc, item: any) => {
    acc.set(item.id, item);
    return acc;
  }, map);

  console.log(`Fetched ${response.length} ${entity}(s)`, categoryFilterUid);

  return map;
};

const load = async (categoryFilterUid?: string) => {
  const recipeMap = await getEntityMap("recipe", categoryFilterUid) as Map<string, Content.RecipeDocument>;
  const authorMap = await getEntityMap("author") as Map<string, Content.AuthorDocument>;
  const categoryMap = await getEntityMap("category", categoryFilterUid) as Map<string, Content.CategoryDocument>;

  return {
    recipes: recipeMap,
    authors: authorMap,
    categories: categoryMap,
  };
}

// const getCategoryMap = async () => {
//   const client = createClient();
//   const recipeMap = new Map<string, unknown>();
//   await client.getAllByType("recipe", {
//     graphQuery: `{
//           recipe {
//             title
//             category {
//               name
//               description
//               cover_image
//             }
//             image
//             author {
//               name
//               bio
//               profile_image
//             }
//           }
//         }`
//   }).then((response) => response.reduce((acc, recipe: any) => {
//     acc.set(recipe.id, recipe);
//     return acc;
//   }, recipeMap));
//   return recipeMap;
// };

const store = {
  getStore: load,
};

export default store;