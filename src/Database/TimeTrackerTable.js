import {db} from './MainDatabase';

export const initTimeTrackerDatabase = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='time_tracker_table'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS time_tracker_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS time_tracker_table(DeviceActivityId VARCHAR(50), ActivityTime TEXT, WorkingStatus INTEGER,EntryBy INTEGER,EntryDate TEXT)',
            [],
          );
        } else {
          console.log('already created Time Tracker table');
        }
      },
    );
  });
};

// ====== insert ======

export const insertTimeTrackerItems = (
  DeviceActivityID,
  ActivityTime,
  WorkingStatus,
  EntryBy,
  EntryDate,
  callback,
) => {
  db.transaction(txn => {
    txn.executeSql(
      'INSERT INTO time_tracker_table(DeviceActivityId, ActivityTime, WorkingStatus, EntryBy,EntryDate) VALUES(?,?,?,?,?)',
      [DeviceActivityID, ActivityTime, WorkingStatus, EntryBy, EntryDate],
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

// ======= GET =======

export const getTimeTrackerData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM time_tracker_table', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};







export const getTimeTrackerItemsByDeviceActivityId = (DeviceActivityID, callback) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM time_tracker_table WHERE DeviceActivityId = ?',
        [DeviceActivityID],
        (tx, res) => {
          if (res.rows.length > 0) {
            const timeTrackerItems = [];
            for (let i = 0; i < res.rows.length; i++) {
              const item = res.rows.item(i);
              timeTrackerItems.push(item);
            }
            callback(timeTrackerItems);
          } else {
            callback([]);
          }
        },
      );
    });
  };
  