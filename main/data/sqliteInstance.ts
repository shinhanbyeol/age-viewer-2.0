import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import initSql from './init';

// sql lite instance for app database
class appDatabase {
  appData: sqlite3.Database;
  constructor(sqllitePath) {
    this.appData = new sqlite3.Database(sqllitePath, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the graphizer database.');

      this.appData.run(`select count(*) from tb_servers`, (err, rows) => {
        if (err) {
          console.error(err.message);
          // init table check to ./init.ts
          const _sql = initSql;
          this.appData.run(_sql, (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('init app database success');
          });
        }
        console.log('success test query', rows);
      });
    });
  }
}

export default appDatabase;
