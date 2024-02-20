import {db} from './MainDatabase';

// working code
// export const initSpecificationTable = () => {
//   db.transaction(txn => {
//     txn.executeSql(
//       "SELECT name FROM sqlite_master WHERE type='table' AND name='specification_table'",
//       [],
//       (tx, res) => {
//         console.log('item:', res.rows.length);
//         if (res.rows.length === 0) {
//           txn.executeSql('DROP TABLE IF EXISTS specification_table', []);
//           txn.executeSql(
//             'CREATE TABLE IF NOT EXISTS specification_table(Spec_id INTEGER PRIMARY KEY AUTOINCREMENT, DesignTemplateId INTEGER, SpecQty VARCHAR(50), Measurement VARCHAR(50), Remarks VARCHAR(50),DeviceSystemDateTime TEXT)',
//             [],
//           );
//         } else {
//           console.log('already created specification table');
//         }
//       },
//     );
//   });
// };

// practive

export const initSpecificationTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='specification_table'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS specification_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS specification_table(Spec_id INTEGER PRIMARY KEY AUTOINCREMENT, DeviceActivityId VARCHAR(50),Name VARCHAR(500),  DesignTemplateId INTEGER, SpecQty VARCHAR(50), Measurement VARCHAR(50), Remarks VARCHAR(50), DeviceSystemDateTime TEXT, FOREIGN KEY (DeviceActivityId) REFERENCES new_activity_table(DeviceActivityId))',
            [],
          );
        } else {
          console.log('already created specification table');
        }
      },
    );
  });
};

//========== insert data into table ===========

export const insertSpecificationData = (tableData, callback) => {
  let successCount = 0; // Keep track of successful insertions
  const totalItems = tableData.length; // Total items to be inserted

  db.transaction(txn => {
    tableData.forEach(item => {
      const {
        DesignTemplateId,
        SpecQty,
        Measurement,
        Remarks,
        DeviceSystemDateTime,

        DeviceActivityId,
        Name,
      } = item;

      // Check if the item already exists in the database
      txn.executeSql(
        'SELECT * FROM specification_table WHERE DesignTemplateId = ?',
        [DesignTemplateId],
        (tx, res) => {
          if (res.rows.length === 0) {
            // Item does not exist, perform the insertion
            txn.executeSql(
              'INSERT INTO specification_table(DesignTemplateId, SpecQty, Measurement, Remarks,DeviceSystemDateTime,DeviceActivityId,Name ) VALUES(?,?,?,?,?,?,?)',
              [
                DesignTemplateId,
                SpecQty,
                Measurement,
                Remarks,
                DeviceSystemDateTime,

                DeviceActivityId,

                Name,
              ],
              (tx, res) => {
                if (res.rowsAffected > 0) {
                  successCount++; // Increment successful insertion count
                  if (successCount === totalItems) {
                    // If all insertions are successful, trigger callback with success
                    callback(true);
                  }
                } else {
                  // If any insertion fails, trigger callback with failure
                  callback(false);
                }
              },
            );
          } else {
            // Item already exists, show alert and increment success count
            // Alert.alert('Item with Barcode ' + Barcode + ' already exists in the database');
            successCount++;
            if (successCount === totalItems) {
              // If all insertions are successful, trigger callback with success

              // callback(true);

              callback(true, true);
            }
          }
        },
      );
    });
  });

  // db.transaction(txn => {
  //   txn.executeSql(
  //     'INSERT INTO specification_table(DesignTemplateId, SpecQty, Measurement, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?)',
  //     [CustomerId, Address, AppointmentDate, AppointmentTime, AssignEmployeeId],
  //     (tx, res) => {
  //       if (res.rowsAffected > 0) {
  //         //   Alert.alert('Data inserted successfully');
  //         callback(true);
  //       } else {
  //         //   Alert.alert('Failed.....');
  //         callback(false);
  //       }
  //     },
  //   );
  // });
};

//========== get data from table ===========

export const getSpecificationData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM specification_table', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};

//========== delete data from table ===========

// export const deleteSpecificationData = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'DELETE FROM specification_table',
//       [],
//       (tx, results) => {
//         // Handle success, if needed
//         console.log('Specification data deleted:', results.rowsAffected);
//       },
//       error => {
//         // Handle error
//         console.error('Error deleting rows:', error);
//       },
//     );
//   });
// };

// ====== get data deviceactivity wise ======

export const getSpecificationDataByDeviceActivityId = (
  DeviceActivityID,
  callback,
) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM specification_table WHERE DeviceActivityId = ?',
      [DeviceActivityID],
      (tx, res) => {
        if (res.rows.length > 0) {
          const specificationData = [];
          for (let i = 0; i < res.rows.length; i++) {
            const item = res.rows.item(i);
            specificationData.push(item);
          }
          callback(specificationData);
        } else {
          callback([]);
        }
      },
    );
  });
};



export const deleteSpecificationData = (specId, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM specification_table WHERE Spec_id = ?',
      [specId],
      (tx, res) => {
        if (res.rowsAffected > 0) {
          // Deletion successful, trigger callback with success
          callback(true);
        } else {
          // No rows affected, trigger callback with failure
          callback(false);
        }
      }
    );
  });
};












// === extra for practive for draft ====

// export const getSpecificationsByDeviceActivityId = (DeviceActivityId) => {
//   db.transaction(txn => {
//     txn.executeSql(
//       'SELECT * FROM specification_table WHERE DeviceActivityId = ?',
//       [DeviceActivityId],
//       (tx, res) => {
//         for (let i = 0; i < res.rows.length; ++i) {
//           console.log('draft specific data =========>:',JSON.stringify(res.rows.item(i),null,2) );
//         }
//       },
//     );
//   });
// };

// export const getSpecificationsByDeviceActivityId = DeviceActivityId => {
//   const matchingData = []; // Array to store matching data
//   // console.log('draft specific data =========>:', JSON.stringify(matchingData, null, 2));

//   db.transaction(txn => {
//     txn.executeSql(
//       'SELECT * FROM specification_table WHERE DeviceActivityId = ?',
//       [DeviceActivityId],
//       (tx, res) => {
//         for (let i = 0; i < res.rows.length; ++i) {
//           const item = res.rows.item(i);
//           // console.log('draft specific data =========>:', JSON.stringify(item, null, 2));
//           matchingData.push(item); // Add matching data to the array

//           // console.log(
//           //   'draft specific data =========>:',
//           //   JSON.stringify(matchingData, null, 2),
//           // );
//         }

//         // Do something with the matchingData array (e.g., pass it to another function)
//         // handleMatchingData(matchingData);
//       },
//     );
//   });
// };
