import { injectable } from 'inversify';

@injectable()
export class Pagination {
  async paginate<T>(
    repositoryQuery: () => Promise<T[]>,
    countQuery: () => Promise<number>,
    page: number = 1,
    limit: number = 10
  ) {
    const offset = (page - 1) * limit;

    const [totalItems, items] = await Promise.all([
      countQuery(),
      repositoryQuery(),
    ]);

    return {
      data: items,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        limit,
      },
    };
  }
}
