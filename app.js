import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';



const { Pool } = pg;
const pool = new Pool({
    user: 'darya',
    host: 'localhost',
    database: 'js_task',
    password: 'darya',
    port: 5893,
});

const app = express();
const port = 3001;
app.use(cors());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/register', async (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) {
       return res.status(400).json({ error: 'Username and password are required' });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
       );
        res.status(201).json({ message: `User "${username}" registered.` });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Username already exists' });
       }
        res.status(500).json({ error: 'An error occurred during registration' });
    }
 });

app.get('/register', (req, res) => {
    res.sendFile('/home/darya/js_base/register.html');
});
 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) {
       return res.status(400).json({ error: 'Username and password are required' });
    }
 
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
 
        if (result.rowCount === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
       }
 
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
 
        if (match) {
            res.json({ message: `User "${username}" logged in.` });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

app.get('/login', (req, res) => {
    res.sendFile('/home/darya/js_base/login.html');
});


app.get('/cars/list', async(req, res) => {
    const { filter } = req.query;
    const query = filter === 'yearGtF'
    ? 'SELECT * FROM cars WHERE year > 2015'
    : filter === 'yearLtF'
    ? 'SELECT * FROM cars WHERE year <= 2015'
    : 'SELECT * FROM cars';
    const result = await pool.query(query);
    res.json(result.rows);
});



app.get('/users', async(req, res) => {
    const { filter } = req.query;
    const query = filter === 'idGT'
    ? 'SELECT * FROM users WHERE id > 10'
    : filter === 'idLT'
    ? 'SELECT * FROM users WHERE id <= 10'
    : 'SELECT * FROM users';
    const result = await pool.query(query);
    res.json(result.rows);
});


app.get('/cars/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await pool.query('SELECT * FROM cars WHERE userId = $1', [userId]);
      res.json(result.rows);
    } catch (error) {
      console.error('Ошибка запроса: ', error);
      res.status(500).send('Ошибка сервера');
    }
});


app.post('/cars', async (req, res) => {
    const { userId, brand, model, year } = req.body;
    if (userId && brand && model && year){
        const result = await pool.query(
            'INSERT INTO cars (userId, brand, model, year) VALUES ($1, $2, $3, $4) RETURNING *', [userId, brand, model, year]);
        res.json({ message: 'car to be created' });
    } else {
        res.status(400).json({ error: 'An error occurred while creating the car' });
    }
});

app.delete('/cars/:brand/:model/:year', async (req, res) => {
    const { brand, model, year } = req.params;
    try{
            const result = await pool.query(
                'DELETE FROM cars WHERE brand = $1 AND model = $2 AND year = $3 RETURNING *', [brand, model, year]);
            if (result.rowCount > 0){
                res.json({ message: 'Car was succesfully delete'});
            }
            else {
                res.status(404).query({ error: 'Car not found'})
            }
        }
    catch (error) {
        console.error('Error removing car:', error);
        res.status(500).json({ error: 'An error occurred while removing the car' });
    }
});

app.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const { model } = req.body;
    try {
        const result = await pool.query(
            'UPDATE cars SET model = $1 WHERE id = $2 RETURNING *',
            [model, id]
        );

        if (result.rowCount > 0){
            res.json({ message: `Car  ${model} updated` })
        } else {
            res.status(404).json({ error: `Id ${id} not found` })

        }
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the car'});
    }
});

app.get('/', (req, res) => {
    res.sendFile('/home/darya/js_base/index.html');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});