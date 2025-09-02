// const dataMethod = ['body', 'params', 'query', 'headers']

// export const validation = (Schema) => {
//     return (req, res, next) => {
//         try {
//             const validationArr = []
//             dataMethod.forEach(key => {
//                 if (Schema[key]) {
//                     const validationResult = Schema[key].validate(req[key], { abortEarly: false })
//                     if (validationResult?.error) {
//                         validationArr.push(validationResult.error.details)
//                     }
//                 }
//             })

//             if (validationArr.length) {
//                 return res.status(400).json({ message: "Validation error", validationArr })
//             } else {
//                 return next()
//             }

//         } catch (error) {
//             return next(new Error("validation err", { cause: 500 }))
//         }
//     }

// }
const dataMethod = ["body", "params", "query", "headers"];

export const validation = (Schema) => {
        return (req, res, next) => {
            try {
                let validationErrors = [];

                dataMethod.forEach((key) => {
                    if (Schema[key]) {
                        const { error } = Schema[key].validate(req[key], {
                            abortEarly: false,
                        });
                    if (error) {
            
            const formattedErrors = error.details.map((err) => ({
                field: err.context.key,
            message: err.message.replace(/["']/g, ""), 
            }));

            validationErrors = [...validationErrors, ...formattedErrors];
        }
        }
    });

    if (validationErrors.length) {
        return res.status(400).json({
        message: "Validation Error",
        errors: validationErrors,
        });
}
    next();
} catch (error) {
    return next(
        new Error(error.message || "Validation Middleware Error", {
        cause: 500,
        })
    );
    }
};
};
