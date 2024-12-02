"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, signup } from '@/services/auth';

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await login(email, password);
        console.log('Login successful:', data);
      } else {
        const data = await signup(email, password, name);
        console.log('Signup successful:', data);
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className={cn(
      'bg-[#4A2C1D] text-orange-100 p-8 rounded-xl shadow-2xl',
      'w-full max-w-md mx-auto',
      'border border-orange-800/50'
    )}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-orange-200">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-orange-300 mt-2">
            {isLogin 
              ? 'Sign in to continue your journey' 
              : 'Join our community today'}
          </p>
        </div>

        {!isLogin && (
          <div>
            <Label 
              htmlFor="username" 
              className="text-orange-200 block mb-2"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={cn(
                'bg-[#3A1C0D] text-orange-100 border-orange-700',
                'focus:ring-2 focus:ring-orange-500'
              )}
            />
          </div>
        )}

        <div>
          <Label 
            htmlFor="email" 
            className="text-orange-200 block mb-2"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              'bg-[#3A1C0D] text-orange-100 border-orange-700',
              'focus:ring-2 focus:ring-orange-500'
            )}
          />
        </div>

        <div>
          <Label 
            htmlFor="password" 
            className="text-orange-200 block mb-2"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cn(
              'bg-[#3A1C0D] text-orange-100 border-orange-700',
              'focus:ring-2 focus:ring-orange-500'
            )}
          />
        </div>

        <Button
          type="submit"
          className={cn(
            'w-full mt-6',
            'bg-orange-700 hover:bg-orange-600',
            'text-white font-bold py-3',
            'transition-colors duration-300'
          )}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>

        <div className="text-center mt-4">
          <p className="text-orange-300">
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <a 
              href={isLogin ? '/signup' : '/login'} 
              className="text-orange-400 hover:text-orange-300 font-bold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

// Login Page Component
export const LoginPage: React.FC = () => {
  return (
    <div 
      className={cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-[#2A1C0D] to-[#4A2C1D]',
        'p-4'
      )}
    >
      <AuthForm isLogin={true} />
    </div>
  );
};

// Signup Page Component
export const SignupPage: React.FC = () => {
  return (
    <div 
      className={cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-[#2A1C0D] to-[#4A2C1D]',
        'p-4'
      )}
    >
      <AuthForm isLogin={false} />
    </div>
  );
};

export default { LoginPage, SignupPage };