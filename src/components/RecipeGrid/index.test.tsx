import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecipeTileSliceDefaultPrimaryRecipesItem } from "../../../prismicio-types";
import RecipeGrid from './index';
import { Content } from '@prismicio/client';
import userEvent from '@testing-library/user-event';

test('renders empty state when no recipes are passed', () => {
    render(
        <RecipeGrid
            recipes={[]}
            store={{
                recipes: new Map(),
                categories: new Map(),
                authors: new Map(),
            }}
        />
    );
    expect(screen.getByText(/no recipes found/i)).toBeInTheDocument();
});

test('renders single recipes are passed', () => {

    const recipeId = '1';
    const mock: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipeId,
            uid: 'test-recipe',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe Title To Find',
                ingredients: [],
                instructions: [],
                cooking_time: '30 minutes',
                servings: '4',
                category: {
                    id: '1',
                    uid: 'test-category',
                    type: 'category',
                    lang: 'en-us',
                    data: {
                        name: 'Test Category',
                        description: 'This is a test category',
                    },
                },
                author: {
                    id: '1',
                    uid: 'test-author',
                    type: 'author',
                    lang: 'en-us',
                    data: {
                        name: 'Test Author',
                        bio: 'This is a test author',
                    },
                },
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe',
            isBroken: false,
            url: 'https://example.com/test-recipe',
        }
    };

    const recipeStore = new Map<string, Content.RecipeDocument>();
    recipeStore.set(recipeId, mock.recipe as unknown as Content.RecipeDocument);

    render(
        <RecipeGrid
            recipes={[mock]}
            store={{
                recipes: recipeStore,
                categories: new Map(),
                authors: new Map(),
            }}
        />
    );
    expect(screen.getByText(/Test Recipe Title To Find/i)).toBeInTheDocument();
});

test('renders multiple recipes when passed', () => {
    const recipe1Id = '1';
    const recipe2Id = '2';

    const mockRecipe1: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipe1Id,
            uid: 'test-recipe-1',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe 1',
                ingredients: [],
                instructions: [],
                cooking_time: '20 minutes',
                servings: '2',
                category: null,
                author: null,
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe-1',
            isBroken: false,
            url: 'https://example.com/test-recipe-1',
        }
    };

    const mockRecipe2: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipe2Id,
            uid: 'test-recipe-2',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe 2',
                ingredients: [],
                instructions: [],
                cooking_time: '40 minutes',
                servings: '6',
                category: null,
                author: null,
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe-2',
            isBroken: false,
            url: 'https://example.com/test-recipe-2',
        }
    };

    const recipeStore = new Map<string, Content.RecipeDocument>();
    recipeStore.set(recipe1Id, mockRecipe1.recipe as unknown as Content.RecipeDocument);
    recipeStore.set(recipe2Id, mockRecipe2.recipe as unknown as Content.RecipeDocument);

    render(
        <RecipeGrid
            recipes={[mockRecipe1, mockRecipe2]}
            store={{
                recipes: recipeStore,
                categories: new Map(),
                authors: new Map(),
            }}
        />
    );

    expect(screen.getByText(/Test Recipe 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Recipe 2/i)).toBeInTheDocument();
});

test('filters recipes by author', async () => {
    const recipeId = '1';
    const authorId = 'author-1';

    const mockRecipe: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipeId,
            uid: 'test-recipe',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe',
                ingredients: [],
                instructions: [],
                cooking_time: '30 minutes',
                servings: '4',
                category: null,
                author: {
                    id: authorId,
                    uid: 'test-another-author',
                    type: 'author',
                    lang: 'en-us',
                    data: {
                        name: 'Test Author',
                        bio: 'This is a test author',
                    },
                },
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe',
            isBroken: false,
            url: 'https://example.com/test-recipe',
        }
    };

    const recipeStore = new Map<string, Content.RecipeDocument>();
    recipeStore.set(recipeId, mockRecipe.recipe as unknown as Content.RecipeDocument);

    const authorStore = new Map<string, Content.AuthorDocument>();
    authorStore.set(authorId, {
        id: authorId,
        uid: 'test-author',
        type: 'author',
        lang: 'en-us',
        data: {
            name: 'Test Author',
            bio: 'This is a test author',
        },
    } as unknown as Content.AuthorDocument);

    const anotherAuthorId = 'author-2';
    authorStore.set(anotherAuthorId, {
        id: anotherAuthorId,
        uid: 'test-author',
        type: 'author',
        lang: 'en-us',
        data: {
            name: 'Another Author',
            bio: 'This is a another author',
        },
    } as unknown as Content.AuthorDocument);

    render(
        <RecipeGrid
            recipes={[mockRecipe]}
            store={{
                recipes: recipeStore,
                categories: new Map(),
                authors: authorStore,
            }}
        />
    );

    const authorSelect = screen.getByTestId('author-selector');
    expect(authorSelect).toBeInTheDocument();

    // Simulate selecting the author
    screen.getByText(/Another Author/i).click();
    await userEvent.selectOptions(authorSelect, anotherAuthorId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByText(/no recipes found/i)).toBeInTheDocument();
});

test('filters recipes by category', async () => {
    const recipeId = '1';
    const categoryId = 'category-1';

    const mockRecipe: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipeId,
            uid: 'test-recipe',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe',
                ingredients: [],
                instructions: [],
                cooking_time: '30 minutes',
                servings: '4',
                category: {
                    id: categoryId,
                    uid: 'test-category',
                    type: 'category',
                    lang: 'en-us',
                    data: {
                        name: 'Test Category',
                        description: 'This is a test category',
                    },
                },
                author: null,
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe',
            isBroken: false,
            url: 'https://example.com/test-recipe',
        }
    };

    const recipeStore = new Map<string, Content.RecipeDocument>();
    recipeStore.set(recipeId, mockRecipe.recipe as unknown as Content.RecipeDocument);

    const categoryStore = new Map<string, Content.CategoryDocument>();
    categoryStore.set(categoryId, {
        id: categoryId,
        uid: 'test-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'Test Category',
            description: 'This is a test category',
        },
    } as unknown as Content.CategoryDocument);

    const anotherCategoryId = 'category-2';
    categoryStore.set(anotherCategoryId, {
        id: anotherCategoryId,
        uid: 'another-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'Another Category',
            description: 'This is another category',
        },
    } as unknown as Content.CategoryDocument);

    const moreCategoryId = 'category-3';
    categoryStore.set(moreCategoryId, {
        id: moreCategoryId,
        uid: 'more-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'More Category',
            description: 'This is more category',
        },
    } as unknown as Content.CategoryDocument);

    render(
        <RecipeGrid
            recipes={[mockRecipe]}
            store={{
                recipes: recipeStore,
                categories: categoryStore,
                authors: new Map(),
            }}
        />
    );

    const categorySelect = screen.getByTestId('category-selector');
    expect(categorySelect).toBeInTheDocument();

    // Simulate selecting the category
    screen.getByText(/Another Category/i).click();
    await userEvent.selectOptions(categorySelect, anotherCategoryId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByText(/no recipes found/i)).toBeInTheDocument();
});

test('renders recipes with both author and category filters applied', async () => {
    const recipeId = '1';
    const authorId = 'author-1';
    const categoryId = 'category-1';

    const mockRecipe: RecipeTileSliceDefaultPrimaryRecipesItem = {
        recipe: {
            id: recipeId,
            uid: 'test-recipe',
            type: 'recipe',
            lang: 'en-us',
            data: {
                title: 'Test Recipe',
                ingredients: [],
                instructions: [],
                cooking_time: '30 minutes',
                servings: '4',
                category: {
                    id: categoryId,
                    uid: 'test-category',
                    type: 'category',
                    lang: 'en-us',
                    data: {
                        name: 'Test Category',
                        description: 'This is a test category',
                    },
                },
                author: {
                    id: authorId,
                    uid: 'test-author',
                    type: 'author',
                    lang: 'en-us',
                    data: {
                        name: 'Test Author',
                        bio: 'This is a test author',
                    },
                },
            },
            link_type: 'Document',
            tags: [],
            slug: 'test-recipe',
            isBroken: false,
            url: 'https://example.com/test-recipe',
        }
    };

    const recipeStore = new Map<string, Content.RecipeDocument>();
    recipeStore.set(recipeId, mockRecipe.recipe as unknown as Content.RecipeDocument);

    const authorStore = new Map<string, Content.AuthorDocument>();
    authorStore.set(authorId, {
        id: authorId,
        uid: 'test-author',
        type: 'author',
        lang: 'en-us',
        data: {
            name: 'Test Author',
            bio: 'This is a test author',
        },
    } as unknown as Content.AuthorDocument);

    const categoryStore = new Map<string, Content.CategoryDocument>();
    categoryStore.set(categoryId, {
        id: categoryId,
        uid: 'test-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'Test Category',
            description: 'This is a test category',
        },
    } as unknown as Content.CategoryDocument);

    const anotherCategoryId = 'category-2';
    categoryStore.set(anotherCategoryId, {
        id: anotherCategoryId,
        uid: 'another-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'Another Category',
            description: 'This is another category',
        },
    } as unknown as Content.CategoryDocument);

    const moreCategoryId = 'category-3';
    categoryStore.set(moreCategoryId, {
        id: moreCategoryId,
        uid: 'more-category',
        type: 'category',
        lang: 'en-us',
        data: {
            name: 'More Category',
            description: 'This is more category',
        },
    } as unknown as Content.CategoryDocument);

    render(
        <RecipeGrid
            recipes={[mockRecipe]}
            store={{
                recipes: recipeStore,
                categories: categoryStore,
                authors: authorStore,
            }}
        />
    );

    const authorSelect = screen.getByTestId('author-selector');
    const categorySelect = screen.getByTestId('category-selector');
    expect(authorSelect).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();

    // Simulate selecting the author and category
    await userEvent.selectOptions(authorSelect, authorId);
    await userEvent.selectOptions(categorySelect, categoryId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();
});