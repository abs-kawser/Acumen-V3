import {db} from './MainDatabase';

// const db = openDatabase({ name: 'UserDatabase.db' });

export const initDraftDatabase = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='draft_table'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS draft_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS draft_table(Draft_id INTEGER PRIMARY KEY AUTOINCREMENT, ActivityBy INTEGER, DeviceActivityId VARCHAR(50), DeviceSystemDateTime TEXT, CustomerId VARCHAR(50),Notes VARCHAR(500), ActivityStartTime TEXT,ActivityEndTime TEXT)',
            [],
          );
        } else {
          console.log('already created draft table');
        }
      },
    );
  });
};


// working code 

// export const insertDraftItems = (
//   ActivityBy,
//   DeviceActivityID,
//   DeviceSystemDateTime,
//   CustomerId,
//   Notes,
//   ActivityStartTime,
//   ActivityEndTime,
//   callback,
// ) => {
//   db.transaction(txn => {
//     txn.executeSql(
//       'INSERT INTO draft_table(ActivityBy, DeviceActivityId, DeviceSystemDateTime, CustomerId,Notes, ActivityStartTime,ActivityEndTime) VALUES(?,?,?,?,?,?,?)',
//       [
//         ActivityBy,
//         DeviceActivityID,
//         DeviceSystemDateTime,
//         CustomerId,
//         Notes,
//         ActivityStartTime,
//         ActivityEndTime,
//       ],
//       (tx, res) => {
//         if (res.rowsAffected > 0) {
//           //   Alert.alert('Data inserted successfully');
//           callback(true);
//         } else {
//           //   Alert.alert('Failed.....');
//           callback(false);
//         }
//       },
//     );
//   });
// };






export const insertDraftItems = (
  ActivityBy,
  DeviceActivityID,
  DeviceSystemDateTime,
  CustomerId,
  Notes,
  ActivityStartTime,
  ActivityEndTime,
  callback,
) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM draft_table WHERE DeviceActivityId = ?',
      [DeviceActivityID],
      (tx, res) => {
        if (res.rows.length > 0) {
          // If record exists, update it
          txn.executeSql(
            'UPDATE draft_table SET ActivityBy=?, DeviceSystemDateTime=?, CustomerId=?, Notes=?, ActivityEndTime=? WHERE DeviceActivityId=?',
            [
              ActivityBy,
              DeviceSystemDateTime,
              CustomerId,
              Notes,
              ActivityEndTime,
              DeviceActivityID,
            ],
            (tx, res) => {
              if (res.rowsAffected > 0) {
                callback(true);
              } else {
                callback(false);
              }
            },
          );
        } else {
          // If record doesn't exist, insert a new record
          txn.executeSql(
            'INSERT INTO draft_table(ActivityBy, DeviceActivityId, DeviceSystemDateTime, CustomerId, Notes, ActivityStartTime, ActivityEndTime) VALUES(?,?,?,?,?,?,?)',
            [
              ActivityBy,
              DeviceActivityID,
              DeviceSystemDateTime,
              CustomerId,
              Notes,
              ActivityStartTime,
              ActivityEndTime,
            ],
            (tx, res) => {
              if (res.rowsAffected > 0) {
                callback(true);
              } else {
                callback(false);
              }
            },
          );
        }
      },
    );
  });
};









export const getDraftData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM draft_table', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};

export const deleteDraftData = (id, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM draft_table where Draft_id=?',
      [id],
      (tx, res) => {
        if (res.rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
    );
  });
};



// Execute the SQL query to delete all rows from the table



export const deleteAllActivityData = () => {

  db.transaction((tx) => {
    tx.executeSql('DELETE FROM draft_table', [], (tx, results) => {
      // Handle success, if needed
      console.log('draft  data deleted:', results.rowsAffected);
    },
    (error) => {
      // Handle error
      console.error('Error deleting rows:', error);
    });
  });
}

