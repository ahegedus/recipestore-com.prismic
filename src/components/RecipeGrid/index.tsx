"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Content, FilledContentRelationshipField } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { RecipeTileSliceDefaultPrimaryRecipesItem } from "../../../prismicio-types";

interface RecipeGridProps {
    recipes: RecipeTileSliceDefaultPrimaryRecipesItem[];
    store: {
        recipes: Map<string, Content.RecipeDocument>;
        categories: Map<string, Content.CategoryDocument>;
        authors: Map<string, Content.AuthorDocument>;
    };
    categoryFilter?: string;
}

interface FilterOption {
    id: string;
    name: string;
}

const RecipeGrid: FC<RecipeGridProps> = ({ recipes, store }) => {
    const [authorFilters, setAuthorFilters] = useState<FilterOption[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string>("");
    const [categoryFilters, setCategoryFilters] = useState<FilterOption[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const filteredRecipes = useMemo(() => {
        return recipes.filter((item) => {
            const recipe = store.recipes.get((item.recipe as FilledContentRelationshipField<"recipe">).id) as Content.RecipeDocument;
            const authorId = (recipe?.data.author as FilledContentRelationshipField<"author">)?.id;
            const categoryId = (recipe?.data.category as FilledContentRelationshipField<"category">)?.id;

            const matchesAuthor = selectedAuthor ? authorId === selectedAuthor : true;
            const matchesCategory = selectedCategory ? categoryId === selectedCategory : true;
            return matchesAuthor && matchesCategory;
        });
    }, [recipes, selectedAuthor, selectedCategory, store.recipes]);

    useEffect(() => {
        const fetchFilters = async () => {
            const authors = Array.from(store.authors.values()).map((author) => ({
                id: author.id,
                name: author.data.name ?? '',
            }));
            const categories = Array.from(store.categories.values()).map((category) => ({
                id: category.id,
                name: category.data.name ?? '',
            }));
            setAuthorFilters(authors);
            setCategoryFilters(categories);
        };

        fetchFilters();
    }, [store.authors, store.categories]);

    const onAuthorChange = useCallback((value: string): void => {
        setSelectedAuthor(value);
    }, []);

    const onCategoryChange = useCallback((value: string): void => {
        setSelectedCategory(value);
    }, []);

    return (
        <>
            <section className="mb-4 flex gap-4">
                <div style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
                    <select data-testid="author-selector" onChange={(e) => onAuthorChange(e.target.value)} defaultValue="">
                        <option value="">
                            Select Author
                        </option>
                        {authorFilters.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                    {categoryFilters.length > 2 && (
                        <select data-testid="category-selector" onChange={(e) => onCategoryChange(e.target.value)} defaultValue={""}>
                            <option value="">
                                Select Category
                            </option>
                            {categoryFilters.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>)}
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map((item, i) => {
                    const recipe = store.recipes.get((item.recipe as FilledContentRelationshipField<"recipe">).id) as Content.RecipeDocument;
                    const category = store.categories.get((recipe?.data.category as FilledContentRelationshipField<"category">)?.id) as Content.CategoryDocument;
                    const author = store.authors.get((recipe?.data.author as FilledContentRelationshipField<"author">)?.id) as Content.AuthorDocument;

                    return (
                        <PrismicNextLink field={recipe?.data.receipe_page} key={i + recipe?.id} className="border p-4 rounded">
                            <PrismicImage field={recipe?.data.image} className="w-full h-auto mb-2" style={{ maxHeight: '290px', objectFit: 'cover' }} />
                            <h2 className="text-xl font-bold">{recipe?.data.title}</h2>
                            <p>{category?.data.name}</p>
                            <p>{author?.data.name}</p>
                        </PrismicNextLink>
                    );
                })}
                {filteredRecipes.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                        <p className="text-gray-500">No recipes found.</p>
                    </div>
                )}
            </section>
        </>
    );
};

export default RecipeGrid;