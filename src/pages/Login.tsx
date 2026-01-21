// Login Page - Government Statistics Platform
// Professional authentication interface

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const isRTL = i18n.language === 'ar';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('auth.fieldsRequired'));
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError(t('auth.invalidCredentials'));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Language Switcher */}
      <div className="absolute top-4 left-4">
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Landmark className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <CardTitle className="text-2xl font-kufi">
            {t('auth.login')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('app.title')}
          </CardDescription>
          <p className="text-sm text-muted-foreground mt-1">
            {t('app.wilaya')}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@khenchela.gov.dz"
                dir="ltr"
                className="text-left"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : null}
              {t('auth.loginButton')}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-sm">
            <p className="font-semibold mb-2">{t('auth.demoAccounts')}</p>
            <div className="space-y-1 text-muted-foreground text-xs" dir="ltr">
              <p>admin@khenchela.gov.dz / admin123 (Super Admin)</p>
              <p>cnas@khenchela.gov.dz / cnas123 (Institution Admin)</p>
              <p>analyst@khenchela.gov.dz / analyst123 (Analyst)</p>
              <p>viewer@khenchela.gov.dz / viewer123 (Viewer)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
