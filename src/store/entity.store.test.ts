import entityStore from "./entity.store";

const getAllByTypeMock = jest.fn();

jest.mock("@prismicio/client", () => {
    return ({
        createClient: jest.fn(() => ({
            getAllByType: getAllByTypeMock,
            getByID: jest.fn(),
            query: jest.fn(),
            queryContentFromRef: jest.fn(),
        })),
    })
});

describe("entityStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should initialize with default state", async () => {

        // Mock the response from getAllByType
        getAllByTypeMock.mockReturnValue([]);

        const store = await entityStore.getStore();
        expect(store).toEqual({
            recipes: new Map(),
            categories: new Map(),
            authors: new Map(),
        });
    });

    test("should fetch entities and cache entities", async () => {

        getAllByTypeMock.mockImplementation((entity: string) => {
            switch (entity) {
                case "recipe":
                    return [
                        { id: "1", data: { name: "Recipe 1" } },
                        { id: "2", data: { name: "Recipe 2" } },
                    ];
                case "category":
                    return [
                        { id: "3", data: { name: "Category 1" } },
                        { id: "4", data: { name: "Category 2" } },
                        { id: "5", data: { name: "Category 3" } },
                    ];
                case "author":
                    return [
                        { id: "6", data: { name: "Author 1" } },
                        { id: "7", data: { name: "Author 2" } },
                        { id: "8", data: { name: "Author 3" } },
                        { id: "9", data: { name: "Author 4" } },
                    ];
                default:
                    return [];
            }
        });

        const store = await entityStore.getStore();

        // Check if the entities were cached
        expect(store.recipes.size).toEqual(2);
        expect(store.categories.size).toEqual(3);
        expect(store.authors.size).toEqual(4);
    });
});