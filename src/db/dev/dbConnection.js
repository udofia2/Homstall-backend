import pool from './pool'

pool.on('connect', () => {
    console.log('connected to db')
})


const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL)`;
  
    pool.query(userCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

  /**
 * Drop User Table
 */
const dropUserTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

  /**
   * create All Tables
   */

  const createAllTables = () => {
    createUserTable();
  };
  
  
  /**
   * Drop All Tables
   */
  const dropAllTables = () => {
    dropUserTable();
  };

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
  
  
  export {
    createAllTables,
    dropAllTables,
  };
  
  require('make-runnable');