import sqlite3 from 'sqlite3';
import initSqls, { initTableCount } from './init';

// sql lite instance for app database
class appDatabase {
  appData: sqlite3.Database;
  constructor(sqllitePath) {
    this.appData = new sqlite3.Database(sqllitePath, (err) => {
      if (err) {
        console.error(err.message);
      }
      this.appData
        .prepare(`SELECT * FROM sqlite_master WHERE type='table';`)
        .all((err, rows) => {
          if (rows.length < initTableCount) {
            console.log('need init app database');
            // init table check to ./init.ts
            initSqls.forEach((_sql) => {
              this.appData.run(_sql, (err) => {
                if (err) {
                  console.error(err.message);
                }
                console.log('init app database success');
              });
            });
          }
        });
    });
  }
}

export default appDatabase;
