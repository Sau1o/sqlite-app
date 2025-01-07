import { initializeDatabase } from '@/database/initializaDatabase'
import {Slot} from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'

export default function Layout(){
    return (
    <SQLiteProvider databaseName={'sqlite.db'} onInit={initializeDatabase}>
        <Slot />
    </SQLiteProvider>
    )
}