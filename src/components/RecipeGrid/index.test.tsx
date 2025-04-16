import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecipeTileSliceDefaultPrimaryRecipesItem } from "../../../prismicio-types";
import RecipeGrid from './index';
import { Content } from '@prismicio/client';

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
