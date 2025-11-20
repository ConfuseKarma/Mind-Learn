// utils/pagination.js
export function getPaginationParams(req) {
    const pageRaw = Number(req.query.page || 0);
    const limitRaw = Number(req.query.limit || 0);

    if (!pageRaw || !limitRaw) return null;

    const page = pageRaw > 0 ? pageRaw : 1;
    const limit = limitRaw > 0 && limitRaw <= 100 ? limitRaw : 20;
    const offset = (page - 1) * limit;

    return { page, limit, offset };
}

export function buildPagedResponse(rows, count, page, limit) {
    const pages = Math.ceil(count / limit) || 1;
    return {
        data: rows,
        pagination: {
            page,
            limit,
            total: count,
            pages,
        },
    };
}
