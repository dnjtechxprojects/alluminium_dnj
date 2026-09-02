// API Response

import { NextResponse } from "next/server";

// Success Response
export const successResponse = (json: {
    message?: string;
    data?: any;
    [key: string]: any;
}): Response => {
    let { message, data, ...rest } = json;
    message = message || "Success";
    data = data || {};

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            status: 200,
        },
        {
            status: 200,
        }
    );
};

// Unauthorized Response Token valid | inValid
export const unauthorizedResponse = (json: {
    message?: string;
    data?: object;
    error?: any;
    [key: string]: any;
}): Response => {
    let { message, data, error, ...rest } = json;
    message = message || "Invalid Token";
    data = data || {};
    error = error || "";

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            error,
            status: 401,
        },
        {
            status: 401,
        }
    );
};

// Forbidden Response Not Proper Authorization
export const forbiddenResponse = (json: {
    message?: string;
    data?: object;
    error?: any;
    [key: string]: any;
}): Response => {
    let { message, data, error, ...rest } = json;
    message = message || "Access Denied";
    data = data || {};
    error = error || "";

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            error,
            status: 403,
        },
        {
            status: 403,
        }
    );
};

// Data-Base Internal-Server-Error Response
export const internalServerErrorResponse = (json: {
    message?: string;
    data?: object;
    error?: any;
    [key: string]: any;
}): Response => {
    let { message, data, error, ...rest } = json;
    message = message || "There was a problem processing the request";
    data = data || {};
    error = error || "";

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            error,
            status: 500,
        },
        {
            status: 500,
        }
    );
};

// Data NotFound Response (Not Accept Resource)
export const notFoundResponse = (json: {
    message?: string;
    data?: object;
    error?: any;
    [key: string]: any;
}): Response => {
    let { message, data, error, ...rest } = json;
    message = message || "Resource Not Found";
    error = error || "";
    data = data || {};

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            error,
            status: 404,
        },
        {
            status: 404,
        }
    );
};

// Invalid Data Response (Not Accepted Data-Resource)
export const invalidDataResponse = (json: {
    message?: string;
    data?: object;
    error?: any;
    [key: string]: any;
}): Response => {
    let { message, data, error, ...rest } = json;
    message = message || "Invalid Data";
    error = error || "";
    data = data || {};

    return NextResponse.json(
        {
            ...rest,
            message,
            data,
            error,
            status: 422,
        },
        {
            status: 422,
        }
    );
};
