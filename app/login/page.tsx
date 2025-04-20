"use client";
import { useState } from 'react';
import { encryptData } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxmow6645X53ai/0+RmNL
zc5cZmV1Y0wiS91ZV0Vx85/RRGnS4yIH1z/upLmkThrug0PvdcjG2ytm+hkEHOPG
RHOthsZqzqExilZLOm3ErEJIVYeHwdugvdpFkm1iNofs1aWHZuEQTH81BF4pR0aj
lkg3OJHVwQ/9yihxV42H2xBC7S6La2WE0/jawlgeDVjPhgDSaSLipGKIj6M7CyRZ
fLuTG5Qx1uYSAMZgzq+mkIFlYWtxzYMc4Wy86pC9eS0snlRBq37dVU6rwoUttDmI
6el18RBSWag0Xkh0TSXtuuSzaUGjIPjbqQKReINkeJAO6w6L7ocGOrz6qEnA6IaG
jwIDAQAB
-----END PUBLIC KEY-----`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const encryptedUsername = encryptData(publicKey, username);

    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query validateUser($username: String!, $password: String!) {
              validateUser(username: $username, password: $password)
            }
          `,
          variables: {
            username: encryptedUsername,
            password: password,
          },
        }),
      });

      const data = await response.json();

      const token = data?.data?.validateUser;

      if (token) {
        localStorage.setItem('token', token);
        setToken(token);

        const user = {
          id: 'default',
          username: 'defaultuser',
          email: 'default@example.com',
        };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        router.push('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
