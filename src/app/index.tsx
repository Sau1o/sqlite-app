import { Input } from '@/components/Input'
import { useState } from 'react'
import {View, Button, Alert} from 'react-native'

import {useProductDatabase} from "@/database/useProductDatabase"

export default function Index(){
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [products, setProducts] = useState([])

    const productDatabase = useProductDatabase()

    async function create(){
        try{
            if(isNaN(Number(quantity))){
               return Alert.alert("Quantidade","A quantidade precisa ser um numero")
            }
        const response = await productDatabase.create({name, quantity:Number(quantity)})
        Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
        } catch(error){
            console.log(error)
        }
    }

    return (
    <View style={{flex: 1, justifyContent:"center", padding: 32, gap: 16}}>
        <Input placeholder='Nome' onChangeText={setName} value={name}/>
        <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity}/>

        <Button title="Salvar" onPress={create}/>
    </View>
    )
}