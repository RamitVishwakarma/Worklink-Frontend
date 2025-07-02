import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function sanitizeUser(
  user: any,
  userType: 'worker' | 'startup' | 'manufacturer'
) {
  const { password, ...sanitizedUser } = user.toObject ? user.toObject() : user;
  return sanitizedUser;
}

export function createPaginationInfo(
  page: number,
  limit: number,
  total: number
) {
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export function parseQueryParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  return {
    page: Math.max(1, page),
    limit: Math.min(50, Math.max(1, limit)), // Cap at 50 items per page
    search,
    sort,
  };
}

export function buildSearchQuery(search: string, fields: string[]) {
  if (!search.trim()) return {};

  const searchRegex = new RegExp(search, 'i');

  return {
    $or: fields.map((field) => ({
      [field]: searchRegex,
    })),
  };
}

export function buildSortQuery(sort: string): { [key: string]: 1 | -1 } {
  const sortOrder = sort.startsWith('-') ? -1 : 1;
  const sortField = sort.startsWith('-') ? sort.slice(1) : sort;

  return { [sortField]: sortOrder } as { [key: string]: 1 | -1 };
}
