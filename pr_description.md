# Implement Protected API Endpoint for Device Metrics

Closes #30

## Changes

- Added GET `/api/devices/[id]/metrics` endpoint for retrieving device metrics
- Implemented authentication and authorization using NextAuth.js
- Added support for multiple metrics in a single request
- Added default values for date range (24 hours) and metric type (temperature)
- Added comprehensive test coverage
- Added API documentation

## Features

- Protected endpoint requiring authentication
- Query parameters:
  - `metric`: Type(s) of data to return (default: temperature)
  - `start`: Start date to query data from (default: 24 hours ago)
  - `end`: End date to query data until (default: current time)
- Response includes metric values with units
- Rate limiting (1000 records per request)

## Response Format

```json
{
  "status": "success",
  "data": {
    "temperature": [
      {
        "timestamp": "2024-02-01T08:00:00Z",
        "value": 22.5,
        "unit": "C"
      }
    ],
    "humidity": [
      {
        "timestamp": "2024-02-01T08:00:00Z",
        "value": 45,
        "unit": "%RH"
      }
    ]
  }
}
```

## Error Handling

- 401: Authentication required
- 400: Invalid device ID or query parameters
- 404: Device not found or unauthorized access
- 500: Internal server error

## Testing

- Added unit tests covering:
  - Authentication
  - Default values
  - Multiple metrics
  - Error cases

## Dependencies

- Requires user authentication (#29)
- MongoDB connection
- NextAuth.js configuration

## How to Test

1. Authenticate using Google Auth
2. Make a GET request to `/api/devices/[id]/metrics`
3. Optional: Include query parameters for specific metrics or date range

Example request:

```
GET /api/devices/123/metrics?metric=temperature,humidity&start=2024-03-01T00:00&end=2024-03-02T00:00
```
