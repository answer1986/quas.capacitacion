import Database from 'better-sqlite3';
import path from 'path';

// Crear conexión a la base de datos
const db = new Database(path.join(process.cwd(), 'data', 'contacts.db'));

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_general (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    course_interest TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_advisor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    sector TEXT,
    interest_area TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

// Newsletter functions
export function addSubscriber(email: string, timestamp: string) {
  const stmt = db.prepare('INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, ?)');
  try {
    stmt.run(email, timestamp);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Email ya registrado' };
    }
    return { success: false, error: 'Error al guardar el email' };
  }
}

export function checkEmailExists(email: string) {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers WHERE email = ?');
  const result = stmt.get(email) as { count: number };
  return result.count > 0;
}

// Contact form functions
export function addGeneralContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO contact_general (name, email, phone, message, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    stmt.run(data.name, data.email, data.phone, data.message, data.timestamp);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar el contacto' };
  }
}

export function addCourseContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  courseInterest: string;
  message: string;
  timestamp: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO contact_course (name, email, phone, company, course_interest, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    stmt.run(
      data.name,
      data.email,
      data.phone,
      data.company,
      data.courseInterest,
      data.message,
      data.timestamp
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar la solicitud del curso' };
  }
}

export function addAdvisorContact(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  sector?: string;
  interestArea: string;
  message: string;
  timestamp: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO contact_advisor (name, email, phone, company, sector, interest_area, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    stmt.run(
      data.name,
      data.email,
      data.phone,
      data.company,
      data.sector,
      data.interestArea,
      data.message,
      data.timestamp
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al guardar la solicitud de asesoría' };
  }
}

// Get functions for admin panel
export function getNewsletterSubscribers() {
  const stmt = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
  return stmt.all();
}

export function getGeneralContacts() {
  const stmt = db.prepare('SELECT * FROM contact_general ORDER BY created_at DESC');
  return stmt.all();
}

export function getCourseContacts() {
  const stmt = db.prepare('SELECT * FROM contact_course ORDER BY created_at DESC');
  return stmt.all();
}

export function getAdvisorContacts() {
  const stmt = db.prepare('SELECT * FROM contact_advisor ORDER BY created_at DESC');
  return stmt.all();
} 