import mysql from 'mysql2/promise';

// Configuración de la conexión
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'quas_capacitacion',
};

// Pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para inicializar las tablas
export async function initDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at DATETIME NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_general (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        created_at DATETIME NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_course (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        course_interest VARCHAR(255),
        message TEXT NOT NULL,
        created_at DATETIME NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_advisor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        sector VARCHAR(255),
        interest_area VARCHAR(255),
        message TEXT NOT NULL,
        created_at DATETIME NOT NULL
      );
    `);
  } finally {
    connection.release();
  }
}

// Newsletter functions
export async function addSubscriber(email: string, timestamp: string) {
  try {
    await pool.query(
      'INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, ?)',
      [email, timestamp]
    );
    return { success: true };
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, error: 'Email ya registrado' };
    }
    return { success: false, error: 'Error al guardar el email' };
  }
}

export async function checkEmailExists(email: string) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE email = ?',
    [email]
  ) as [{ count: number }[], any];
  return rows[0].count > 0;
}

// Contact form functions
export async function addGeneralContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}) {
  try {
    await pool.query(
      `INSERT INTO contact_general (name, email, phone, message, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.message, data.timestamp]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar el contacto' };
  }
}

export async function addCourseContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  courseInterest: string;
  message: string;
  timestamp: string;
}) {
  try {
    await pool.query(
      `INSERT INTO contact_course (name, email, phone, company, course_interest, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.company, data.courseInterest, data.message, data.timestamp]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar la solicitud del curso' };
  }
}

export async function addAdvisorContact(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  sector?: string;
  interestArea: string;
  message: string;
  timestamp: string;
}) {
  try {
    await pool.query(
      `INSERT INTO contact_advisor (name, email, phone, company, sector, interest_area, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.company, data.sector, data.interestArea, data.message, data.timestamp]
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar la solicitud de asesoría' };
  }
}

// Get functions for admin panel
export async function getNewsletterSubscribers() {
  const [rows] = await pool.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
  return rows;
}

export async function getGeneralContacts() {
  const [rows] = await pool.query('SELECT * FROM contact_general ORDER BY created_at DESC');
  return rows;
}

export async function getCourseContacts() {
  const [rows] = await pool.query('SELECT * FROM contact_course ORDER BY created_at DESC');
  return rows;
}

export async function getAdvisorContact() {
  const [rows] = await pool.query('SELECT * FROM contact_advisor ORDER BY created_at DESC');
  return rows;
} 