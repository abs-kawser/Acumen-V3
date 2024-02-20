import {db} from './MainDatabase';

export const initAppointmentTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='appointment_table'",
      [],
      (tx, res) => {
        console.log('item:', res.rows.length);
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS appointment_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS appointment_table(App_id INTEGER PRIMARY KEY AUTOINCREMENT, CustomerId VARCHAR(50), Address VARCHAR(50), AppointmentDate TEXT, AppointmentTime TEXT,AssignEmployeeId INTEGER)',
            [],
          );
        } else {
          console.log('already created appointment table');
        }
      },
    );
  });
};

//========== insert data into table ===========

export const insertAppointmentData = (
  CustomerId,
  Address,
  AppointmentDate,
  AppointmentTime,
  AssignEmployeeId,
  callback,
) => {
  db.transaction(txn => {
    txn.executeSql(
      'INSERT INTO appointment_table(CustomerId, Address, AppointmentDate, AppointmentTime, AssignEmployeeId) VALUES(?,?,?,?,?)',
      [CustomerId, Address, AppointmentDate, AppointmentTime, AssignEmployeeId],
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

//========== get data from table ===========

export const getAppoinmetData = callback => {
  db.transaction(txn => {
    txn.executeSql('SELECT * FROM appointment_table', [], (tx, res) => {
      const temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        temp.push(res.rows.item(i));
      }
      callback(temp);
    });
  });
};

//========== delete data from table ===========

export const deleteAppoinmetData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM appointment_table',
      [],
      (tx, results) => {
        // Handle success, if needed
        console.log('Appointment  data deleted:', results.rowsAffected);
      },
      error => {
        // Handle error
        console.error('Error deleting rows:', error);
      },
    );
  });
};
