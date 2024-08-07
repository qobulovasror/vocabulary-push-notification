
import * as SQLite from 'expo-sqlite'

const db = await SQLite.openDatabaseAsync('vocabularyWithNotifications.db')
export default db;
