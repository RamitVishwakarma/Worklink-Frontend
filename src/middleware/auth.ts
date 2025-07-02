import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    type: 'worker' | 'startup' | 'manufacturer';
    email: string;
  };
}

export function authenticateToken(token: string) {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    const decoded = jwt.verify(cleanToken, JWT_SECRET) as any;
    return {
      success: true,
      user: {
        id: decoded.id,
        type: decoded.type,
        email: decoded.email,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid or expired token',
    };
  }
}

export function generateToken(user: {
  id: string;
  type: string;
  email: string;
}) {
  return jwt.sign(
    {
      id: user.id,
      type: user.type,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}
