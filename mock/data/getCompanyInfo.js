module.exports = {
    code: 0,
    message: "success",
    data: {
        company_name: "@cname",
        mobile: /^1[3856]\d{9}$/,
        "age|18-50": 1,
        "orders|5-10": [
            {
                id: "@id",
                from: "@county(true)",
                to: "@county(true)"
            }
        ]
    }
};