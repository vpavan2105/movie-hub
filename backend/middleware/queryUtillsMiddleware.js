// middleware/queryUtils.js

const handleQueryParams = (req, res, next) => {
    req.queryOptions = {
        conditions: {},
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
        sortField: req.query.sort || 'createdAt',
        sortOrder: req.query.order === 'asc' ? 1 : -1,
    };

    if (req.role === "theatre-distributor") {
        req.queryOptions.conditions['user_id'] = req.id;
    }

    if (req.query && Object.keys(req.query).length > 0) {
        Object.keys(req.query).forEach(key => {
            if (key === 'search') {
                const regex = new RegExp(req.query.search, 'i');
                req.queryOptions.conditions['title'] = { $regex: regex };
            } else if (!['order', 'limit', 'sort', 'page'].includes(key)) {
                req.queryOptions.conditions[key] = req.query[key];
            }
        });
    }

    next();
};

module.exports = handleQueryParams;
