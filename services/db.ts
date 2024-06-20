
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('vocabularyWithNotifications.db')
export default db;
