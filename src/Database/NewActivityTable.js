import {db} from './MainDatabase';

// const db = openDatabase({ name: 'UserDatabase.db' });

export const initDatabase = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='new_activity_table'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS new_activity_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS new_activity_table(Activity_id INTEGER PRIMARY KEY AUTOINCREMENT, ActivityBy INTEGER, DeviceActivityId VARCHAR(50), DeviceSystemDateTime TEXT, CustomerId VARCHAR(50),Notes VARCHAR(500), ActivityStartTime TEXT,ActivityEndTime TEXT)',
            [],
          );
        } else {
          console.log('already created table');
        }
      },
    );
  });
};

export const insertNewActivity = (
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
      'INSERT INTO new_activity_table(ActivityBy, DeviceActivityId, DeviceSystemDateTime, CustomerId,Notes, ActivityStartTime,ActivityEndTime) VALUES(?,?,?,?,?,?,?)',
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
          //   Alert.alert('Data inserted successfully');
          callback(true);
        } else {
          //   Alert.alert('Failed.....');
          callback(false);
        }
      },
    );
  });
};

export const getActivityData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM new_activity_table', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};

export const deleteUser = (id, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM new_activity_table where Activity_id=?',
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
    tx.executeSql('DELETE FROM new_activity_table', [], (tx, results) => {
      // Handle success, if needed
      console.log('Activity data deleted:', results.rowsAffected);
    },
    (error) => {
      // Handle error
      console.error('Error deleting rows:', error);
    });
  });
}




export const getNewActivityByDeviceActivityId = (DeviceActivityID, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM new_activity_table WHERE DeviceActivityId = ?',
      [DeviceActivityID],
      (tx, res) => {
        if (res.rows.length > 0) {
          const newActivityItems = [];
          for (let i = 0; i < res.rows.length; i++) {
            const item = res.rows.item(i);
            newActivityItems.push(item);
          }
          callback(newActivityItems);
        } else {
          callback([]);
        }
      },
    );
  });
};


// ===========================================================================




// export const getJoinedData = () => {
//   db.transaction(txn => {
//     txn.executeSql(
//       'SELECT * FROM new_activity_table INNER JOIN specification_table ON new_activity_table.Activity_id = specification_table.Spec_id',
//       [],
//       (tx, res) => {
//         console.log('Joined Data:', JSON.stringify(res.rows.raw(),null,2));
//       },
//     );
//   });
// };


export const getJoinedData = () => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM new_activity_table INNER JOIN specification_table ON new_activity_table.Activity_id = specification_table.Spec_id',
      [],
      (tx, res) => {
        const joinedData = res.rows.raw();

        // Transform the data to match the desired structure
        const transformedData = joinedData.map(item => ({
          ActivityEndTime: item.ActivityEndTime,
          ActivityStartTime: item.ActivityStartTime,
          CustomerId: item.CustomerId,
          DeviceSystemDateTime: item.DeviceSystemDateTime,
          Notes: item.Notes,
          ActivityBy: item.ActivityBy,
          DeviceActivityId: item.DeviceActivityId,
          Activity_id: item.Activity_id,
          SalesPersonActivitySpecDetailsDTOList: [
            {
              DesignTemplateId: item.DesignTemplateId,
              Measurement: item.Measurement,
              SpecQty: item.SpecQty,
              DeviceSystemDateTime: item.DeviceSystemDateTime,
              Remarks: item.Remarks,
              Spec_id: item.Spec_id,
            },
          ],
        }));

        console.log('Joined Data:', JSON.stringify(transformedData,null,2));
      },
    );
  });
};



















// export const initActivityItemDatabase = () => {
//   // db.transaction(txn => {
//   //   txn.executeSql(
//   //     "SELECT name FROM sqlite_master WHERE type='table' AND name='activity_item'",
//   //     [],
//   //     (tx, res) => {
//   //       console.log('item:', res.rows.length);
//   //       if (res.rows.length === 0) {
//   //         txn.executeSql('DROP TABLE IF EXISTS activity_item', []);
//   //         txn.executeSql(
//   //           'CREATE TABLE IF NOT EXISTS activity_item(user_id INTEGER PRIMARY KEY AUTOINCREMENT,Barcode VARCHAR(50), ItemQty INTEGER, IsSample INTEGER, SampleDeliveryTime TEXT, Remarks VARCHAR(50), DeviceSystemDateTime TEXT,)',
//   //           [],
//   //         );
//   //       } else {
//   //         console.log('already created items table');
//   //       }
//   //     },
//   //   );
//   // });

//   db.transaction(txn => {
//     txn.executeSql(
//       "SELECT name FROM sqlite_master WHERE type='table' AND name='activity_item'",
//       [],
//       (tx, res) => {
//         console.log('item:', res.rows.length);
//         if (res.rows.length === 0) {
//           txn.executeSql('DROP TABLE IF EXISTS activity_item', []);
//           txn.executeSql(
//             'CREATE TABLE IF NOT EXISTS activity_item(user_id INTEGER PRIMARY KEY AUTOINCREMENT,Barcode VARCHAR(50), ItemQty INTEGER, IsSample INTEGER, SampleDeliveryTime TEXT, Remarks VARCHAR(50), DeviceSystemDateTime TEXT)',
//             [],
//           );
//         } else {
//           console.log('already created item table');
//         }
//       },
//     );
//   });
// };
