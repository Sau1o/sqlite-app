import { Input } from '@/components/Input'
import { useState, useEffect } from 'react'
import {View, Button, Alert, FlatList} from 'react-native'

import {useProductDatabase, ProductDatabase} from "@/database/useProductDatabase"
import { Product } from '@/components/Producti'

export default function Index(){
    const [id,setId] = useState("")
    const [name,setName] = useState("")
    const [search,setSearch] = useState("")
    const [quantity, setQuantity] = useState("")
    const [products, setProducts] = useState<ProductDatabase[]>([])

    const productDatabase = useProductDatabase()

    async function create(){
        try{
            if(isNaN(Number(quantity))){
               return Alert.alert("Quantidade","A quantidade precisa ser um numero")
            }
        const response = await productDatabase.create({name, quantity:Number(quantity)})


        list()
        Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
        } catch(error){
            console.log(error)
        }
    }

    async function  list() {
        try{
            const response = await productDatabase.searchByName(search)
            setProducts(response)
        }catch{

        }
    }

    useEffect(()=> {
        list()
    },[search])

    return (
    <View style={{flex: 1, justifyContent:"center", padding: 32, gap: 16}}>
        <Input placeholder='Nome' onChangeText={setName} value={name}/>
        <Input placeholder='Quantidade' onChangeText={setQuantity} value={quantity}/>

        <Button title="Salvar" onPress={create}/>

        <Input placeholder='Pesquisar' onChangeText={setSearch} />

        <FlatList 
            data={products}
            keyExtractor={(item)=>String(item.id)}
            renderItem={({item})=><Product data={item} />}
            contentContainerStyle={{gap: 16}}
        />
    </View>
    )
}