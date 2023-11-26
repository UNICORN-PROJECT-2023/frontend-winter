import { createServer } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = ''; 
      this.urlPrefix = 'http://localhost:8080'; 

      // Mocked route for /api/v1/lists with a 3-second delay
      this.get('/api/v1/lists', () => {
        return new Promise(resolve => {
          setTimeout(() => resolve({
            body: {
              data: [
                { id: 1, name: "My first list", type: "owner", status: "active" },
                { id: 2, name: "My second list", type: "owner", status: "active" },
                { id: 3, name: "Shared list", type: "member", status: "active" },
                { id: 4, name: "Archived list", type: "owner", status: "archived" }
              ]
          }
          }), 2000);  
        });
      });

      this.get('/api/v1/list/:id', () => {
        return new Promise(resolve => {
          setTimeout(() => resolve({
            body: {
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
          }), 2000);  
        });
      });

      // Mocked route for creating a list
      this.post('/api/v1/list', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        // Here, you would typically add logic to create a list
        // For mock, we're just returning the submitted data
        return new Response(201, {}, { data: attrs });
      });

      // Mocked route for updating a list
      this.put('/api/v1/list/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        // Here, you would typically add logic to update the list
        // For mock, we're just returning the updated data
        return new Response(200, {}, { id, data: attrs });
      });

      // Mocked route for deleting a list
      this.delete('/api/v1/list/:id', (schema, request) => {
        const id = request.params.id;
        // Here, you would typically add logic to delete the list
        // For mock, we're just confirming deletion
        return new Response(200, {}, { message: `List ${id} deleted` });
      });

      this.passthrough();
    },
  });
}
