import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase = {
    id: number
    name: string
    quantity: number
}

export function useProductDatabase(){
    const database = useSQLiteContext()
    
    async function create(data: Omit<ProductDatabase,"id">){
        const statement = await database.prepareAsync(
            "INSERT INTO  products (name, quantity) VALUES($name,$quantity)"
        )

        try{
            const result = await statement.executeAsync({
                $name:data.name,
                $quantity:data.quantity,
            })

            const insertedRowId = result.lastInsertRowId.toString()

            return {insertedRowId}
        }catch(error){
            throw error
        }
    }
    return{create}
}