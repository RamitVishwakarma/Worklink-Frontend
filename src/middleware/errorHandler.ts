import { NextResponse } from 'next/server';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export class ValidationError extends Error {
  statusCode = 400;
  details: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class AuthenticationError extends Error {
  statusCode = 401;

  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  statusCode = 403;

  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  statusCode = 404;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  statusCode = 409;

  constructor(message: string = 'Resource already exists') {
    super(message);
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends Error {
  statusCode = 500;

  constructor(message: string = 'Database operation failed') {
    super(message);
    this.name = 'DatabaseError';
  }
}

export function handleApiError(error: any): NextResponse {
  console.error('API Error:', error);

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError' && error.errors) {
    const validationErrors = Object.values(error.errors).map((err: any) => ({
      field: err.path,
      message: err.message,
    }));

    return NextResponse.json(
      {
        error: 'Validation failed',
        details: validationErrors,
      },
      { status: 400 }
    );
  }

  // Handle Mongoose duplicate key errors
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    const value = error.keyValue[field];

    return NextResponse.json(
      {
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`,
      },
      { status: 409 }
    );
  }

  // Handle custom API errors
  if (error.statusCode) {
    return NextResponse.json(
      {
        error: error.message,
        ...(error.details && { details: error.details }),
      },
      { status: error.statusCode }
    );
  }

  // Handle generic errors
  return NextResponse.json(
    {
      error: 'Internal server error',
    },
    { status: 500 }
  );
}

export function createSuccessResponse(
  data: any,
  message?: string,
  statusCode: number = 200
) {
  return NextResponse.json(
    {
      ...(message && { message }),
      ...data,
    },
    { status: statusCode }
  );
}

export function createErrorResponse(
  message: string,
  statusCode: number = 400,
  details?: any
) {
  return NextResponse.json(
    {
      error: message,
      ...(details && { details }),
    },
    { status: statusCode }
  );
}
