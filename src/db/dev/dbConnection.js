import pool from './pool';

pool.on('connect', () => {
  console.log('connected to db');
});

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    verified_as_customer BOOLEAN DEFAULT 1,
    verified_as_producer BOOLEAN DEFAULT 0,
    last_login TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
    )`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log("result: ", res);
      pool.end();
    })
    .catch((err) => {
      console.error("error: ", err.stack);
      pool.end();
    });
};

const createRoleTable = () => {
  const roleCreateQuery = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    );`;

  pool.query(roleCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error("error: ", err.stack);
      pool.end();
    });
};

const createVerificationTable = () => {
  const verificationCreateQuery = `CREATE TABLE IF NOT EXISTS verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    verified_by_id INTEGER NOT NULL,
    verified_at TIMESTAMP,
    btn VARCHAR(20),
    cac VARCHAR(50),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );`;

  pool.query(verificationCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createLocationTable = () => {
  const locationCreateQuery = `CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    customer_count INTEGER NOT NULL DEFAULT 0,
    producer_count INTEGER NOT NULL DEFAULT 0,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    longitude VARCHAR(50),
    latitude VARCHAR(50),
    profile_image VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    );`;

  pool.query(locationCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createProfileTable = () => {
  const profileCreateQuery = `CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    location_id INTEGER,
    rating INTEGER NOT NULL DEFAULT 0,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    phone VARCHAR(15),
    bio TEXT,
    profile_image VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
  );`;

  pool.query(profileCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createProducerProfileTable = () => {
  const profileCreateQuery = `CREATE TABLE IF NOT EXISTS producer_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    location_id INTEGER,
    rating INTEGER NOT NULL DEFAULT 0,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(255),
    business_name VARCHAR(255),
    phone VARCHAR(15),
    bio TEXT,
    profile_image VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
  );`;

  pool.query(profileCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createCategoryTable = () => {
  const categoryCreateQuery = `CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER,
    name VARCHAR(100),
    description VARCHAR(255),
    status BOOLEAN NOT NULL DEFAULT TRUE,
    image VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE
    );`;

  pool.query(categoryCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createProductTable = () => {
  const categoryCreateQuery = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    producer_id INTEGER,
    name VARCHAR(100),
    description VARCHAR(255),
    status BOOLEAN NOT NULL DEFAULT TRUE,
    rating INTEGER,
    price NUMERIC (13, 2),
    image VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (producer_id) REFERENCES users (id) ON DELETE CASCADE
  );`;

  pool.query(categoryCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createProductCategoryTable = () => {
  const productCategoryCreateQuery = `CREATE TABLE IF NOT EXISTS product_to_category (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
  );`;

  pool.query(productCategoryCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createProductProducerTable = () => {
  const productCategoryCreateQuery = `CREATE TABLE IF NOT EXISTS product_to_producer (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    producer_id INTEGER NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES users (id) ON DELETE CASCADE
  );`;

  pool.query(productCategoryCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createTransactionTable = () => {
  const productTransactionCreateQuery = `CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    total NUMERIC (13, 2),
    status ENUM ('initiated', 'processing', 'completed', 'delivered'),
    paid BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
  );`;

  pool.query(productTransactionCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createTransactionDetailsTable = () => {
  const productTransactionDetailsCreateQuery = `CREATE TABLE IF NOT EXISTS transaction_details (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    unit_price NUMERIC (13, 2) NOT NULL,
    discount NUMERIC (13, 2),
    quantity INTEGER NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );`;

  pool.query(productTransactionDetailsCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createCommentTable = () => {
  const commentsCreateQuery = `CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    comment VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );`;

  pool.query(commentsCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createMessageTable = () => {
  const messagesCreateQuery = `CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    from_id INTEGER NOT NULL,
    to_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    message VARCHAR(255) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (from_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (to_id) REFERENCES users (id) ON DELETE CASCADE
  );`;

  pool.query(messagesCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createTrackingTable = () => {
  const trackingCreateQuery = `CREATE TABLE IF NOT EXISTS trackings (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    tracking_number VARCHAR(50) NOT NULL,
    commment VARCHAR(255) NOT NULL,
    status ENUM ('processing', 'shipped', 'delivered'),
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions (id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users (id) ON DELETE CASCADE
  );`;

  pool.query(trackingCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};

const createTrackingHistoryTable = () => {
  const trackingHistoryCreateQuery = `CREATE TABLE IF NOT EXISTS tracking_history (
    id SERIAL PRIMARY KEY,
    tracking_id INTEGER NOT NULL,
    commment VARCHAR(255) NOT NULL,
    location_name VARCHAR(50) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    latitude VARCHAR(50) NOT NULL,
    longitude VARCHAR(50) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP NOT NULL,
    FOREIGN KEY (tracking_id) REFERENCES trackings (id) ON DELETE CASCADE,
  );`;

  pool.query(trackingHistoryCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.error(err);
      pool.end();
    });
};
/**
 * Drop Tables
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

const dropRoleTable = () => {
  const rolesDropQuery = 'DROP TABLE IF EXISTS roles';
  pool.query(rolesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropVerificationTable = () => {
  const verificationDropQuery = 'DROP TABLE IF EXISTS verifications';
  pool.query(verificationDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProfileTable = () => {
  const profilesDropQuery = 'DROP TABLE IF EXISTS profiles';
  pool.query(profilesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProducerProfileTable = () => {
  const profilesDropQuery = 'DROP TABLE IF EXISTS producer_profiles';
  pool.query(profilesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLocationTable = () => {
  const locationDropQuery = 'DROP TABLE IF EXISTS locations';
  pool.query(locationDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropCategoriesTable = () => {
  const categoriesDropQuery = 'DROP TABLE IF EXISTS categories';
  pool.query(categoriesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProductTable = () => {
  const productDropQuery = 'DROP TABLE IF EXISTS products';
  pool.query(productDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProductCategoriesTable = () => {
  const productCategoriesDropQuery = 'DROP TABLE IF EXISTS product_to_category';
  pool.query(productCategoriesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropProductProducerTable = () => {
  const productProducerDropQuery = 'DROP TABLE IF EXISTS product_to_producer';
  pool.query(productProducerDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTransactionTable = () => {
  const transactionDropQuery = 'DROP TABLE IF EXISTS transactions';
  pool.query(transactionDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTransactionDetailTable = () => {
  const transactionDetailDropQuery = 'DROP TABLE IF EXISTS transaction_details';
  pool.query(transactionDetailDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropCommentTable = () => {
  const commentDropQuery = 'DROP TABLE IF EXISTS comments';
  pool.query(commentDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropMessageTable = () => {
  const messageDropQuery = 'DROP TABLE IF EXISTS messages';
  pool.query(messageDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTrackingTable = () => {
  const trackingDropQuery = 'DROP TABLE IF EXISTS trackings';
  pool.query(trackingDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTrackingHistoryTable = () => {
  const trackingHistoryDropQuery = 'DROP TABLE IF EXISTS tracking_history';
  pool.query(trackingHistoryDropQuery)
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
  createRoleTable();
  createUserTable();
  createVerificationTable();
  createLocationTable();
  createProfileTable();
  createProducerProfileTable();
  createCategoryTable();
  createProductTable();
  createProductCategoryTable();
  createProductProducerTable();
  createTransactionTable();
  createTransactionDetailsTable();
  createCommentTable();
  createMessageTable();
  createTrackingTable();
  createTrackingHistoryTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropRoleTable();
  dropUserTable();
  dropVerificationTable();
  dropLocationTable();
  dropProfileTable();
  dropCategoriesTable();
  dropProductTable();
  dropProductCategoriesTable();
  dropProductProducerTable();
  dropProducerProfileTable();
  dropTransactionTable();
  dropTransactionDetailTable();
  dropCommentTable();
  dropMessageTable();
  dropTrackingTable();
  dropTrackingHistoryTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables
};

require('make-runnable');
