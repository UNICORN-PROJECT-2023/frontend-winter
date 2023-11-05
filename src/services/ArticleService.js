

// it should be async function later it will fetch data from server
export async function getArticleById(id) {
    return {
        data: {
            name: "My first list",
            type: "owner",
            members: [
                {
                    id: 1,
                    title: "John Doe",
                },
            ],
            items: [
                {          
                    id: 1,
                    title: 'Groceries',
                    active: true,
                },
                {
                    id: 2,
                    title: 'Work tasks',
                    active: true,
                },
                {
                    id: 3,
                    title: 'Books to read',
                    active: true,
                },
                {
                    id: 4,
                    title: 'Travel itinerary',
                    active: false,
                },
                {
                    id: 5,
                    title: 'Gym schedule',
                    active: false,
                }     
            ]      
        }
    }
}
