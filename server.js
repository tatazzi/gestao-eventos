const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(jsonServer.bodyParser);
server.use(middlewares);

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) 
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; 
    }
    return payload;
  } catch {
    return null;
  }
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
  const user = db.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Email ou senha incorretos' });
  }

  const token = generateToken(user);
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    token,
    user: userWithoutPassword,
    expiresIn: '24h'
  });
});

server.post('/auth/register', (req, res) => {
  const { email, password, fullName, establishmentName, cpfCnpj, companyName, tradeName, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
  
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    fullName: fullName || '',
    establishmentName: establishmentName || '',
    cpfCnpj: cpfCnpj || '',
    companyName: companyName || '',
    tradeName: tradeName || '',
    phone: phone || '',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

  const token = generateToken(newUser);
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    token,
    user: userWithoutPassword,
    expiresIn: '24h'
  });
});

server.get('/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }

  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
  const user = db.users.find(u => u.id === decoded.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ user: userWithoutPassword });
});

server.use(router);

const PORT = process.env.PORT || 3001;

const startServer = (port) => {
  server.listen(port, () => {
    console.log('Servidor rodando em http://localhost:' + port);
    console.log('Rotas disponíveis:');
    console.log('   POST /auth/login - Login');
    console.log('   POST /auth/register - Registro');
    console.log('   GET /auth/verify - Verificar token');
    console.log('   Todas as rotas do db.json também estão disponíveis');
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Porta ${port} em uso, tentando porta ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Erro ao iniciar servidor:', err);
      process.exit(1);
    }
  });
};

startServer(PORT);

