import {Alert} from 'react-native';
import {db} from './MainDatabase';

export const initActivityItemDatabase = () => {
  // db.transaction(txn => {
  //   txn.executeSql(
  //     "SELECT name FROM sqlite_master WHERE type='table' AND name='activity_item'",
  //     [],
  //     (tx, res) => {
  //       console.log('item:', res.rows.length);
  //       if (res.rows.length === 0) {
  //         txn.executeSql('DROP TABLE IF EXISTS activity_item', []);
  //         txn.executeSql(
  //           'CREATE TABLE IF NOT EXISTS activity_item(user_id INTEGER PRIMARY KEY AUTOINCREMENT,Barcode VARCHAR(50), ItemQty INTEGER, IsSample INTEGER, SampleDeliveryTime TEXT, Remarks VARCHAR(50), DeviceSystemDateTime TEXT,)',
  //           [],
  //         );
  //       } else {
  //         console.log('already created items table');
  //       }
  //     },
  //   );
  // });

  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='activity_item'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS activity_item', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS activity_item(Item_id INTEGER PRIMARY KEY AUTOINCREMENT,DeviceActivityId VARCHAR(50),Barcode VARCHAR(50), ItemQty INTEGER, IsSample INTEGER, SampleDeliveryTime TEXT, Remarks VARCHAR(50), DeviceSystemDateTime TEXT)',
            [],
          );
        } else {
          console.log('already created item table');
        }
      },
    );
  });
};

// export const insertActivityItem = (tableData, callback) => {
//   console.log("this is tabledataaaa 2",tableData)
//   db.transaction(txn => {
//     txn.executeSql(
//       'INSERT INTO activity_item(Barcode, ItemQty, IsSample, SampleDeliveryTime, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?,?)',
//       [ tableData
//         // Barcode,
//         // ItemQty,
//         // IsSample,
//         // SampleDeliveryTime,
//         // Remarks,
//         // DeviceSystemDateTime,

//         // tableData.Barcode,
//         // tableData.ItemQty,
//         // tableData.IsSample,
//         // tableData.SampleDeliveryTime,
//         // tableData.Remarks,
//         // tableData.DeviceSystemDateTime,
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

// export const insertActivityItem = (tableData, callback) => {
//   console.log('this is tabledataaaa 2', tableData);

//   db.transaction(txn => {
//     tableData.forEach(item => {
//       const {
//         Barcode,
//         ItemQty,
//         IsSample,
//         SampleDeliveryTime,
//         Remarks,
//         DeviceSystemDateTime,
//       } = item;

//       txn.executeSql(
//         'INSERT INTO activity_item(Barcode, ItemQty, IsSample, SampleDeliveryTime, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?,?)',
//         [
//           Barcode,
//           ItemQty,
//           IsSample,
//           SampleDeliveryTime,
//           Remarks,
//           DeviceSystemDateTime,
//         ],
//         (tx, res) => {
//           if (res.rowsAffected > 0) {
//             //   Alert.alert('Data inserted successfully');
//             callback(true);
//           } else {
//             //   Alert.alert('Failed.....');
//             callback(false);
//           }
//         },
//       );
//     });
//   });
// };

// export const insertActivityItem = (tableData, callback) => {
//   let successCount = 0; // Keep track of successful insertions
//   const totalItems = tableData.length; // Total items to be inserted

//   db.transaction(txn => {
//     tableData.forEach(item => {
//       const {
//         Barcode,
//         ItemQty,
//         IsSample,
//         SampleDeliveryTime,
//         Remarks,
//         DeviceSystemDateTime,
//       } = item;

//       txn.executeSql(
//         'INSERT INTO activity_item(Barcode, ItemQty, IsSample, SampleDeliveryTime, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?,?)',
//         [
//           Barcode,
//           ItemQty,
//           IsSample,
//           SampleDeliveryTime,
//           Remarks,
//           DeviceSystemDateTime,
//         ],
//         (tx, res) => {
//           if (res.rowsAffected > 0) {
//             successCount++; // Increment successful insertion count
//             if (successCount === totalItems) {
//               // If all insertions are successful, trigger callback with success
//               callback(true);
//             }
//           } else {
//             // If any insertion fails, trigger callback with failure
//             callback(false);
//           }
//         },
//       );
//     });
//   });
// };

export const insertActivityItem = (tableData, callback) => {
  let successCount = 0; // Keep track of successful insertions
  const totalItems = tableData.length; // Total items to be inserted

  db.transaction(txn => {
    tableData.forEach(item => {
      const {
        DeviceActivityId,
        Barcode,
        ItemQty,
        IsSample,
        SampleDeliveryTime,
        Remarks,
        DeviceSystemDateTime,
      } = item;

      // Check if the item already exists in the database
      txn.executeSql(
        'SELECT * FROM activity_item WHERE Barcode = ?',
        [Barcode],
        (tx, res) => {
          if (res.rows.length === 0) {
            // Item does not exist, perform the insertion
            txn.executeSql(
              'INSERT INTO activity_item(DeviceActivityId,Barcode, ItemQty, IsSample, SampleDeliveryTime, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?,?,?)',
              [
                DeviceActivityId,
                Barcode,
                ItemQty,
                IsSample,
                SampleDeliveryTime,
                Remarks,
                DeviceSystemDateTime,
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
};

export const getActivityItemData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM activity_item', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};

// delete specific data from table
// export const deleteActivityItemData = (id, callback) => {
//   db.transaction(txn => {
//     txn.executeSql(
//       'DELETE FROM activity_item where user_id=?',
//       [id],
//       (tx, res) => {
//         if (res.rowsAffected > 0) {
//           callback(true);
//         } else {
//           callback(false);
//         }
//       },
//     );
//   });
// };

// delete all data from table
export const deleteActivityItemData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM activity_item',
      [],
      (tx, results) => {
        // Handle success, if needed
        console.log('activity item data deleted:', results.rowsAffected);
      },
      error => {
        // Handle error
        console.error('Error deleting rows:', error);
      },
    );
  });
};

// get specific data using device-activity-id

export const getActivityItemsByDeviceActivityId = (
  DeviceActivityID,
  callback,
) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM activity_item WHERE DeviceActivityId = ?',
      [DeviceActivityID],
      (tx, res) => {
        if (res.rows.length > 0) {
          const activityItems = [];
          for (let i = 0; i < res.rows.length; i++) {
            const item = res.rows.item(i);
            activityItems.push(item);
          }
          callback(activityItems);
        } else {
          callback([]);
        }
      },
    );
  });
};



export const deleteActivityItem = (itemId, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM activity_item WHERE Item_id = ?',
      [itemId],
      (tx, res) => {
        if (res.rowsAffected > 0) {
          // Deletion successful, trigger callback with success
          callback(true);
        } else {
          // No rows affected, item with specified Item_id not found
          callback(false);
        }
      },
    );
  });
};








// export const insertActivityItem = (tableData, callback) => {
//   let successCount = 0; // Keep track of successful insertions
//   const totalItems = tableData.length; // Total items to be inserted

//   db.transaction(txn => {
//     tableData.forEach(item => {
//       const {
//         Barcode,
//         ItemQty,
//         IsSample,
//         SampleDeliveryTime,
//         Remarks,
//         DeviceSystemDateTime,
//       } = item;

//       // Check if the item with the same Barcode already exists
//       txn.executeSql(
//         'SELECT * FROM activity_item WHERE Barcode = ?',
//         [Barcode],
//         (tx, res) => {
//           if (res.rows.length === 0) {
//             // If no matching Barcode found, proceed with insertion
//             txn.executeSql(
//               'INSERT INTO activity_item(Barcode, ItemQty, IsSample, SampleDeliveryTime, Remarks, DeviceSystemDateTime) VALUES(?,?,?,?,?,?)',
//               [
//                 Barcode,
//                 ItemQty,
//                 IsSample,
//                 SampleDeliveryTime,
//                 Remarks,
//                 DeviceSystemDateTime,
//               ],
//               (tx, res) => {
//                 if (res.rowsAffected > 0) {
//                   successCount++; // Increment successful insertion count
//                   if (successCount === totalItems) {
//                     // If all insertions are successful, trigger callback with success
//                     callback(true);
//                   }
//                 } else {
//                   // If any insertion fails, trigger callback with failure
//                   callback(false);
//                 }
//               },
//             );
//           } else {
//             // If Barcode already exists, skip insertion for this item
//             successCount++; // Increment successful insertion count
//             if (successCount === totalItems) {
//               // If all insertions are successful, trigger callback with success
//               callback(true);
//             }
//           }
//         },
//       );
//     });
//   });
// };
