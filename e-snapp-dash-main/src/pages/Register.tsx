import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRegister } from '../hooks/useApi';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';

const Register = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const register = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }
    
    try {
      await register.mutateAsync({ name, email, password });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registrazione fallita. Riprova più tardi.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background p-4"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img 
            src="/e-snapp-logo.svg" 
            alt="E-Snapp Logo" 
            className="mx-auto h-16 w-auto" 
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            Crea il tuo account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Inizia a gestire la tua energia in modo intelligente
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Conferma password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-background"></div>
                  Registrazione in corso...
                </>
              ) : (
                'Registrati'
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            <p>
              Hai già un account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Accedi
              </Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;