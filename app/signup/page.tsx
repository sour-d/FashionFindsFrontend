"use client";
import { useState } from 'react';
import { encryptData } from '@/lib/utils';
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

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const encryptedUsername = encryptData(publicKey, username);
    const encryptedEmail = encryptData(publicKey, email);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateUser($username: String!, $password: String!, $email: String) {
              createUser(username: $username, password: $password, email: $email) {
                id
                username
                email
              }
            }
          `,
          variables: {
            username,
            password: password,
            email: encryptedEmail,
          },
        }),
      });

      const data = await response.json();

      if (data.data?.createUser) {
        // Redirect to login page
        router.push('/login');
      } else {
        setError('Signup failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Signup</h2>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
