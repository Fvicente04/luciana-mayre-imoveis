import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', publicRoutes);
app.use('/api', adminRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao conectar ao banco de dados:', err);
    process.exit(1);
  });

export default app;
