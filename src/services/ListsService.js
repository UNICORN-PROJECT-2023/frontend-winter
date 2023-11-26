import { get, post, put, remove } from "./ApiService";

export async function getLists() {
    const response = await get(`/lists`).catch((error) => {
        console.error(error);
    });
    
    if(response?.status == 201 || response?.status == 200 )  {
        const {body} = await response.json();
        
        return { success: true, body, message: "Načtení listu proběhlo úspěšně" };
    }

    return { success: false, message: "Načtení listu se nezdařilo" };
  }


export async function getListById(id) {
    const response = await get(`/list/`+ id).catch((error) => {});

    if(response?.status == 201 || response?.status == 200 )  {
        const {body} = await response.json();
        
        return { success: true, body, message: "Načtení listu proběhlo úspěšně" };
    }

    return { success: false, message: "Načtení listu se nezdařilo" };
}


export async function createList(data) {
    const response = await post(`/list`, data).catch((error) => {});

    if(response?.status == 201 || response?.status == 200 )  {
        const {body} = await response.json();
        
        return { success: true, body, message: "Vytvoření listu proběhlo úspěšně" };
    }

    return { success: false, message: "Vytvoření listu se nezdařilo" };
}

export async function updateList(id, data) {
    const response = await put(`/list/`+ id, data).catch((error) => {});

    if(response?.status == 201 || response?.status == 200 )  {
        const {body} = await response.json();
        
        return { success: true, body, message: "Aktualizace listu proběhlo úspěšně" };
    }

    return { success: false, message: "Aktualizace listu se nezdařilo" };
}

export async function deleteList(id) {
    const response = await remove(`/list/`+ id).catch((error) => {});

    if(response?.status == 201 || response?.status == 200 )  {
        const {body} = await response.json();
        
        return { success: true, body, message: "Smazání listu proběhlo úspěšně" };
    }

    return { success: false, message: "Smazání listu se nezdařilo" };
}
