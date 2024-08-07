import db from "./db";


const createDataTable = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL)`
  );
  addDefaultData()
};

const addDefaultData = async () => {
  await db.execAsync(``)
}

// const setDataToDB = () => {
//   try {
//     db.transaction((tx) => {
//       tx.executeSql("INSERT INTO tokens (name, value) VALUES (?, ?)", [
//         name,
//         value,
//       ]);
//     });
//   } catch (error) {
//     alert(error);
//   }
// };

// const getToken = (name) => {
//   return new Promise((resolve, reject) => {
//     try {
//       db.transaction((tx) => {
//         tx.executeSql(
//           "SELECT value FROM tokens WHERE name = ?",
//           [name],
//           (tx, results) => {
//             if (results.rows.length > 0) {
//               resolve(results.rows.item(0).value);
//             } else {
//               resolve(null);
//             }
//           },
//           (error) => {
//             console.log("err");
//             reject(error);
//           }
//           );
//         });
//       } catch (error) {
//         console.log('err');
//         reject(error);
//     }
//   });
// };

// const deleteToken = (name) => {
//   db.transaction((tx) => {
//     tx.executeSql("DELETE FROM tokens WHERE name=?", [name]);
//   });
// };

export { 
    createDataTable, 
    // setTokenToDB, 
    // getToken, 
    // deleteToken 
};